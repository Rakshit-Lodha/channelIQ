create type public.billing_provider as enum ('razorpay');

create type public.subscription_status as enum (
  'created',
  'authenticated',
  'active',
  'pending',
  'halted',
  'cancelled',
  'completed',
  'expired',
  'failed',
  'paused'
);

create table public.billing_plans (
  id uuid primary key default gen_random_uuid(),
  plan_key text not null unique,
  name text not null,
  amount_paise integer not null,
  currency text not null default 'INR',
  interval_count integer not null default 1,
  interval_unit text not null default 'monthly',
  razorpay_plan_id text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  billing_plan_id uuid not null references public.billing_plans(id),
  provider public.billing_provider not null default 'razorpay',
  razorpay_subscription_id text unique,
  razorpay_customer_id text,
  razorpay_plan_id text,
  razorpay_payment_id text,
  status public.subscription_status not null default 'created',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  cancelled_at timestamptz,
  ended_at timestamptz,
  quantity integer not null default 1,
  raw_subscription jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.billing_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  user_subscription_id uuid references public.user_subscriptions(id) on delete set null,
  provider public.billing_provider not null default 'razorpay',
  razorpay_payment_id text unique,
  razorpay_invoice_id text,
  razorpay_order_id text,
  razorpay_subscription_id text,
  amount_paise integer not null,
  currency text not null default 'INR',
  status text not null,
  method text,
  email text,
  contact text,
  raw_payment jsonb,
  created_at timestamptz not null default now()
);

create table public.billing_webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider public.billing_provider not null default 'razorpay',
  provider_event_id text,
  event_type text not null,
  signature_valid boolean not null default false,
  processed boolean not null default false,
  processing_error text,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create unique index billing_webhook_events_provider_event_id_idx
  on public.billing_webhook_events(provider, provider_event_id)
  where provider_event_id is not null;

create index user_subscriptions_user_id_idx on public.user_subscriptions(user_id);
create index user_subscriptions_status_idx on public.user_subscriptions(status);
create index billing_payments_user_id_idx on public.billing_payments(user_id);
create index billing_payments_subscription_id_idx on public.billing_payments(user_subscription_id);

insert into public.billing_plans
  (plan_key, name, amount_paise, interval_count, interval_unit, razorpay_plan_id)
values
  ('basic', 'Basic', 500000, 1, 'monthly', 'plan_Sf0LSc06p5z2qr'),
  ('intermediate', 'Intermediate', 1000000, 1, 'monthly', 'plan_Sf0LScavvuajfp'),
  ('full_access', 'Full access', 2500000, 1, 'monthly', 'plan_Sf0LSgS4xPMWsF')
on conflict (plan_key) do update set
  name = excluded.name,
  amount_paise = excluded.amount_paise,
  interval_count = excluded.interval_count,
  interval_unit = excluded.interval_unit,
  razorpay_plan_id = excluded.razorpay_plan_id,
  is_active = true;

alter table public.billing_plans enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.billing_payments enable row level security;
alter table public.billing_webhook_events enable row level security;

create policy "Authenticated users can read active billing plans"
  on public.billing_plans
  for select
  to authenticated
  using (is_active = true);

create policy "Users can read own subscriptions"
  on public.user_subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create own subscriptions"
  on public.user_subscriptions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can read own payments"
  on public.billing_payments
  for select
  to authenticated
  using (auth.uid() = user_id);
