import Link from 'next/link'
import type { FC } from 'react'

interface TagLinkProps {
  tag: string
  className?: string
}

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
