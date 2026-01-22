'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiGitCommit } from 'react-icons/fi'

const LoadingSkeleton = () => (
  <>
    <style>{`
			@keyframes shimmer {
				0% {
					background-position: 200% 0;
				}
				100% {
					background-position: -200% 0;
				}
			}
			.shimmer {
				background: linear-gradient(90deg, #25ec99ff, #076843ff);
				background-size: 200% 100%;
				animation: shimmer 2s infinite linear;
				filter: blur(9px);
				clip-path: inset(0 0 0 0 round 9999px);
			}
		`}</style>
    <div className="shimmer h-3 w-16 rounded"></div>
  </>
)

// Helper to normalize Prismic's timezone offset (+0000 -> +00:00)
const normalizePrismicDate = (iso: string | null | undefined) =>
  iso?.replace(/([+-]\d{2})(\d{2})$/, '$1:$2') ?? null

// Helper to pick the newer timestamp (returns the ISO string of the newer date)
const pickNewestTimestamp = (
  prismicISO?: string | null,
  githubISO?: string | null,
) => {
  const prismicTime = prismicISO
    ? new Date(prismicISO).getTime()
    : Number.NEGATIVE_INFINITY
  const githubTime = githubISO
    ? new Date(githubISO).getTime()
    : Number.NEGATIVE_INFINITY

  if (Number.isNaN(prismicTime)) return githubISO ?? null
  if (Number.isNaN(githubTime)) return prismicISO ?? null

  return prismicTime >= githubTime ? prismicISO : githubISO
}

type LastUpdatedBadgeProps = {
  lastUpdated?: string | null
}

// Helper to format relative time (e.g., "2 days ago")
const formatRelativeTime = (isoDate: string) => {
  const target = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - target.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 7) {
    const diffWeeks = Math.floor(diffDays / 7)
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }
  return 'today'
}

const Lastupdatedbadge = ({
  lastUpdated: prismicLastUpdated,
}: LastUpdatedBadgeProps) => {
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState<string>('')
  const [lastUpdatedISO, setLastUpdatedISO] = useState<string | null>(null)
  const [fetching, setFetching] = useState<boolean>(true)

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/toonchavez8/Portfolio_Chavez_Miguel/commits/main',
        )
        const data = await response.json()
        const githubISO: string | undefined = data?.commit?.author?.date

        // Normalize Prismic date and pick the newer one
        const normalizedPrismicISO = normalizePrismicDate(
          prismicLastUpdated ?? undefined,
        )
        const newestISO = pickNewestTimestamp(normalizedPrismicISO, githubISO)

        if (newestISO) {
          setLastUpdatedISO(newestISO)
          setLastUpdatedLabel(formatRelativeTime(newestISO))
        } else {
          setLastUpdatedLabel('unknown')
        }
      } catch (error) {
        console.error('Error fetching last commit:', error)
        // Fallback to Prismic if GitHub fails
        if (prismicLastUpdated) {
          const normalizedPrismicISO = normalizePrismicDate(prismicLastUpdated)
          if (normalizedPrismicISO) {
            setLastUpdatedISO(normalizedPrismicISO)
            setLastUpdatedLabel(formatRelativeTime(normalizedPrismicISO))
          } else {
            setLastUpdatedLabel('unknown')
          }
        } else {
          setLastUpdatedLabel('unknown')
        }
      } finally {
        setFetching(false)
      }
    }

    fetchLastCommit()
  }, [prismicLastUpdated])

  let displayContent: React.ReactNode

  if (fetching) {
    displayContent = <LoadingSkeleton />
  } else if (lastUpdatedISO) {
    displayContent = <time dateTime={lastUpdatedISO}>{lastUpdatedLabel}</time>
  } else {
    displayContent = <span>unknown</span>
  }

  return (
    <Link
      href={'https://github.com/toonchavez8/Portfolio_Chavez_Miguel'}
      target="_blank"
      className="ease  right-0 mr-3 mt-1 flex items-center justify-center gap-1 rounded-full border dark:border-shark-400 px-4 font-mono text-xs opacity-50 transition-all hover:scale-105 dark:hover:bg-viridian-500/25 dark:text-shark-200  dark:hover:text-shark-100 hover:opacity-100 border-shark-800 text-shark-700 hover:text-shark-900 hover:bg-viridian-300/25 sm:absolute md:mt-3"
    >
      <FiGitCommit />
      <span className="hidden sm:block">updated</span>
      {displayContent}
    </Link>
  )
}

export default Lastupdatedbadge
