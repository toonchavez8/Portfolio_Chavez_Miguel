import type { Content } from '@prismicio/client'
import { createClient } from '@/prismicio'

// Export the project_byte item type from the slice
export type ProjectByteItem =
  Content.ProjectGallerySliceDefaultPrimaryProjectByteItem

export type ProjectDocument = Content.ProjectDocument

/**
 * Fetches the ProjectGallery slice from a page that contains it
 * (e.g., homepage or projects_catalog)
 */
export async function getProjectGallerySlice(
  pageType: 'homepage' | 'projects_catalog' = 'projects_catalog',
): Promise<Content.ProjectGallerySlice | null> {
  const client = createClient()

  try {
    const page = await client.getSingle(pageType)
    const slice = page.data.slices.find(
      (s) => s.slice_type === 'project_gallery',
    ) as Content.ProjectGallerySlice | undefined
    return slice ?? null
  } catch {
    return null
  }
}

/**
 * Fetches all project bytes from the ProjectGallery slice
 */
export async function getAllProjectBytes(): Promise<ProjectByteItem[]> {
  const slice = await getProjectGallerySlice()
  if (!slice) return []

  return slice.primary.project_byte ?? []
}

/**
 * Fetches only featured project bytes
 */
export async function getFeaturedProjectBytes(): Promise<ProjectByteItem[]> {
  const allBytes = await getAllProjectBytes()
  return allBytes.filter((item) => item.featured === true)
}

/**
 * Alternative: Get project bytes with filter option
 */
export async function getProjectBytesWithFilter(
  filter?: 'all' | 'featured',
): Promise<ProjectByteItem[]> {
  const allBytes = await getAllProjectBytes()

  if (filter === 'featured') {
    return allBytes.filter((item) => item.featured === true)
  }

  return allBytes
}

/**
 * Fetches a single project document by UID (for project detail pages)
 */
export async function getProjectByUID(
  uid: string,
): Promise<ProjectDocument | null> {
  const client = createClient()

  try {
    const project = await client.getByUID('project', uid)
    return project
  } catch {
    return null
  }
}

/**
 * extract tags from project bytes
 * tags are stored as CSV in project_tags field
 */
export function extractTagsFromProject(projects: ProjectByteItem[]): string[] {
  const tagSet = new Set<string>()

  for (const project of projects) {
    if (project.project_tags) {
      const tags = project.project_tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)

      for (const tag of tags) {
        tagSet.add(tag)
      }
    }
  }

  return Array.from(tagSet).sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' }),
  )
}

/**
 * Filter project by specific tag
 * return all project if tag is null or empty
 */
export function filterProjectsByTag(
  projects: ProjectByteItem[],
  tag: string | null,
): ProjectByteItem[] {
  if (!tag) return projects

  const normalizedTag = tag.toLowerCase().trim()

  return projects.filter((projects) => {
    if (!projects.project_tags) return false

    const projectTags = projects.project_tags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())

    return projectTags.includes(normalizedTag)
  })
}

/**
 * fetches all unique tags from the project gallery
 * server side function for inicial page load
 */
export async function getAllProjectTags(): Promise<string[]> {
  const allBytes = await getAllProjectBytes()

  return extractTagsFromProject(allBytes)
}
