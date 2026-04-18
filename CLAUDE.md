# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

ChannelIQ is a YouTube analytics and content intelligence tool for creators. A user connects their own YouTube channel plus up to 10 competitor channels. The app fetches public metadata via the YouTube Data API, then generates a dashboard with benchmarks (growth rate, posting cadence), outlier videos, unwritten topic gaps, posting-time heatmaps, and AI-generated script ideas. The dashboard is gated behind a paywall — users go through the full onboarding flow before paying.

The product is India-first (pricing in ₹, India-focused creator examples). Auth uses Supabase (email/password + Google OAuth). Payments use Razorpay Subscriptions in test mode with three monthly plans. YouTube data fetching is real.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run test     # Vitest payment/unit tests
```

> **Note:** This repo uses Next.js 16.2.4 with React 19. APIs and conventions may differ from earlier Next.js versions. Check `node_modules/next/dist/docs/` before writing framework-specific code.

## Environment

Requires `.env.local` (gitignored):
```
YOUTUBE_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...          # Server-only. Needed for Razorpay webhooks.
NEXT_PUBLIC_RAZORPAY_KEY_ID=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
RAZORPAY_PLAN_BASIC=...
RAZORPAY_PLAN_INTERMEDIATE=...
RAZORPAY_PLAN_FULL_ACCESS=...
```

For Render deployment, set these as environment variables in the dashboard.

## Architecture

**User flow:** `/` → `/login` → `/onboarding/channel` → `/onboarding/competitors` → `/onboarding/generating` → `/onboarding/unlock`

**Auth (`src/app/login/page.tsx`):** Supabase email/password authentication with signup and signin tabs, plus Google OAuth via `supabase.auth.signInWithOAuth({ provider: 'google' })`. On email signup, users are routed to `/onboarding/channel`; on email signin, they resume from where they left off via `resumeRoute()`. Google OAuth sends users through `/auth/callback?next=...`, exchanges the auth code for a Supabase session, then redirects to the requested onboarding route.

**OAuth callback (`src/app/auth/callback/route.ts`):** Handles Supabase PKCE code exchange with `exchangeCodeForSession(code)`. Keep this route server-side because it sets Supabase auth cookies. Supabase redirect allow-list must include `http://localhost:3000/auth/callback` for local testing and `https://channeliq-qygy.onrender.com/auth/callback` for production. Google Cloud's OAuth client should use the Supabase provider callback URL (`https://yvswdgmwqctrsarnxzq.supabase.co/auth/v1/callback`) as its authorized redirect URI.

**Auth sync (`src/components/AuthSync.tsx`):** Mounted in `src/app/layout.tsx`. It reads the current Supabase user and subscribes to auth state changes, then mirrors `{ id, name, email }` into the persisted Zustand store. This is needed because OAuth returns through a redirect, unlike the email form where `setUser()` is called inline.

**State (`src/lib/store.ts`):** Single Zustand store persisted to `localStorage` under the key `channeliq-onboarding`. Holds `user` (id, name, email from auth), `myChannel` (own channel), `competitors` (up to 10), and flow flags (`generatingStarted`, `generatingDone`, `unlocked`). All onboarding pages read from and write to this store — it's the source of truth across the entire flow.

**Payments:** Razorpay is the chosen payments provider. The three current plans are monthly only: `basic` ₹5,000/month, `intermediate` ₹10,000/month, and `full_access` ₹25,000/month. The plan catalog lives in `src/lib/billing/plans.ts`, and Razorpay plan IDs are configured via env vars. The unlock page calls `POST /api/razorpay/subscription`, which creates a Razorpay subscription server-side and opens Razorpay Checkout in the browser. The webhook endpoint is `POST /api/razorpay/webhook`; Razorpay Dashboard is configured to call `https://channeliq-qygy.onrender.com/api/razorpay/webhook`.

**Payment DB model:** Keep profile and billing state separate. `profiles` should remain identity/profile data only (`id`, `name`, `email`, timestamps). Do not store duplicated billing state like `billing_status`, `active_subscription_id`, `active_plan_key`, `unlocked_at`, or payment-derived `unlocked` on `profiles`. Billing source-of-truth tables are `billing_plans`, `user_subscriptions`, `billing_payments`, and `billing_webhook_events`. App access decisions should derive from `user_subscriptions.status` joined to `billing_plans`, preferably through a read view such as `profile_billing_status`.

**Billing schema:** The local SQL migration is `supabase/migrations/20260418120000_add_billing.sql`. It creates `billing_provider` and `subscription_status` enums, the billing tables, indexes, RLS policies for authenticated reads/inserts, and seeds the three Razorpay test plan IDs. Supabase schema changes are not automatic from this repo; run the SQL in Supabase SQL Editor or via a migration tool.

**Payment tests:** Vitest is configured in `vitest.config.ts`. Current payment tests cover Razorpay HMAC verification, subscription API payload/error handling, authenticated subscription route behavior, and signed webhook processing. Run `npm run test`.

**YouTube API (`src/lib/youtube.ts`):** `resolveChannel(input)` accepts any YouTube URL format (`@handle`, `youtube.com/@handle`, `youtube.com/channel/UCxxx`) and calls the YouTube Data API v3 (`channels.list` with `snippet,statistics`). Runs server-side only.

**API route (`src/app/api/youtube/channel/route.ts`):** Single `POST` endpoint that calls `resolveChannel`. Both the channel page and competitors page hit this same endpoint. Returns `{ channel: ChannelData }` or `{ error: string }`.

**UI primitives (`src/components/ui/index.tsx`):** All shared components live here — `Logo`, `Btn`, `Input`, `Pill`, `ChannelMark`, `Meter`, `CircularProgress`, `MiniLine`, `formatCount`. No external component library; everything is hand-rolled with inline styles using CSS custom properties.

**Design system:** CSS custom properties defined in `src/app/globals.css` — `--paper`, `--ink`, `--accent` (terracotta `#C44536`), `--brass`, `--rule`, etc. Typography uses Instrument Serif (via Google Fonts in `layout.tsx`) for display/headings and Geist for sans/mono. All components use inline styles referencing these vars — no Tailwind utility classes in component code.

**Onboarding progress bar:** The `OnboardingProgress` component is defined and exported from `src/app/onboarding/channel/page.tsx` and imported by the other three onboarding pages. If restructuring, keep this export in mind.
