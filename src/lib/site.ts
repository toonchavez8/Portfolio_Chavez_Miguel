import { asImageSrc, type ImageFieldImage } from '@prismicio/client'
import type { Metadata } from 'next'

export const SITE_NAME = 'Toonchavez Dev'
export const SITE_URL = 'https://www.toonchavez.dev'

const INTERNAL_ROUTE_ALIASES: Record<string, string> = {
  '/about': '/about-me',
}

export const normalizeInternalPath = (path: string) => {
  if (!path) return '/'

  if (/^https?:\/\//i.test(path)) {
    const url = new URL(path)
    url.pathname = normalizeInternalPath(url.pathname)
    return url.toString()
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  const withoutTrailingSlash =
    withLeadingSlash !== '/' ? withLeadingSlash.replace(/\/+$/, '') : '/'

  return INTERNAL_ROUTE_ALIASES[withoutTrailingSlash] ?? withoutTrailingSlash
}

export const toAbsoluteUrl = (path?: string | null) => {
  if (!path) return SITE_URL

  if (/^https?:\/\//i.test(path)) {
    return normalizeInternalPath(path)
  }

  return new URL(normalizeInternalPath(path), SITE_URL).toString()
}

type BuildPageMetadataArgs = {
  description?: string | null
  fallbackDescription: string
  fallbackTitle: string
  path?: string | null
  title?: string | null
  image?: ImageFieldImage | null
}

export const buildPageMetadata = ({
  description,
  fallbackDescription,
  fallbackTitle,
  path,
  title,
  image,
}: BuildPageMetadataArgs): Metadata => {
  const resolvedTitle = title || fallbackTitle
  const resolvedDescription = description || fallbackDescription
  const canonicalUrl = toAbsoluteUrl(path)
  const imageUrl = asImageSrc(image) ?? undefined

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: resolvedTitle,
      description: resolvedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}
