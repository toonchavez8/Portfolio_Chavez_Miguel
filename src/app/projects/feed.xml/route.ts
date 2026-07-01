import { buildFeedXml, createFeedResponse, getProjectFeedItems } from '@/lib/rss'

export const revalidate = 3600

export async function GET() {
  const items = await getProjectFeedItems()

  const xml = buildFeedXml({
    title: 'Toonchavez Dev Projects Feed',
    description: 'Project updates published on Toonchavez Dev.',
    sitePath: '/projects',
    feedPath: '/projects/feed.xml',
    items,
  })

  return createFeedResponse(xml)
}
