import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from '../slicemachine.config.json'

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName

const routes: Route[] = [
  { type: 'homepage', path: '/' },
  { type: 'about_me', path: '/about-me' },
  { type: 'colophon', path: '/colophon' },
  { type: 'settings', path: '/settings' },

  { type: 'now_page', path: '/now' },
  { type: 'now_entries', path: '/now/:uid' },

  { type: 'journel_catalog', path: '/journel' },
  { type: 'journel_entry', path: '/journel/:uid' },

  { type: 'projects_catalog', path: '/projects' },
  { type: 'project', path: '/projects/:uid' },
]

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
