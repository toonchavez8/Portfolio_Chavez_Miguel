'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { type FC, useCallback } from 'react'

export interface StacksFilterProps {
  tags: string[]
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
          &#47;&#47; {tags.length} Stacks
        </p>
      </div>

      <div className="flex flex-col gap-2">
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
    </div>
  )
}

export default StacksFilter
