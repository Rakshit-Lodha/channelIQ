import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChannelData {
  id: string
  handle: string
  title: string
  description: string
  subscriberCount: string
  videoCount: string
  viewCount: string
  thumbnailUrl: string
  publishedAt: string
  country?: string
  customUrl?: string
}

export interface OnboardingState {
  // Auth
  user: { id: string; name: string; email: string } | null

  // Channel
  myChannel: ChannelData | null

  // Competitors
  competitors: ChannelData[]

  // Flow
  generatingStarted: boolean
  generatingDone: boolean
  unlocked: boolean

  // Actions
  setUser: (user: { id: string; name: string; email: string }) => void
  setMyChannel: (channel: ChannelData) => void
  addCompetitor: (channel: ChannelData) => void
  removeCompetitor: (id: string) => void
  startGenerating: () => void
  finishGenerating: () => void
  unlock: () => void
  reset: () => void
}

export const useStore = create<OnboardingState>()(
  persist(
    (set) => ({
      user: null,
      myChannel: null,
      competitors: [],
      generatingStarted: false,
      generatingDone: false,
      unlocked: false,

      setUser: (user) => set({ user }),
      setMyChannel: (channel) => set({ myChannel: channel }),
      addCompetitor: (channel) =>
        set((s) => ({
          competitors: s.competitors.find((c) => c.id === channel.id)
            ? s.competitors
            : [...s.competitors.slice(0, 9), channel],
        })),
      removeCompetitor: (id) =>
        set((s) => ({ competitors: s.competitors.filter((c) => c.id !== id) })),
      startGenerating: () => set({ generatingStarted: true }),
      finishGenerating: () => set({ generatingDone: true }),
      unlock: () => set({ unlocked: true }),
      reset: () =>
        set({
          myChannel: null,
          competitors: [],
          generatingStarted: false,
          generatingDone: false,
          unlocked: false,
        }),
    }),
    { name: 'channeliq-onboarding' }
  )
)
