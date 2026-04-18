import crypto from 'crypto'

const RAZORPAY_API_BASE = 'https://api.razorpay.com/v1'

function getRazorpayAuthHeader() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API credentials are not configured')
  }

  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`
}

export async function createRazorpaySubscription({
  planId,
  userId,
  planKey,
  email,
  name,
}: {
  planId: string
  userId: string
  planKey: string
  email?: string
  name?: string
}) {
  const response = await fetch(`${RAZORPAY_API_BASE}/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: getRazorpayAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan_id: planId,
      total_count: 120,
      quantity: 1,
      customer_notify: true,
      notes: {
        user_id: userId,
        plan_key: planKey,
        email: email ?? '',
        name: name ?? '',
      },
    }),
  })

  const payload = await response.json()

  if (!response.ok) {
    const message = payload?.error?.description || payload?.error?.reason || 'Failed to create Razorpay subscription'
    throw new Error(message)
  }

  return payload
}

export function verifyRazorpayWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret || !signature) return false

  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')

  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) return false

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
}
