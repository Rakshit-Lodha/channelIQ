import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export interface ChannelResult {
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

/**
 * Resolve a YouTube channel from a URL or handle.
 * Accepts: @handle, youtube.com/@handle, youtube.com/channel/UCxxx, youtube.com/c/name
 */
export async function resolveChannel(input: string): Promise<ChannelResult> {
  const cleaned = input.trim()

  // Extract handle or channel ID from various URL formats
  let handle: string | null = null
  let channelId: string | null = null

  const channelIdMatch = cleaned.match(/channel\/(UC[\w-]{20,})/)
  if (channelIdMatch) {
    channelId = channelIdMatch[1]
  } else {
    // Extract handle: @foo from URL or bare @foo
    const handleMatch = cleaned.match(/@([\w.-]+)/)
    if (handleMatch) {
      handle = '@' + handleMatch[1]
    } else {
      // Last fallback: treat as handle
      handle = cleaned.startsWith('@') ? cleaned : '@' + cleaned
    }
  }

  let res
  if (channelId) {
    res = await youtube.channels.list({
      part: ['snippet', 'statistics'],
      id: [channelId],
      maxResults: 1,
    })
  } else {
    res = await youtube.channels.list({
      part: ['snippet', 'statistics'],
      forHandle: handle!.replace('@', ''),
      maxResults: 1,
    })
  }

  const items = res.data.items
  if (!items || items.length === 0) {
    throw new Error('Channel not found')
  }

  const ch = items[0]
  const snippet = ch.snippet!
  const stats = ch.statistics!

  return {
    id: ch.id!,
    handle: handle ?? snippet.customUrl ?? ch.id!,
    title: snippet.title ?? 'Unknown',
    description: snippet.description ?? '',
    subscriberCount: stats.subscriberCount ?? '0',
    videoCount: stats.videoCount ?? '0',
    viewCount: stats.viewCount ?? '0',
    thumbnailUrl: snippet.thumbnails?.high?.url ?? snippet.thumbnails?.default?.url ?? '',
    publishedAt: snippet.publishedAt ?? '',
    country: snippet.country ?? undefined,
    customUrl: snippet.customUrl ?? undefined,
  }
}
