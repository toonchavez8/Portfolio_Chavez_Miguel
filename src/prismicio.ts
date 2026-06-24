import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import prismicConfig from '../prismic.config.json'

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || prismicConfig.repositoryName

const routes: Route[] = prismicConfig.routes

type PrismicFetchOptions = NonNullable<ClientConfig['fetchOptions']> & {
  next?: {
    tags?: string[]
    revalidate?: number
  }
}

export const createClient = (config: ClientConfig = {}) => {
  const fetchOptions: PrismicFetchOptions =
    process.env.NODE_ENV === 'production'
      ? { cache: 'force-cache', next: { tags: ['prismic'] } }
      : { next: { revalidate: 5 } }

  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions,
    ...config,
  })

  enableAutoPreviews({ client })

  return client
}
