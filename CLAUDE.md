# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

ChannelIQ is a YouTube analytics and content intelligence tool for creators. A user connects their own YouTube channel plus up to 10 competitor channels. The app fetches public metadata via the YouTube Data API, then generates a dashboard with benchmarks (growth rate, posting cadence), outlier videos, unwritten topic gaps, posting-time heatmaps, and AI-generated script ideas. The dashboard is gated behind a paywall — users go through the full onboarding flow before paying.

The product is India-first (pricing in ₹, India-focused creator examples). Auth and payment are currently mocked prototypes; the YouTube data fetching is real.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

> **Note:** This repo uses Next.js 16.2.4 with React 19. APIs and conventions may differ from earlier Next.js versions. Check `node_modules/next/dist/docs/` before writing framework-specific code.

## Environment

Requires `.env.local` (gitignored):
```
YOUTUBE_API_KEY=...
```

For Render deployment, set this as an environment variable in the dashboard.

## Architecture

**User flow:** `/` → `/login` → `/onboarding/channel` → `/onboarding/competitors` → `/onboarding/generating` → `/onboarding/unlock`

**State (`src/lib/store.ts`):** Single Zustand store persisted to `localStorage` under the key `channeliq-onboarding`. Holds `user`, `myChannel` (own channel), `competitors` (up to 10), and flow flags (`generatingStarted`, `generatingDone`, `unlocked`). All onboarding pages read from and write to this store — it's the source of truth across the entire flow.

**YouTube API (`src/lib/youtube.ts`):** `resolveChannel(input)` accepts any YouTube URL format (`@handle`, `youtube.com/@handle`, `youtube.com/channel/UCxxx`) and calls the YouTube Data API v3 (`channels.list` with `snippet,statistics`). Runs server-side only.

**API route (`src/app/api/youtube/channel/route.ts`):** Single `POST` endpoint that calls `resolveChannel`. Both the channel page and competitors page hit this same endpoint. Returns `{ channel: ChannelData }` or `{ error: string }`.

**UI primitives (`src/components/ui/index.tsx`):** All shared components live here — `Logo`, `Btn`, `Input`, `Pill`, `ChannelMark`, `Meter`, `CircularProgress`, `MiniLine`, `formatCount`. No external component library; everything is hand-rolled with inline styles using CSS custom properties.

**Design system:** CSS custom properties defined in `src/app/globals.css` — `--paper`, `--ink`, `--accent` (terracotta `#C44536`), `--brass`, `--rule`, etc. Typography uses Instrument Serif (via Google Fonts in `layout.tsx`) for display/headings and Geist for sans/mono. All components use inline styles referencing these vars — no Tailwind utility classes in component code.

**Onboarding progress bar:** The `OnboardingProgress` component is defined and exported from `src/app/onboarding/channel/page.tsx` and imported by the other three onboarding pages. If restructuring, keep this export in mind.
