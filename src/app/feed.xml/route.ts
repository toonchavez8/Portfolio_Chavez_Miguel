import { buildFeedXml, createFeedResponse, getJournelFeedItems, getProjectFeedItems } from '@/lib/rss'

export const revalidate = 3600

export async function GET() {
  const [projectItems, journelItems] = await Promise.all([
    getProjectFeedItems(),
    getJournelFeedItems(),
  ])

  const xml = buildFeedXml({
    title: 'Toonchavez Dev Feed',
    description: 'Projects and journal entries published on Toonchavez Dev.',
    sitePath: '/',
    feedPath: '/feed.xml',
    items: [...projectItems, ...journelItems],
  })

  return createFeedResponse(xml)
}
