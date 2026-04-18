import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay'

type RazorpayEntity = Record<string, unknown>

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature')
  const signatureValid = verifyRazorpayWebhookSignature(rawBody, signature)

  if (!signatureValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = JSON.parse(rawBody)
  const eventType = getString(payload, 'event') ?? 'unknown'
  const admin = createAdminClient()

  const { data: webhookEvent } = await admin
    .from('billing_webhook_events')
    .insert({
      event_type: eventType,
      signature_valid: true,
      payload,
      provider_event_id: getString(payload, 'id'),
    })
    .select('id')
    .single()

  try {
    await processWebhookEvent(admin, payload)

    if (webhookEvent?.id) {
      await admin
        .from('billing_webhook_events')
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq('id', webhookEvent.id)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed'

    if (webhookEvent?.id) {
      await admin
        .from('billing_webhook_events')
        .update({ processing_error: message })
        .eq('id', webhookEvent.id)
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}

async function processWebhookEvent(admin: ReturnType<typeof createAdminClient>, payload: RazorpayEntity) {
  const eventType = getString(payload, 'event') ?? ''
  const webhookPayload = getEntity(payload, 'payload')
  const subscription = getEntity(getEntity(webhookPayload, 'subscription'), 'entity')
  const payment = getEntity(getEntity(webhookPayload, 'payment'), 'entity')

  if (subscription) {
    await upsertSubscriptionFromWebhook(admin, subscription)
  }

  if (payment || eventType.startsWith('payment.')) {
    await upsertPaymentFromWebhook(admin, payment)
  }
}

async function upsertSubscriptionFromWebhook(
  admin: ReturnType<typeof createAdminClient>,
  subscription: RazorpayEntity
) {
  const subscriptionId = getString(subscription, 'id')
  if (!subscriptionId) return

  const { data: existing } = await admin
    .from('user_subscriptions')
    .select('id, user_id')
    .eq('razorpay_subscription_id', subscriptionId)
    .maybeSingle()

  if (!existing) return

  await admin
    .from('user_subscriptions')
    .update({
      razorpay_customer_id: getString(subscription, 'customer_id'),
      razorpay_plan_id: getString(subscription, 'plan_id'),
      status: normalizeSubscriptionStatus(getString(subscription, 'status')),
      current_period_start: fromUnix(getNumber(subscription, 'current_start')),
      current_period_end: fromUnix(getNumber(subscription, 'current_end')),
      cancelled_at: fromUnix(getNumber(subscription, 'cancelled_at')),
      ended_at: fromUnix(getNumber(subscription, 'ended_at')),
      quantity: getNumber(subscription, 'quantity') ?? 1,
      raw_subscription: subscription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', existing.id)
}

async function upsertPaymentFromWebhook(
  admin: ReturnType<typeof createAdminClient>,
  payment?: RazorpayEntity
) {
  const paymentId = payment ? getString(payment, 'id') : null
  if (!payment || !paymentId) return

  const subscriptionId = getString(payment, 'subscription_id')
  let localSubscription: { id: string; user_id: string } | null = null

  if (subscriptionId) {
    const { data } = await admin
      .from('user_subscriptions')
      .select('id, user_id')
      .eq('razorpay_subscription_id', subscriptionId)
      .maybeSingle()

    localSubscription = data
  }

  await admin
    .from('billing_payments')
    .upsert({
      user_id: localSubscription?.user_id ?? null,
      user_subscription_id: localSubscription?.id ?? null,
      razorpay_payment_id: paymentId,
      razorpay_invoice_id: getString(payment, 'invoice_id'),
      razorpay_order_id: getString(payment, 'order_id'),
      razorpay_subscription_id: subscriptionId ?? null,
      amount_paise: getNumber(payment, 'amount') ?? 0,
      currency: getString(payment, 'currency') ?? 'INR',
      status: getString(payment, 'status') ?? 'unknown',
      method: getString(payment, 'method'),
      email: getString(payment, 'email'),
      contact: getString(payment, 'contact'),
      raw_payment: payment,
    }, { onConflict: 'razorpay_payment_id' })
}

function normalizeSubscriptionStatus(status: string | null | undefined) {
  if (status === 'paused') return 'paused'
  if (status === 'authenticated') return 'authenticated'
  if (status === 'active') return 'active'
  if (status === 'pending') return 'pending'
  if (status === 'halted') return 'halted'
  if (status === 'cancelled') return 'cancelled'
  if (status === 'completed') return 'completed'
  if (status === 'expired') return 'expired'
  return 'failed'
}

function fromUnix(value: number | null | undefined) {
  return typeof value === 'number' ? new Date(value * 1000).toISOString() : null
}

function getEntity(entity: RazorpayEntity | undefined, key: string): RazorpayEntity | undefined {
  const value = entity?.[key]
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as RazorpayEntity
    : undefined
}

function getString(entity: RazorpayEntity | undefined, key: string): string | null {
  const value = entity?.[key]
  return typeof value === 'string' ? value : null
}

function getNumber(entity: RazorpayEntity | undefined, key: string): number | null {
  const value = entity?.[key]
  return typeof value === 'number' ? value : null
}
