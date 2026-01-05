'use client'

import type { FC, MouseEvent } from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitch } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export type SocialItem = {
  url: string
}

type IconComponent = FC<{ className?: string }>

const getSocialInfo = (
  url: string,
): { Icon: IconComponent; label: string; isEmail?: boolean } => {
  const u = (url || '').toLowerCase()
  if (u.includes('github.com')) return { Icon: FaGithub, label: 'github' }
  if (u.includes('instagram.com'))
    return { Icon: FaInstagram, label: 'instagram' }
  if (u.includes('linkedin.com')) return { Icon: FaLinkedin, label: 'linkedin' }
  if (u.includes('twitch.tv')) return { Icon: FaTwitch, label: 'twitch' }
  if (u.startsWith('mailto:') || u.includes('@'))
    return { Icon: FiMail, label: 'Email', isEmail: true }
  return { Icon: FaGithub, label: url }
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
    <nav aria-label="social links" className="not-prose">
      <div className="flex flex-wrap items-center justify-start gap-2 text-sm sm:gap-3 md:gap-4 lg:gap-6">
        {socials.map((s) => {
          const { Icon, label, isEmail } = getSocialInfo(s.url)
          const isMail = s.url.startsWith('mailto:') || s.url.includes('@')
          const isLastItem =
            socials.indexOf(s) === socials.length - 1 && !primaryEmailCodes
          const separatorClass = isLastItem
            ? ''
            : 'border-r border-shark-500/60 pe-2 sm:pe-3 dark:border-shark-700/60'

          const content = (
            <code className="flex flex-row items-center justify-center gap-2 rounded-full border border-shark-700/0 transition-all duration-300 ease-in-out p-2 px-3 sm:px-4 hover:border-shark-600/50 hover:scale-105 dark:hover:border-shark-600/50">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{label}</span>
            </code>
          )

          if (isMail || isEmail) {
            return (
              <div key={`email-${s.url}`} className={separatorClass}>
                <button
                  onClick={handleEmailClick}
                  aria-label="Send email"
                  type="button"
                  className="group"
                >
                  <code className="flex flex-row items-center justify-center gap-2 rounded-full border border-shark-700/0 transition-all duration-300 ease-in-out p-2 px-3 sm:px-4hover:border-shark-600/50 hover:scale-105 ">
                    <FiMail className="h-4 w-4" />
                    <span className="hidden sm:block">Email</span>
                  </code>
                </button>
              </div>
            )
          }

          return (
            <div key={s.url} className={separatorClass}>
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
              className="group"
            >
              <code className="flex flex-row items-center justify-center gap-2 rounded-full border border-shark-700/0 transition-all duration-300 ease-in-out p-2 px-3 sm:px-4 hover:border-shark-600/50 hover:scale-105 ">
                <FiMail className="h-4 w-4" />
                <span className="hidden sm:block">Email</span>
              </code>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
