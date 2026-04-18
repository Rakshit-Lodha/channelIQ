export const BILLING_PLANS = {
  basic: {
    name: 'Basic',
    price: '₹5,000',
    period: 'per month',
    amountPaise: 500000,
    description: 'For a single creator getting the first clean read.',
    features: ['1 channel', 'Up to 5 competitors', 'Daily refresh', 'Topic gaps'],
  },
  intermediate: {
    name: 'Intermediate',
    price: '₹10,000',
    period: 'per month',
    amountPaise: 1000000,
    description: 'For creators who want the full weekly operating view.',
    features: ['1 channel', 'Up to 10 competitors', 'Daily refresh', 'Script lab', 'Timing heatmap'],
  },
  full_access: {
    name: 'Full access',
    price: '₹25,000',
    period: 'per month',
    amountPaise: 2500000,
    description: 'For teams running multiple channels and strategy reviews.',
    features: ['Up to 5 channels', 'Unlimited competitors', 'Shared workspace', 'Weekly strategy edition'],
  },
} as const

export type BillingPlanKey = keyof typeof BILLING_PLANS

export function isBillingPlanKey(value: string): value is BillingPlanKey {
  return value in BILLING_PLANS
}
