import { NextRequest, NextResponse } from 'next/server'
import { resolveChannel } from '@/lib/youtube'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'url is required' }, { status: 400 })
    }

    const channel = await resolveChannel(url)
    return NextResponse.json({ channel })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch channel'
    return NextResponse.json({ error: message }, { status: 404 })
  }
}
