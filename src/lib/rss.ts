import { asText, type Content } from '@prismicio/client'
import { createClient } from '@/prismicio'
import { SITE_NAME, toAbsoluteUrl } from './site'

type FeedDocument = Content.ProjectDocument | Content.JournelEntryDocument

type FeedItem = {
  category: string
  description: string
  guid: string
  link: string
  pubDate: string
  title: string
}

type FeedConfig = {
  description: string
  feedPath: string
  items: FeedItem[]
  sitePath: string
  title: string
}

const RSS_HEADERS = {
  'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
  'Content-Type': 'application/rss+xml; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
}

const MAX_DESCRIPTION_LENGTH = 280

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function truncate(value: string, maxLength = MAX_DESCRIPTION_LENGTH): string {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function getSliceText(document: FeedDocument): string {
  const text = document.data.slices
    .map((slice) => asText(slice.primary.rich_text))
    .map(normalizeText)
    .filter(Boolean)
    .join(' ')

  return normalizeText(text)
}

function getDocumentTitle(document: FeedDocument): string {
  const metaTitle = normalizeText(document.data.meta_title ?? '')

  if (metaTitle) {
    return metaTitle
  }

  const contentTitle = getSliceText(document).split(/(?<=[.!?])\s+|\n+/)[0]

  if (contentTitle) {
    return truncate(contentTitle, 120)
  }

  return document.uid ?? document.id
}

function getDocumentDescription(document: FeedDocument): string {
  const metaDescription = normalizeText(document.data.meta_description ?? '')

  if (metaDescription) {
    return truncate(metaDescription)
  }

  const contentText = getSliceText(document)

  if (contentText) {
    return truncate(contentText)
  }

  return `Read more on ${SITE_NAME}.`
}

function getDocumentDate(document: FeedDocument): string {
  const rawDate =
    document.first_publication_date ?? document.last_publication_date

  return new Date(rawDate ?? Date.now()).toUTCString()
}

function toFeedItem(document: FeedDocument, category: string): FeedItem {
  return {
    category,
    description: getDocumentDescription(document),
    guid: `${document.type}:${document.id}`,
    link: toAbsoluteUrl(document.url ?? `/${document.uid ?? ''}`),
    pubDate: getDocumentDate(document),
    title: getDocumentTitle(document),
  }
}

function sortFeedItems(items: FeedItem[]): FeedItem[] {
  return [...items].sort((left, right) => {
    return (
      new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime()
    )
  })
}

export async function getProjectFeedItems(): Promise<FeedItem[]> {
  const client = createClient()
  const documents = await client.getAllByType('project')

  return sortFeedItems(documents.map((document) => toFeedItem(document, 'Project')))
}

export async function getJournelFeedItems(): Promise<FeedItem[]> {
  const client = createClient()
  const documents = await client.getAllByType('journel_entry')

  return sortFeedItems(
    documents.map((document) => toFeedItem(document, 'Journel Entry')),
  )
}

export function buildFeedXml({
  description,
  feedPath,
  items,
  sitePath,
  title,
}: FeedConfig): string {
  const channelLink = toAbsoluteUrl(sitePath)
  const feedLink = toAbsoluteUrl(feedPath)
  const sortedItems = sortFeedItems(items)
  const lastBuildDate = sortedItems[0]?.pubDate ?? new Date().toUTCString()

  const itemXml = sortedItems
    .map((item) => {
      return [
        '<item>',
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${escapeXml(item.link)}</link>`,
        `<guid isPermaLink="false">${escapeXml(item.guid)}</guid>`,
        `<pubDate>${escapeXml(item.pubDate)}</pubDate>`,
        `<description>${escapeXml(item.description)}</description>`,
        `<category>${escapeXml(item.category)}</category>`,
        '</item>',
      ].join('')
    })
    .join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${escapeXml(title)}</title>`,
    `<link>${escapeXml(channelLink)}</link>`,
    `<description>${escapeXml(description)}</description>`,
    '<language>en-us</language>',
    `<lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedLink)}" rel="self" type="application/rss+xml" />`,
    itemXml,
    '</channel>',
    '</rss>',
  ].join('')
}

export function createFeedResponse(xml: string): Response {
  return new Response(xml, {
    headers: RSS_HEADERS,
  })
}
