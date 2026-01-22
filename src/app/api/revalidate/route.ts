import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // Verify the webhook secret if configured
  const secret = process.env.PRISMIC_WEBHOOK_SECRET
  if (secret && body.secret !== secret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('prismic ', 'max')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
