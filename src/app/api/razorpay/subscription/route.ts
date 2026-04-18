import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createRazorpaySubscription } from '@/lib/razorpay'
import { isBillingPlanKey } from '@/lib/billing/plans'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const planKey = body?.planKey

  if (typeof planKey !== 'string' || !isBillingPlanKey(planKey)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const { data: plan, error: planError } = await supabase
    .from('billing_plans')
    .select('id, plan_key, name, amount_paise, razorpay_plan_id')
    .eq('plan_key', planKey)
    .eq('is_active', true)
    .single()

  if (planError || !plan) {
    return NextResponse.json({ error: 'Billing plan is not configured' }, { status: 500 })
  }

  try {
    const subscription = await createRazorpaySubscription({
      planId: plan.razorpay_plan_id,
      userId: user.id,
      planKey,
      email: user.email ?? undefined,
      name: user.user_metadata?.name,
    })

    const { error: insertError } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: user.id,
        billing_plan_id: plan.id,
        razorpay_subscription_id: subscription.id,
        razorpay_customer_id: subscription.customer_id ?? null,
        razorpay_plan_id: subscription.plan_id,
        status: subscription.status ?? 'created',
        current_period_start: fromUnix(subscription.current_start),
        current_period_end: fromUnix(subscription.current_end),
        quantity: subscription.quantity ?? 1,
        raw_subscription: subscription,
      })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: 'ChannelIQ',
      description: `${plan.name} monthly access`,
      amount: plan.amount_paise,
      currency: 'INR',
      prefill: {
        name: user.user_metadata?.name ?? '',
        email: user.email ?? '',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create subscription'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}

function fromUnix(value: number | null | undefined) {
  return typeof value === 'number' ? new Date(value * 1000).toISOString() : null
}
