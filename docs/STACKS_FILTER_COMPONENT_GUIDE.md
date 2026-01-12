# Stacks Filter Component Implementation Guide

This guide explains how to create a Stacks filter component that extracts tags from project bytes and provides filtering functionality with URL-based state management.

---

## Table of Contents

1. [Overview](#overview)
2. [Step 1: Create Tag Extraction Utility Functions](#step-1-create-tag-extraction-utility-functions)
3. [Step 2: Create the StacksFilter Client Component](#step-2-create-the-stacksfilter-client-component)
4. [Step 3: Update the ProjectGallery Component](#step-3-update-the-projectgallery-component)
5. [Step 4: Update the Projects Page with URL State](#step-4-update-the-projects-page-with-url-state)
6. [Step 5: Update the Homepage Tag Links](#step-5-update-the-homepage-tag-links)
7. [Step 6: Update Projectlistitem to Link Tags](#step-6-update-projectlistitem-to-link-tags)
8. [Summary](#summary)

---

## Overview

The Stacks filter system consists of several interconnected parts:

- A utility function that extracts unique tags from all project bytes
- A client-side filter component that displays tags as buttons
- URL query parameter support for shareable filtered views
- Navigation from homepage tags to the projects page with the filter applied

The data flow works as follows:

1. Server fetches all project bytes from Prismic
2. Utility function extracts and deduplicates all tags
3. StacksFilter component renders tags as buttons
4. Clicking a tag updates the URL query parameter
5. ProjectGallery filters projects based on the active tag
6. Tags in project items link to the projects page with the filter applied

---

## Step 1: Create Tag Extraction Utility Functions

Add functions to extract unique tags from project bytes. These functions will parse the comma-separated `project_tags` field and return deduplicated arrays.

### Before

```typescript
// src/lib/projects.ts
// Current file ends with getProjectByUID function
```

### After

```typescript
// src/lib/projects.ts
// Add these functions at the end of the file

/**
 * Extracts all unique tags from project bytes
 * Tags are stored as comma-separated strings in project_tags field
 */
export function extractTagsFromProjects(projects: ProjectByteItem[]): string[] {
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

  // Sort alphabetically for consistent ordering
  return Array.from(tagSet).sort()
}

/**
 * Filters projects by a specific tag
 * Returns all projects if tag is null or empty
 */
export function filterProjectsByTag(
  projects: ProjectByteItem[],
  tag: string | null,
): ProjectByteItem[] {
  if (!tag) return projects

  const normalizedTag = tag.toLowerCase().trim()

  return projects.filter((project) => {
    if (!project.project_tags) return false

    const projectTags = project.project_tags
      .split(',')
      .map((t) => t.trim().toLowerCase())

    return projectTags.includes(normalizedTag)
  })
}

/**
 * Fetches all unique tags from the project gallery
 * Server-side function for initial page load
 */
export async function getAllProjectTags(): Promise<string[]> {
  const allBytes = await getAllProjectBytes()
  return extractTagsFromProjects(allBytes)
}
```

### Explanation

- `extractTagsFromProjects`: Takes an array of projects and returns unique tags. It normalizes tags to lowercase for consistent matching.
- `filterProjectsByTag`: Filters a project array by a specific tag. Returns all projects if no tag is provided.
- `getAllProjectTags`: Server-side helper that fetches projects and extracts tags in one call.

---

## Step 2: Create the StacksFilter Client Component

Create a client component that displays tags as clickable buttons and manages the filter state via URL search params.

### File to Create

```
src/components/StacksFilter/StacksFilter.tsx
```

### Code

```tsx
// src/components/StacksFilter/StacksFilter.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, type FC } from 'react'

export interface StacksFilterProps {
  /** Array of unique tags extracted from projects */
  tags: string[]
  /** Optional className for styling */
  className?: string
}

/**
 * Client component that renders filter buttons for project tags
 * Uses URL search params to maintain filter state
 */
export const StacksFilter: FC<StacksFilterProps> = ({ tags, className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the currently active tag from URL
  const activeTag = searchParams.get('tag')

  const handleTagClick = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (activeTag === tag) {
        // If clicking the same tag, remove the filter
        params.delete('tag')
      } else {
        // Set the new tag filter
        params.set('tag', tag)
      }

      // Update URL without full page reload
      const queryString = params.toString()
      router.push(queryString ? `?${queryString}` : '?', { scroll: false })
    },
    [activeTag, router, searchParams],
  )

  const handleClearFilter = useCallback(() => {
    router.push('?', { scroll: false })
  }, [router])

  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-shark-600 dark:text-shark-400">
          // {tags.length} Stacks
        </p>
        {activeTag && (
          <button
            type="button"
            onClick={handleClearFilter}
            className="font-mono text-xs text-viridian-600 hover:text-viridian-500 dark:text-viridian-400"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = activeTag === tag

          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`
                rounded-full border px-3 py-1 font-mono text-sm transition-all
                ${
                  isActive
                    ? 'border-viridian-500 bg-viridian-500/20 text-viridian-600 dark:border-viridian-400 dark:text-viridian-300'
                    : 'border-shark-700/50 bg-transparent text-shark-600 hover:border-viridian-500 hover:text-viridian-600 dark:border-shark-500/50 dark:text-shark-300 dark:hover:border-viridian-400 dark:hover:text-viridian-400'
                }
              `}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default StacksFilter
```

### Explanation

- The component reads the current `tag` query parameter from the URL using `useSearchParams()`.
- Clicking a tag either sets or toggles the filter (clicking an active tag clears it).
- `router.push` with `scroll: false` updates the URL without scrolling to top.
- Active tags have distinct styling to show the current filter state.

---

## Step 3: Update the ProjectGallery Component

Modify ProjectGallery to accept an optional `activeTag` prop for filtering. The filtering logic runs on the client to work with URL state.

### Before

```tsx
// src/components/ProjectGallery/ProjectGallery.tsx
export interface ProjectGalleryProps {
  /** Array of project bytes to display */
  projects: ProjectByteItem[]
  /** Optional section title */
  title?: string
  /** Optional className for styling */
  className?: string
}
```

### After

```tsx
// src/components/ProjectGallery/ProjectGallery.tsx
import { filterProjectsByTag, type ProjectByteItem } from '@/lib/projects'

export interface ProjectGalleryProps {
  /** Array of project bytes to display */
  projects: ProjectByteItem[]
  /** Optional section title */
  title?: string
  /** Optional className for styling */
  className?: string
  /** Optional active tag filter */
  activeTag?: string | null
}

export const ProjectGallery: FC<ProjectGalleryProps> = ({
  projects,
  title,
  className,
  activeTag,
}) => {
  // Filter projects if an active tag is provided
  const displayedProjects = filterProjectsByTag(projects, activeTag ?? null)

  return (
    <section
      className={`group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 lg:px-4 ${className ?? ''}`}
    >
      {title && <SectionTitle title={title} />}

      <div className="grid w-full grid-cols-1 gap-4">
        {displayedProjects.length === 0 ? (
          <p className="py-8 text-center font-mono text-shark-500">
            No projects found with tag "{activeTag}"
          </p>
        ) : (
          displayedProjects.map((item, index) => {
            // ... existing mapping logic
          })
        )}
      </div>
    </section>
  )
}
```

### Explanation

- Added `activeTag` prop to accept the current filter.
- Uses `filterProjectsByTag` utility to filter the projects array.
- Added empty state message when no projects match the filter.

---

## Step 4: Update the Projects Page with URL State

Create a client wrapper component that reads URL params and passes the active tag to ProjectGallery.

### Before

```tsx
// src/app/projects/page.tsx
export default async function ProjectsPage() {
  const allProjects = await getAllProjectBytes()

  return (
    <main className="...">
      <ProjectGallery projects={allProjects} title="All Projects" />
    </main>
  )
}
```

### After

First, create a client wrapper component:

```tsx
// src/app/projects/ProjectsPageClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'
import { StacksFilter } from '@/components/StacksFilter/StacksFilter'
import type { ProjectByteItem } from '@/lib/projects'

interface ProjectsPageClientProps {
  projects: ProjectByteItem[]
  tags: string[]
}

export function ProjectsPageClient({ projects, tags }: ProjectsPageClientProps) {
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  return (
    <>
      <StacksFilter tags={tags} className="w-full" />
      <ProjectGallery
        projects={projects}
        title="All Projects"
        activeTag={activeTag}
      />
    </>
  )
}
```

Then update the page to use it:

```tsx
// src/app/projects/page.tsx
import { asImageSrc } from '@prismicio/client'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getAllProjectBytes, extractTagsFromProjects } from '@/lib/projects'
import { createClient } from '@/prismicio'
import { ProjectsPageClient } from './ProjectsPageClient'

export default async function ProjectsPage() {
  const allProjects = await getAllProjectBytes()
  const tags = extractTagsFromProjects(allProjects)

  return (
    <main className="relative mx-auto flex w-full max-w-11/12 flex-col items-center gap-6 p-4 md:max-w-10/12 md:gap-8 lg:max-w-7/12">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsPageClient projects={allProjects} tags={tags} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  // ... existing metadata logic
}
```

### Explanation

- Server component fetches projects and extracts tags.
- Client wrapper reads URL search params and passes active tag to children.
- `Suspense` boundary is required because `useSearchParams()` needs it during static rendering.
- Data flows: Server fetches -> Client reads URL -> Components filter/display.

---

## Step 5: Update the Homepage Tag Links

For tags displayed on the homepage, make them link to the projects page with the filter applied instead of filtering in place.

### Approach

Create a tag link component that navigates to `/projects?tag=tagname`:

```tsx
// src/components/StacksFilter/TagLink.tsx
import Link from 'next/link'
import type { FC } from 'react'

interface TagLinkProps {
  tag: string
  className?: string
}

/**
 * A tag that links to the projects page with the filter applied
 * Use this for tags displayed on the homepage or other pages
 */
export const TagLink: FC<TagLinkProps> = ({ tag, className }) => {
  return (
    <Link
      href={`/projects?tag=${encodeURIComponent(tag)}`}
      className={`
        rounded-full border border-shark-700/70 bg-viridian-50 px-2 py-0.5
        font-mono text-xs font-semibold text-viridian-700 transition-all
        ease-in hover:scale-110 hover:border-viridian-400 hover:text-viridian-500
        dark:border-shark-400/50 dark:bg-shark-950/50 dark:text-shark-100/50
        dark:hover:border-viridian-800 dark:hover:text-viridian-600
        ${className ?? ''}
      `}
    >
      {tag}
    </Link>
  )
}
```

### Explanation

- Uses Next.js `Link` component for client-side navigation.
- `encodeURIComponent` ensures special characters in tags are URL-safe.
- Navigating from homepage to `/projects?tag=react` will show filtered results.

---

## Step 6: Update Projectlistitem to Link Tags

Modify the tag rendering in Projectlistitem to use the TagLink component instead of plain spans.

### Before

```tsx
// src/components/ProjectSection/Projectlistitem.tsx
<button
  className="@md:flex z-10 hidden flex-wrap items-center justify-center gap-2 cursor-pointer"
  type="button"
>
  {tags.map((tag) => (
    <span
      key={tag}
      className="rounded-full border border-shark-700/70 ..."
    >
      {tag}
    </span>
  ))}
</button>
```

### After

```tsx
// src/components/ProjectSection/Projectlistitem.tsx
import { TagLink } from '@/components/StacksFilter/TagLink'

// ... in the component JSX:

<div className="@md:flex z-10 hidden flex-wrap items-center justify-center gap-2">
  {tags.map((tag) => (
    <TagLink key={tag} tag={tag} />
  ))}
</div>
```

### Explanation

- Replaced `button` wrapper with `div` since each tag is now a link.
- Each tag now navigates to the projects page with that filter applied.
- The `z-10` ensures the tag links are clickable above the card link overlay.

---

## Summary

After implementing all steps, your Stacks filter system will work as follows:

1. Projects page displays the StacksFilter component with all unique tags
2. Clicking a tag in StacksFilter updates the URL to `/projects?tag=tagname`
3. ProjectGallery filters to show only matching projects
4. Clicking the same tag again (or "Clear filter") removes the filter
5. Tags within project cards link to the projects page with filter applied
6. Shared URLs like `/projects?tag=react` show the filtered view directly

### File Structure After Implementation

```
src/
  lib/
    projects.ts                    # Updated with tag utilities
  components/
    StacksFilter/
      StacksFilter.tsx             # New filter component
      TagLink.tsx                  # New tag link component
    ProjectGallery/
      ProjectGallery.tsx           # Updated with activeTag prop
    ProjectSection/
      Projectlistitem.tsx          # Updated to use TagLink
  app/
    projects/
      page.tsx                     # Updated with Suspense wrapper
      ProjectsPageClient.tsx       # New client wrapper
```

### URL State Examples

| URL | Result |
|-----|--------|
| `/projects` | Shows all projects |
| `/projects?tag=react` | Shows projects tagged with "react" |
| `/projects?tag=nextjs` | Shows projects tagged with "nextjs" |

### Notes on Implementation

- All filtering is case-insensitive
- Tags are normalized to lowercase for matching
- Empty tag arrays or missing `project_tags` fields are handled gracefully
- The filter state is URL-based, making it shareable and bookmarkable
- Browser back/forward navigation works with the filter state
