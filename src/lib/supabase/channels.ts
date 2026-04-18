import type { ChannelData } from '@/lib/store'

export async function saveChannel(channel: ChannelData, isPrimary: boolean) {
  const res = await fetch('/api/channels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, isPrimary }),
  })
  if (!res.ok) {
    const { error } = await res.json()
    console.error('saveChannel error:', error)
  }
}

export async function deleteChannel(youtubeId: string) {
  const res = await fetch('/api/channels', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ youtubeId }),
  })
  if (!res.ok) {
    const { error } = await res.json()
    console.error('deleteChannel error:', error)
  }
}
