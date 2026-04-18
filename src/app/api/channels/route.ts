import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { channel, isPrimary } = body

  const { error } = await supabase.from('channels').upsert({
    user_id: user.id,
    youtube_id: channel.id,
    handle: channel.handle,
    title: channel.title,
    description: channel.description,
    subscriber_count: parseInt(channel.subscriberCount) || 0,
    video_count: parseInt(channel.videoCount) || 0,
    view_count: parseInt(channel.viewCount) || 0,
    thumbnail_url: channel.thumbnailUrl,
    published_at: channel.publishedAt,
    country: channel.country ?? null,
    custom_url: channel.customUrl ?? null,
    is_primary: isPrimary,
  }, { onConflict: 'user_id,youtube_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { youtubeId } = await req.json()

  const { error } = await supabase
    .from('channels')
    .delete()
    .eq('user_id', user.id)
    .eq('youtube_id', youtubeId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
