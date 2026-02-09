import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))

  const secret = process.env.PRISMIC_WEBHOOK_SECRET
  const bodySecret = typeof body?.secret === 'string' ? body.secret : undefined
  const headerSecret =
    request.headers.get('x-prismic-secret') ??
    request.headers.get('x-prismic-webhook-secret')

  if (secret && secret !== bodySecret && secret !== headerSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('prismic', 'max')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
