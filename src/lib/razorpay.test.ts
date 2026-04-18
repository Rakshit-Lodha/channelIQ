import crypto from 'node:crypto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createRazorpaySubscription, verifyRazorpayWebhookSignature } from './razorpay'

describe('Razorpay helpers', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('verifies webhook signatures using the raw request body', () => {
    vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', 'test_webhook_secret')
    const rawBody = JSON.stringify({ event: 'subscription.charged', payload: { id: 'evt_1' } })
    const signature = crypto
      .createHmac('sha256', 'test_webhook_secret')
      .update(rawBody)
      .digest('hex')

    expect(verifyRazorpayWebhookSignature(rawBody, signature)).toBe(true)
    expect(verifyRazorpayWebhookSignature(`${rawBody}\n`, signature)).toBe(false)
  })

  it('rejects missing or malformed webhook signatures', () => {
    vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', 'test_webhook_secret')

    expect(verifyRazorpayWebhookSignature('{}', null)).toBe(false)
    expect(verifyRazorpayWebhookSignature('{}', 'short')).toBe(false)
  })

  it('creates a subscription with the expected Razorpay payload and auth header', async () => {
    vi.stubEnv('RAZORPAY_KEY_ID', 'rzp_test_key')
    vi.stubEnv('RAZORPAY_KEY_SECRET', 'test_secret')

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'sub_123', status: 'created' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await createRazorpaySubscription({
      planId: 'plan_basic',
      userId: 'user_123',
      planKey: 'basic',
      email: 'creator@example.com',
      name: 'Creator',
    })

    expect(result).toEqual({ id: 'sub_123', status: 'created' })
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.razorpay.com/v1/subscriptions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Basic ${Buffer.from('rzp_test_key:test_secret').toString('base64')}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          plan_id: 'plan_basic',
          total_count: 120,
          quantity: 1,
          customer_notify: true,
          notes: {
            user_id: 'user_123',
            plan_key: 'basic',
            email: 'creator@example.com',
            name: 'Creator',
          },
        }),
      })
    )
  })

  it('surfaces Razorpay API errors when subscription creation fails', async () => {
    vi.stubEnv('RAZORPAY_KEY_ID', 'rzp_test_key')
    vi.stubEnv('RAZORPAY_KEY_SECRET', 'test_secret')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: { description: 'Plan is invalid' } }),
    }))

    await expect(createRazorpaySubscription({
      planId: 'plan_missing',
      userId: 'user_123',
      planKey: 'basic',
    })).rejects.toThrow('Plan is invalid')
  })
})
