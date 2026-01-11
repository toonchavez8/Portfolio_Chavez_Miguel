# Shared Project Data Architecture Guide

> A developer guide for implementing a single source of truth for project data in a Next.js + Prismic application.

---

## Table of Contents

1. [Overview](#overview)
2. [Prismic Data Modeling](#prismic-data-modeling)
3. [Shared Data-Fetching Strategy](#shared-data-fetching-strategy)
4. [Component Reuse Pattern](#component-reuse-pattern)
5. [Data Flow Explanation](#data-flow-explanation)
6. [Implementation Checklist](#implementation-checklist)

---

## Overview

### Problem Statement

Currently, the `ProjectGallery` slice and project pages may have separate data sources or duplicated query logic. This guide establishes a pattern where:

- **Project Catalog page** → displays **all** projects
- **Home (landing) page** → displays only **featured** projects
- Both pages reuse the **same component** (`ProjectGallery`)
- Filtering is controlled via a **boolean field** in the `project_byte` group (`featured: true`)

### Source of Truth: ProjectGallery Slice

The `project_byte` group within the **ProjectGallery slice** is the single source of truth for project display data. This group contains:

- `project_image` - Project thumbnail/hero image
- `project_date` - Project completion date
- `project_name` - Display name
- `project_description` - Short description
- `project_tags` - Technology tags (comma-separated)
- `live_link` - Link to live site
- `repo_link` - Link to repository
- `project_link` - Content relationship to full Project document
- `featured` - **Boolean flag for featured projects**

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        PRISMIC CMS                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ProjectGallery Slice (on Homepage/Catalog pages)   │   │
│  │  └── project_byte[] (Group - SOURCE OF TRUTH)       │   │
│  │      ├── project_name, project_description          │   │
│  │      ├── project_image, project_date                │   │
│  │      ├── project_tags, live_link, repo_link         │   │
│  │      ├── project_link → Project Document            │   │
│  │      └── featured: Boolean  ← FILTER FIELD          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Project Documents (for full project pages)         │   │
│  │  ├── uid, slices[] (RichTextBlock for content)      │   │
│  │  └── SEO metadata                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               SHARED DATA ACCESS LAYER                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  lib/projects.ts                                     │   │
│  │  ├── getProjectGallerySlice() → fetches slice data   │   │
│  │  ├── getAllProjectBytes() → all project_byte items   │   │
│  │  ├── getFeaturedProjectBytes() → featured only       │   │
│  │  └── getProjectByUID() → single Project doc          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│     HOME PAGE           │     │   PROJECT CATALOG PAGE  │
│  (featured only)        │     │   (all projects)        │
│                         │     │                         │
│ getFeaturedProjectBytes │     │  getAllProjectBytes()   │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              SHARED COMPONENT                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  <ProjectGallery projects={projectBytes} />          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Prismic Data Modeling

### ProjectGallery Slice Structure (Current - Source of Truth)

The `project_byte` group in the ProjectGallery slice contains all project display data:

```json
// src/slices/ProjectGallery/model.json
{
  "id": "project_gallery",
  "type": "SharedSlice",
  "name": "ProjectGallery",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "primary": {
        "sectiontittle": {
          "type": "Text",
          "config": { "label": "Sectiontittle" }
        },
        "project_byte": {
          "type": "Group",
          "config": {
            "label": "Project Byte",
            "repeat": true,
            "fields": {
              "project_image": { "type": "Image" },
              "project_date": { "type": "Date" },
              "project_name": { "type": "Text" },
              "project_description": { "type": "Text" },
              "project_tags": { "type": "Text" },
              "live_link": { "type": "Link" },
              "repo_link": { "type": "Link" },
              "project_link": {
                "type": "Link",
                "config": {
                  "select": "document",
                  "customtypes": ["project"]
                }
              },
              "featured": {
                "type": "Boolean",
                "config": {
                  "label": "featured",
                  "placeholder_false": "false",
                  "placeholder_true": "true",
                  "default_value": false
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

### Project Custom Type (For Full Project Pages)

The Project custom type is used for individual project detail pages with rich content:

```json
// customtypes/project/index.json
{
  "id": "project",
  "label": "project",
  "repeatable": true,
  "json": {
    "Main": {
      "uid": { "type": "UID" },
      "slices": {
        "type": "Slices",
        "config": {
          "choices": {
            "rich_text_block": { "type": "SharedSlice" }
          }
        }
      }
    },
    "SEO & Metadata": {
      "meta_title": { "type": "Text" },
      "meta_description": { "type": "Text" },
      "meta_image": { "type": "Image" }
    }
  }
}
```

### Type Definitions (Auto-generated)

After running Slice Machine codegen, the types will include:

```typescript
// prismicio-types.d.ts (auto-generated)

// ProjectGallery slice primary fields
interface ProjectGallerySliceDefaultPrimary {
  sectiontittle: prismic.KeyTextField;
  project_byte: prismic.GroupField<
    Simplify<ProjectGallerySliceDefaultPrimaryProjectByteItem>
  >;
}

// Individual project_byte item - SOURCE OF TRUTH
interface ProjectGallerySliceDefaultPrimaryProjectByteItem {
  project_image: prismic.ImageField<never>;
  project_date: prismic.DateField;
  project_name: prismic.KeyTextField;
  project_description: prismic.KeyTextField;
  project_tags: prismic.KeyTextField;
  live_link: prismic.LinkField;
  repo_link: prismic.LinkField;
  project_link: prismic.ContentRelationshipField<"project">;
  featured: prismic.BooleanField; // ← FILTER FIELD
}
```

---

## Shared Data-Fetching Strategy

### Step 1: Create a Shared Data Access Layer

Create a centralized module for fetching and filtering project bytes from the ProjectGallery slice.

#### Before: No Centralized Layer (Scattered Queries)

```typescript
// src/app/projects/page.tsx
import { createClient } from '@/prismicio'

export default async function ProjectsPage() {
  const client = createClient()
  // Fetching from wrong source - Project documents don't have display data
  const projects = await client.getAllByType('project')
  // ...
}

// src/slices/ProjectGallery/index.tsx
// Data tightly coupled to slice, can't filter for featured
const projects = slice.primary.project_byte ?? []
```

#### After: Centralized Data Access Layer

```typescript
// src/lib/projects.ts
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import type { Content } from '@prismicio/client'

// Export the project_byte item type from the slice
export type ProjectByteItem =
  Content.ProjectGallerySliceDefaultPrimaryProjectByteItem

export type ProjectDocument = Content.ProjectDocument

/**
 * Fetches the ProjectGallery slice from a page that contains it
 * (e.g., homepage or projects_catalog)
 */
export async function getProjectGallerySlice(
  pageType: 'homepage' | 'projects_catalog' = 'projects_catalog'
): Promise<Content.ProjectGallerySlice | null> {
  const client = createClient()

  try {
    const page = await client.getSingle(pageType)
    const slice = page.data.slices.find(
      (s): s is Content.ProjectGallerySlice =>
        s.slice_type === 'project_gallery'
    )
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
 * Use this if you need both lists on the same page
 */
export async function getProjectBytesWithFilter(
  filter?: 'all' | 'featured'
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
  uid: string
): Promise<ProjectDocument | null> {
  const client = createClient()

  try {
    const project = await client.getByUID('project', uid)
    return project
  } catch {
    return null
  }
}
```

### Step 2: Type Definitions

The types are auto-generated by Slice Machine. Ensure your `prismicio-types.d.ts` is up to date:

```bash
# Regenerate types after any schema changes
npx prismic-ts-codegen
# or run Slice Machine
npm run slicemachine
```

---

## Component Reuse Pattern

### Step 1: Define Component Props Interface

The `ProjectGallery` component should accept project bytes as props, allowing flexible data sources.

#### Before: Slice-Coupled Component

```typescript
// src/slices/ProjectGallery/index.tsx
import { asDate, type Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'

export type ProjectGalleryProps =
  SliceComponentProps<Content.ProjectGallerySlice>

const ProjectGallery: FC<ProjectGalleryProps> = ({ slice }) => {
  // Data is tightly coupled to slice structure
  // Cannot filter for featured projects
  const projects = slice.primary.project_byte ?? []

  return (
    <section>
      {projects.map((item, index) => (
        <Projectlistitem key={index} project={item} />
      ))}
    </section>
  )
}
```

#### After: Flexible Component with Props

```typescript
// src/components/ProjectGallery/ProjectGallery.tsx
import { asDate } from '@prismicio/client'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'
import Projectlistitem from '@/components/ProjectSection/Projectlistitem'
import type { ProjectByteItem } from '@/lib/projects'

export interface ProjectGalleryProps {
  /** Array of project bytes to display */
  projects: ProjectByteItem[]
  /** Optional section title */
  title?: string
  /** Optional className for styling */
  className?: string
}

/**
 * Reusable ProjectGallery component
 * Accepts project_byte items from the ProjectGallery slice
 */
export const ProjectGallery: FC<ProjectGalleryProps> = ({
  projects,
  title,
  className,
}) => {
  return (
    <section
      className={`group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 lg:px-4 ${className ?? ''}`}
    >
      {title && <SectionTitle title={title} />}

      <div className="grid w-full grid-cols-1 gap-4">
        {projects.map((item, index) => {
          const formattedDate = asDate(item.project_date)?.toLocaleDateString(
            'en-US',
            {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            }
          )

          return (
            <Projectlistitem
              key={item.project_name || index}
              project={item}
              formattedDate={formattedDate}
              index={index}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProjectGallery
```

---

## Data Flow Explanation

### Home Page: Featured Projects Only

#### Before: No Featured Filtering

```typescript
// src/app/page.tsx
// Cannot filter - slice renders all projects
```

#### After: Shared Query + Featured Filter

```typescript
// src/app/page.tsx
import { getFeaturedProjectBytes } from '@/lib/projects'
import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'

export default async function HomePage() {
  // Get only featured project bytes
  const featuredProjects = await getFeaturedProjectBytes()

  return (
    <main>
      <ProjectGallery
        projects={featuredProjects}
        title="Featured Work"
      />
    </main>
  )
}
```

### Catalog Page: All Projects

#### Before: Slice-Only Rendering

```typescript
// src/app/projects/page.tsx
// Relies entirely on slice placement in Prismic
```

#### After: Shared Query + All Projects

```typescript
// src/app/projects/page.tsx
import { getAllProjectBytes } from '@/lib/projects'
import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'

export default async function ProjectsPage() {
  // Get all project bytes
  const allProjects = await getAllProjectBytes()

  return (
    <main>
      <ProjectGallery
        projects={allProjects}
        title="All Projects"
      />
    </main>
  )
}
```

### Keeping the Existing Slice Working

The existing `ProjectGallery` slice can continue to work alongside the new pattern:

#### Slice Wrapper (Preserves Existing Functionality)

```typescript
// src/slices/ProjectGallery/index.tsx
import { type Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import { ProjectGallery as ProjectGalleryComponent } from '@/components/ProjectGallery/ProjectGallery'

export type ProjectGalleryProps =
  SliceComponentProps<Content.ProjectGallerySlice>

/**
 * Slice wrapper - passes slice data to reusable component
 * Use this when the slice is placed in Prismic page builder
 */
const ProjectGallery: FC<ProjectGalleryProps> = ({ slice }) => {
  const projects = slice.primary.project_byte ?? []

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ProjectGalleryComponent
        projects={projects}
        title={slice.primary.sectiontittle ?? undefined}
      />
    </section>
  )
}

export default ProjectGallery
```

---

## Complete Data Flow Summary

```
┌──────────────────────────────────────────────────────────────────┐
│                         PRISMIC CMS                              │
│                                                                  │
│   ProjectGallery Slice (on projects_catalog page)                │
│   └── project_byte[] (Group - SOURCE OF TRUTH)                   │
│       ├── project_name: "Amazing App"                            │
│       ├── project_description: "A cool project..."               │
│       ├── project_date: "2025-01-15"                             │
│       ├── project_image: { url: "..." }                          │
│       ├── project_tags: "React, TypeScript"                      │
│       ├── live_link: { url: "https://..." }                      │
│       ├── repo_link: { url: "https://github.com/..." }           │
│       ├── project_link: → Project Document (for detail page)     │
│       └── featured: true  ← FILTER FIELD                         │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│              src/lib/projects.ts                                 │
│              (SINGLE SOURCE OF TRUTH)                            │
│                                                                  │
│   getProjectGallerySlice()   → ProjectGallerySlice               │
│   getAllProjectBytes()       → ProjectByteItem[] (all)           │
│   getFeaturedProjectBytes()  → ProjectByteItem[] (featured only) │
│   getProjectByUID()          → ProjectDocument (for detail page) │
└──────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        ▼                                           ▼
┌───────────────────────┐             ┌───────────────────────┐
│   src/app/page.tsx    │             │ src/app/projects/     │
│   (HOME PAGE)         │             │ page.tsx (CATALOG)    │
│                       │             │                       │
│getFeaturedProjectBytes│             │ getAllProjectBytes()  │
└───────────────────────┘             └───────────────────────┘
        │                                           │
        └─────────────────────┬─────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│            <ProjectGallery projects={...} title={...} />         │
│                                                                  │
│   ✓ Receives ProjectByteItem[] directly                          │
│   ✓ Same type as slice data - no transformation needed           │
│   ✓ Fully reusable across pages                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Implementation Checklist

### Phase 1: Prismic Setup (✅ DONE)

- [x] `featured` boolean field exists in `project_byte` group (ProjectGallery slice)
- [ ] Mark projects as featured/not-featured in Prismic dashboard
- [ ] Regenerate types with `npx prismic-ts-codegen` if needed

### Phase 2: Data Layer

- [ ] Update `src/lib/projects.ts` with slice-based query functions
- [ ] Add `getProjectGallerySlice()` function
- [ ] Add `getAllProjectBytes()` function
- [ ] Add `getFeaturedProjectBytes()` function
- [ ] Export `ProjectByteItem` type

### Phase 3: Component Refactor

- [ ] Create `src/components/ProjectGallery/ProjectGallery.tsx`
- [ ] Accept `ProjectByteItem[]` as props
- [ ] Define `ProjectGalleryProps` interface

### Phase 4: Page Integration

- [ ] Update Home page to use `getFeaturedProjectBytes()` + component
- [ ] Update Catalog page to use `getAllProjectBytes()` + component
- [ ] Update existing slice to wrap new component

### Phase 5: Verification

- [ ] Verify Home page shows only featured projects
- [ ] Verify Catalog page shows all projects
- [ ] Verify both pages stay in sync when Prismic data changes
- [ ] Verify existing slice functionality is preserved

---

## Benefits of This Architecture

| Aspect | Before | After |
|--------|--------|-------|
| **Data Source** | Scattered or slice-only | Single `lib/projects.ts` |
| **Filtering** | Not possible | `getFeaturedProjectBytes()` |
| **Component** | Slice-coupled | Reusable, prop-driven |
| **Type Safety** | Implicit | Uses Prismic generated types |
| **Maintenance** | Update multiple files | Update one data layer |
| **Testing** | Hard to mock | Easy to test with mock data |

---

## Additional Considerations

### Why project_byte is the Source of Truth

The `project_byte` group in the ProjectGallery slice is the source of truth because:

1. **All display data in one place** - name, description, image, tags, links
2. **Featured flag lives here** - allows filtering at the display level
3. **Content relationship to Project document** - links to full project page when needed
4. **Flexible ordering** - order in Prismic UI determines display order

### Project Documents vs project_byte

| Aspect | Project Document | project_byte (in slice) |
|--------|------------------|-------------------------|
| **Purpose** | Full project detail page | Project card/list display |
| **Content** | RichText slices, SEO | Summary data, links |
| **Featured flag** | ❌ Not here | ✅ Here |
| **Used for** | `/projects/[uid]` page | Home page, catalog listing |

### Caching Strategy

```typescript
// src/lib/projects.ts
import { unstable_cache } from 'next/cache'

export const getAllProjectBytes = unstable_cache(
  async () => {
    const slice = await getProjectGallerySlice()
    if (!slice) return []
    return slice.primary.project_byte ?? []
  },
  ['all-project-bytes'],
  { revalidate: 60 } // Revalidate every 60 seconds
)
```

### ISR with On-Demand Revalidation

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  revalidateTag('all-project-bytes')
  return NextResponse.json({ revalidated: true })
}
```

---

*Guide created: January 2026*
*Compatible with: Next.js 14+, Prismic, @prismicio/client, @prismicio/react*
