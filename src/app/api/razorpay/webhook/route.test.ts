import crypto from 'node:crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

const mocks = vi.hoisted(() => ({
  admin: {
    from: vi.fn(),
  },
}))

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(() => mocks.admin),
}))

describe('POST /api/razorpay/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook_secret'
  })

  it('rejects unsigned payloads before touching the database', async () => {
    const response = await POST(new Request('http://localhost/api/razorpay/webhook', {
      method: 'POST',
      body: JSON.stringify({ event: 'payment.failed' }),
    }) as Parameters<typeof POST>[0])

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Invalid signature' })
    expect(mocks.admin.from).not.toHaveBeenCalled()
  })

  it('records the webhook, updates subscription state, and upserts the payment', async () => {
    const webhookInsert = vi.fn(() => ({
      select: () => ({
        single: async () => ({ data: { id: 'webhook_row_123' }, error: null }),
      }),
    }))
    const webhookUpdate = vi.fn(() => ({
      eq: vi.fn().mockResolvedValue({ error: null }),
    }))
    const subscriptionUpdateEq = vi.fn().mockResolvedValue({ error: null })
    const subscriptionUpdate = vi.fn(() => ({ eq: subscriptionUpdateEq }))
    const paymentUpsert = vi.fn().mockResolvedValue({ error: null })

    mocks.admin.from.mockImplementation((table: string) => {
      if (table === 'billing_webhook_events') {
        return {
          insert: webhookInsert,
          update: webhookUpdate,
        }
      }

      if (table === 'user_subscriptions') {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: { id: 'local_sub_123', user_id: 'user_123' },
                error: null,
              }),
            }),
          }),
          update: subscriptionUpdate,
        }
      }

      if (table === 'billing_payments') {
        return { upsert: paymentUpsert }
      }

      throw new Error(`Unexpected table ${table}`)
    })

    const payload = {
      id: 'evt_123',
      event: 'subscription.charged',
      payload: {
        subscription: {
          entity: {
            id: 'sub_123',
            customer_id: 'cust_123',
            plan_id: 'plan_basic',
            status: 'active',
            current_start: 1776526000,
            current_end: 1779118000,
            quantity: 1,
          },
        },
        payment: {
          entity: {
            id: 'pay_123',
            invoice_id: 'inv_123',
            order_id: 'order_123',
            subscription_id: 'sub_123',
            amount: 500000,
            currency: 'INR',
            status: 'captured',
            method: 'upi',
            email: 'creator@example.com',
            contact: '+919999999999',
          },
        },
      },
    }

    const response = await POST(signedWebhookRequest(payload))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(webhookInsert).toHaveBeenCalledWith(expect.objectContaining({
      event_type: 'subscription.charged',
      signature_valid: true,
      provider_event_id: 'evt_123',
      payload,
    }))
    expect(subscriptionUpdate).toHaveBeenCalledWith(expect.objectContaining({
      razorpay_customer_id: 'cust_123',
      razorpay_plan_id: 'plan_basic',
      status: 'active',
      current_period_start: '2026-04-18T15:26:40.000Z',
      current_period_end: '2026-05-18T15:26:40.000Z',
      quantity: 1,
    }))
    expect(subscriptionUpdateEq).toHaveBeenCalledWith('id', 'local_sub_123')
    expect(paymentUpsert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'user_123',
      user_subscription_id: 'local_sub_123',
      razorpay_payment_id: 'pay_123',
      razorpay_invoice_id: 'inv_123',
      razorpay_order_id: 'order_123',
      razorpay_subscription_id: 'sub_123',
      amount_paise: 500000,
      currency: 'INR',
      status: 'captured',
      method: 'upi',
      email: 'creator@example.com',
      contact: '+919999999999',
    }), { onConflict: 'razorpay_payment_id' })
    expect(webhookUpdate).toHaveBeenCalledWith(expect.objectContaining({
      processed: true,
      processed_at: expect.any(String),
    }))
  })
})

function signedWebhookRequest(payload: unknown) {
  const rawBody = JSON.stringify(payload)
  const signature = crypto
    .createHmac('sha256', 'webhook_secret')
    .update(rawBody)
    .digest('hex')

  return new Request('http://localhost/api/razorpay/webhook', {
    method: 'POST',
    headers: { 'x-razorpay-signature': signature },
    body: rawBody,
  }) as Parameters<typeof POST>[0]
}
