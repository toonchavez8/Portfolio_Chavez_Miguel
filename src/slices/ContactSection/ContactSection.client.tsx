'use client'

import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitch,
} from 'lucide-react'
import type { MouseEvent } from 'react'

export type SocialItem = {
  url: string
}

type IconComponent = typeof Github

const getSocialInfo = (
  url: string,
): { Icon: IconComponent; label: string; isEmail?: boolean } => {
  const u = (url || '').toLowerCase()
  if (u.includes('github.com')) return { Icon: Github, label: 'github' }
  if (u.includes('instagram.com')) return { Icon: Instagram, label: 'instagram' }
  if (u.includes('linkedin.com')) return { Icon: Linkedin, label: 'linkedin' }
  if (u.includes('twitch.tv')) return { Icon: Twitch, label: 'twitch' }
  if (u.startsWith('mailto:') || u.includes('@'))
    return { Icon: Mail, label: 'Email', isEmail: true }
  return { Icon: Github, label: url }
}

export default function ContactSectionClient({
  socials,
  primaryEmailCodes,
}: Readonly<{
  socials: readonly SocialItem[]
  primaryEmailCodes?: readonly number[]
}>) {
  const handleEmailClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!primaryEmailCodes) return
    const email = String.fromCodePoint(...primaryEmailCodes)
    globalThis.location.href = `mailto:${email}`
  }

  return (
    <nav aria-label="social links">
      <div className="flex flex-wrap items-center justify-start gap-3 text-sm sm:gap-4 md:text-base">
        {socials.map((s, index) => {
          const { Icon, label, isEmail } = getSocialInfo(s.url)
          const isMail = s.url.startsWith('mailto:') || s.url.includes('@')

          const content = (
            <code className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-shark-700/20 px-3 py-2 transition-all duration-300 ease-in-out hover:border-viridian-600/50 hover:bg-viridian-200/25 dark:border-shark-700/50 dark:hover:border-viridian-700/50 dark:hover:bg-viridian-800/10">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span>{label}</span>
            </code>
          )

          if (isMail || isEmail) {
            return (
              <div key={`email-${s.url}-${index}`}>
                <button
                  onClick={handleEmailClick}
                  aria-label="Send email"
                  type="button"
                  className="group"
                >
                  <code className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-shark-700/20 px-3 py-2 transition-all duration-300 ease-in-out hover:border-viridian-600/50 hover:bg-viridian-200/25 dark:border-shark-700/50 dark:hover:border-viridian-700/50 dark:hover:bg-viridian-800/10">
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    <span>Email</span>
                  </code>
                </button>
              </div>
            )
          }

          return (
            <div key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${label} profile`}
                className="group"
              >
                {content}
              </a>
            </div>
          )
        })}
        {primaryEmailCodes && (
          <div>
            <button
              onClick={handleEmailClick}
              type="button"
              aria-label="Send email"
              className="group cursor-pointer"
            >
              <code className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-shark-700/20 px-3 py-2 transition-all duration-300 ease-in-out hover:border-viridian-600/50 hover:bg-viridian-200/25 dark:border-shark-700/50 dark:hover:border-viridian-700/50 dark:hover:bg-viridian-800/10">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>Email</span>
              </code>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
