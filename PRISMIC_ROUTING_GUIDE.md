# Prismic + Next.js Routing Implementation Guide

## Overview
This guide will help you set up all routes for your Next.js portfolio using Prismic CMS. We'll use Prismic's UID-based routing for dynamic pages and singleton custom types for static pages.

---

## Route Structure

| Route | Type | Prismic Custom Type | Status |
|-------|------|---------------------|--------|
| `/` | Single | `homepage` | ✅ Exists |
| `/now` | Single | `now_page` | ✅ Exists |
| `/about-me` | Single | `about_me` | ✅ Exists |
| `/colophon` | Single | `colophone` | ✅ Exists |
| `/journel` | Single | `journel` | ✅ Exists |
| `/journel/[uid]` | Dynamic | `journel_entry` | ✅ Exists |
| `/projects` | Single | `projects` | ✅ Exists |
| `/projects/[uid]` | Dynamic | `project` | ✅ Exists |

---

## Step 1: Create `/now` Page (Already Exists ✅)

This page already exists at `src/app/now/page.tsx`.

**Current implementation:**

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('now_page').catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('now_page').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
```

**No action needed.** ✅

---

## Step 2: Create `/about-me` Page

### File: `src/app/about-me/page.tsx`

**Create new file:**

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('about_me').catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('about_me').catch(() => notFound())

  return {
    title: page.data.meta_title || 'About Me',
    description: page.data.meta_description || 'Learn more about me',
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
```

**Action:** Create file `src/app/about-me/page.tsx` with the code above.

---

## Step 3: Create `/colophon` Page

### File: `src/app/colophon/page.tsx`

**Create new file:**

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('colophone').catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('colophone').catch(() => notFound())

  return {
    title: page.data.meta_title || 'Colophon',
    description: page.data.meta_description || 'How this site was made',
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
```

**Action:** Create file `src/app/colophon/page.tsx` with the code above.

---

## Step 4: Create `/journel` Page (List All Entries)

### File: `src/app/journel/page.tsx`

**Before:** (If file exists, check current implementation)

**After:** (Update or create with this code)

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('journel').catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('journel').catch(() => notFound())

  return {
    title: page.data.meta_title || 'Journal',
    description: page.data.meta_description || 'My journal entries',
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
```

**Action:** Update or create file `src/app/journel/page.tsx` with the code above.

---

## Step 5: Create `/journel/[uid]` Dynamic Route

### File: `src/app/journel/[uid]/page.tsx`

**Create new file:**

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('journel_entry', params.uid)
    .catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getByUID('journel_entry', params.uid)
    .catch(() => notFound())

  return {
    title: page.data.meta_title || page.uid,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('journel_entry')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
```

**Action:** Create directory `src/app/journel/[uid]/` and create file `page.tsx` with the code above.

---

## Step 6: Create `/projects` Page (Showcase with Filter)

### File: `src/app/projects/page.tsx`

**Before:** (If file exists, check current implementation)

**After:** (Update or create with this code)

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('projects').catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('projects').catch(() => notFound())

  return {
    title: page.data.meta_title || 'Projects',
    description: page.data.meta_description || 'Explore my projects',
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
```

**Action:** Update or create file `src/app/projects/page.tsx` with the code above.

**Note:** You'll need to create a custom slice for the ProjectGallery that fetches all projects and implements client-side filtering. See Step 9 for slice recommendations.

---

## Step 7: Create `/projects/[uid]` Dynamic Route

### File: `src/app/projects/[uid]/page.tsx`

**Create new file:**

```tsx
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <article className="prose prose-viridian dark:prose-invert lg:prose-xl">
        <SliceZone slices={page.data.slices} components={components} />
      </article>
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound())

  return {
    title: page.data.meta_title || page.uid,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('project')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
```

**Action:** Create directory `src/app/projects/[uid]/` and create file `page.tsx` with the code above.

---

## Step 8: Update Main Layout (Optional)

### File: `src/app/layout.tsx`

Ensure your main layout has proper navigation links to all routes.

**Before:**
```tsx
// Your existing layout
```

**After:** (Add navigation if needed)
```tsx
// Example navigation links to add:
<nav>
  <Link href="/">Home</Link>
  <Link href="/now">Now</Link>
  <Link href="/projects">Projects</Link>
  <Link href="/journel">Journal</Link>
  <Link href="/about-me">About Me</Link>
  <Link href="/colophon">Colophon</Link>
</nav>
```

**Action:** Update your navigation component to include all routes.

---

## Step 9: Recommended Slice Additions

### For `/projects` Page with Filtering

You'll want to create a new slice called `ProjectsShowcase` that:

1. **Fetches all projects:**
```tsx
const client = createClient()
const projects = await client.getAllByType('project')
```

2. **Extracts unique tags:**
```tsx
const allTags = projects
  .flatMap(project => project.data.tags?.split(',') || [])
  .map(tag => tag.trim())
  .filter(Boolean)
const uniqueTags = [...new Set(allTags)]
```

3. **Implements client-side filtering:**
```tsx
'use client'
// Create a client component with filter state
const [selectedTag, setSelectedTag] = useState<string | null>(null)
const filteredProjects = selectedTag
  ? projects.filter(p => p.data.tags?.includes(selectedTag))
  : projects
```

**Note:** Since this requires client-side interactivity, you'll need to create a client component wrapper. The slice can fetch data server-side and pass it to the client component for filtering.

---

## Step 10: Testing Your Routes

After implementing all pages, test each route:

1. **Static routes:**
   - http://localhost:3000/
   - http://localhost:3000/now
   - http://localhost:3000/about-me
   - http://localhost:3000/colophon
   - http://localhost:3000/journel
   - http://localhost:3000/projects

2. **Dynamic routes:**
   - http://localhost:3000/journel/[create-entry-in-prismic-and-use-uid]
   - http://localhost:3000/projects/[create-project-in-prismic-and-use-uid]

---

## Step 11: Prismic Content Setup Checklist

In your Prismic dashboard, ensure you have:

### Singleton Custom Types (Non-repeatable):
- ✅ `homepage` - Already exists
- ✅ `now_page` - Already exists
- ✅ `about_me` - Already exists
- ✅ `colophone` - Already exists
- ✅ `journel` - Already exists (list page)
- ✅ `projects` - Already exists (showcase page)

### Repeatable Custom Types:
- ✅ `journel_entry` - Already exists (with UID field)
- ✅ `project` - Already exists (with UID field)

### Add Content:
1. Go to each singleton type and add content
2. Create multiple `journel_entry` documents with unique UIDs (e.g., `my-first-entry`, `learning-nextjs`)
3. Create multiple `project` documents with unique UIDs (e.g., `portfolio-site`, `todo-app`)

---

## Step 12: URL Structure Best Practices

### Recommended UID Naming Convention:

**For Journal Entries:**
- ✅ Good: `2026-01-why-i-love-nextjs`
- ✅ Good: `learning-prismic-cms`
- ❌ Bad: `entry-1` (not descriptive)
- ❌ Bad: `My First Entry` (spaces, capitals)

**For Projects:**
- ✅ Good: `portfolio-website`
- ✅ Good: `ecommerce-store-redesign`
- ❌ Bad: `project1` (not descriptive)

**UID Rules:**
- Use lowercase
- Use hyphens (not underscores or spaces)
- Be descriptive
- Keep it short but meaningful

---

## Step 13: Adding Tags to Project Gallery Slice

If your `ProjectGallery` slice needs to fetch individual project documents for filtering:

### Update ProjectGallery Slice

**File:** `src/slices/ProjectGallery/index.tsx`

**Add this at the top of your component:**

```tsx
// Fetch all projects for tags
const client = createClient()
const allProjects = await client.getAllByType('project')

// Extract all unique tags from projects
const allTags = allProjects
  .flatMap(project => {
    const tags = project.data.project_tags || ''
    return tags.split(',').map(t => t.trim()).filter(Boolean)
  })
const uniqueTags = [...new Set(allTags)].sort()
```

**Then pass tags to your filter component:**

```tsx
<ProjectFilter tags={uniqueTags} projects={projects} />
```

---

## Step 14: Environment Variables

Ensure your `.env.local` has:

```bash
PRISMIC_REPOSITORY_NAME=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token
```

---

## Troubleshooting

### Issue: 404 Not Found
**Solution:** 
- Check Prismic custom type exists
- Verify content is published (not draft)
- Check UID matches URL exactly

### Issue: Type Errors
**Solution:**
```bash
npm run slicemachine
# Generate types
```

### Issue: Missing Metadata
**Solution:** Add default values in `generateMetadata()`:
```tsx
return {
  title: page.data.meta_title || 'Default Title',
  description: page.data.meta_description || 'Default description',
}
```

---

## File Structure Summary

After implementation, your file structure should be:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (homepage)
│   ├── now/
│   │   └── page.tsx
│   ├── about-me/
│   │   └── page.tsx
│   ├── colophon/
│   │   └── page.tsx
│   ├── journel/
│   │   ├── page.tsx
│   │   └── [uid]/
│   │       └── page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [uid]/
│           └── page.tsx
```

---

## Next Steps

1. ✅ Create all missing page files
2. ✅ Test each route in development
3. ✅ Add content in Prismic dashboard
4. ✅ Implement project filtering (Step 9)
5. ✅ Add navigation links
6. ✅ Test build: `npm run build`
7. ✅ Deploy!

---

## Additional Resources

- [Prismic Next.js Documentation](https://prismic.io/docs/nextjs)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Prismic UID Field Best Practices](https://prismic.io/docs/uid)

---

**Generated:** January 4, 2026  
**Project:** toonchavez-dev  
**Framework:** Next.js 16 + Prismic
