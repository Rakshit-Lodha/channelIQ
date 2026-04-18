import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

const mocks = vi.hoisted(() => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
  createRazorpaySubscription: vi.fn(),
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => mocks.supabase),
}))

vi.mock('@/lib/razorpay', () => ({
  createRazorpaySubscription: mocks.createRazorpaySubscription,
}))

describe('POST /api/razorpay/subscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'rzp_test_public'
  })

  it('requires an authenticated user', async () => {
    mocks.supabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: new Error('No user'),
    })

    const response = await POST(jsonRequest({ planKey: 'basic' }))

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: 'Unauthorized' })
  })

  it('rejects unknown plan keys before contacting Razorpay', async () => {
    mocks.supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user_123', email: 'creator@example.com', user_metadata: {} } },
      error: null,
    })

    const response = await POST(jsonRequest({ planKey: 'enterprise' }))

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Invalid plan' })
    expect(mocks.createRazorpaySubscription).not.toHaveBeenCalled()
  })

  it('creates a Razorpay subscription and stores the local subscription row', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null })
    mocks.supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: 'user_123',
          email: 'creator@example.com',
          user_metadata: { name: 'Creator' },
        },
      },
      error: null,
    })
    mocks.supabase.from.mockImplementation((table: string) => {
      if (table === 'billing_plans') {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                single: async () => ({
                  data: {
                    id: 'plan_row_123',
                    plan_key: 'basic',
                    name: 'Basic',
                    amount_paise: 500000,
                    razorpay_plan_id: 'plan_basic',
                  },
                  error: null,
                }),
              }),
            }),
          }),
        }
      }

      return { insert }
    })
    mocks.createRazorpaySubscription.mockResolvedValue({
      id: 'sub_123',
      customer_id: 'cust_123',
      plan_id: 'plan_basic',
      status: 'created',
      current_start: 1776526000,
      current_end: 1779118000,
      quantity: 1,
    })

    const response = await POST(jsonRequest({ planKey: 'basic' }))
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(mocks.createRazorpaySubscription).toHaveBeenCalledWith({
      planId: 'plan_basic',
      userId: 'user_123',
      planKey: 'basic',
      email: 'creator@example.com',
      name: 'Creator',
    })
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'user_123',
      billing_plan_id: 'plan_row_123',
      razorpay_subscription_id: 'sub_123',
      razorpay_customer_id: 'cust_123',
      razorpay_plan_id: 'plan_basic',
      status: 'created',
    }))
    expect(body).toEqual(expect.objectContaining({
      subscriptionId: 'sub_123',
      keyId: 'rzp_test_public',
      name: 'ChannelIQ',
      amount: 500000,
      currency: 'INR',
    }))
  })
})

function jsonRequest(body: unknown) {
  return new Request('http://localhost/api/razorpay/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as Parameters<typeof POST>[0]
}
