'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
}: Readonly<CodeBlockProps>) {
  const [html, setHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function highlightCode() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        })
        setHtml(highlighted)
      } catch (err) {
        // Fallback if language not supported - include error in log for diagnostics
        console.warn(
          `Language "${language}" not supported, using plaintext`,
          err,
        )
        const fallback = await codeToHtml(code, {
          lang: 'plaintext',
          theme: 'github-dark',
        })
        setHtml(fallback)
      } finally {
        setLoading(false)
      }
    }

    highlightCode()
  }, [code, language])

  if (loading) {
    return (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border border-shark-200 bg-shark-950 p-4 dark:border-shark-800">
        <code className="relative rounded bg-transparent font-mono text-sm text-shark-50">
          {code}
        </code>
      </pre>
    )
  }

  return (
    <div
      className="shiki-wrapper mb-4 mt-6 overflow-x-auto rounded-lg border border-shark-200 dark:border-shark-800 [&_pre]:m-0!  [&_pre]:p-4"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
