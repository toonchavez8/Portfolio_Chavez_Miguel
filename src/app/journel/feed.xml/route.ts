import { buildFeedXml, createFeedResponse, getJournelFeedItems } from '@/lib/rss'

export const revalidate = 3600

export async function GET() {
  const items = await getJournelFeedItems()

  const xml = buildFeedXml({
    title: 'Toonchavez Dev Journel Feed',
    description: 'Journal entries published on Toonchavez Dev.',
    sitePath: '/journel',
    feedPath: '/journel/feed.xml',
    items,
  })

  return createFeedResponse(xml)
}
