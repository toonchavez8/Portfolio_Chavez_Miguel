import type { Content, RTImageNode } from '@prismicio/client'
import type { JSXMapSerializer, SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import type { FC } from 'react'
import { CodeBlock } from '@/componets/CodeBlock'

/**
 * Props for `RichTextBlock`.
 */
export type RichTextBlockProps = SliceComponentProps<Content.RichTextBlockSlice>

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mt-10 scroll-m-20  pb-2 text-4xl font-extrabold tracking-tight first:mt-0 dark:border-viridian-800 lg:text-5x text-viridian-500 ">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mt-10 scroll-m-20 border-b border-shark-200 pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:border-shark-800">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  heading4: ({ children }) => (
    <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  ),
  heading5: ({ children }) => (
    <h5 className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight">
      {children}
    </h5>
  ),
  heading6: ({ children }) => (
    <h6 className="mt-6 scroll-m-20 text-base font-semibold tracking-tight">
      {children}
    </h6>
  ),
  paragraph: ({ children }) => (
    <p className="leading-7 not-first:mt-6">{children}</p>
  ),
  preformatted: ({ node }) => {
    // Try to detect language from first line (e.g., ```javascript)
    const lines = node.text.split('\n')
    let language = 'typescript'
    let code = node.text

    // Check if first line looks like a language identifier
    if (lines.length > 0 && lines[0].length < 20 && !lines[0].includes(' ')) {
      const potentialLang = lines[0].trim().toLowerCase()
      // Common language identifiers
      const validLangs = [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'python',
        'java',
        'css',
        'html',
        'json',
        'bash',
        'sh',
        'yaml',
        'markdown',
        'sql',
        'go',
        'rust',
        'php',
      ]
      if (validLangs.includes(potentialLang)) {
        language = potentialLang
        code = lines.slice(1).join('\n')
      }
    }

    return <CodeBlock code={code} language={language} />
  },
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  listItem: ({ children }) => <li className="mt-2">{children}</li>,
  oListItem: ({ children }) => <li className="mt-2">{children}</li>,
  list: ({ children }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
  ),
  oList: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
  ),
  image: ({ node }) => {
    const imageNode = node as RTImageNode
    return (
      <figure className="my-8">
        <PrismicNextImage
          field={imageNode}
          className="w-full rounded-lg border border-shark-200 dark:border-shark-800"
          imgixParams={{ fit: 'max' }}
        />
        {imageNode.alt && (
          <figcaption className="mt-2 text-center text-sm text-shark-500 dark:text-shark-400">
            {imageNode.alt}
          </figcaption>
        )}
      </figure>
    )
  },
  hyperlink: ({ node, children }) => (
    <PrismicNextLink
      field={node.data}
      className="font-medium text-viridian-600 underline underline-offset-4 hover:text-viridian-700 dark:text-viridian-400 dark:hover:text-viridian-300"
    >
      {children}
    </PrismicNextLink>
  ),
  label: ({ node, children }) => {
    // Handle custom labels for inline code/kbd elements
    if (node.data.label === 'kbd') {
      return (
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-shark-200 bg-shark-100 px-1.5 font-mono text-[10px] font-medium text-shark-800 opacity-100 dark:border-shark-700 dark:bg-shark-900 dark:text-shark-100">
          {children}
        </kbd>
      )
    }
    if (node.data.label === 'code' || node.data.label === 'inline-code') {
      return (
        <code className="relative rounded bg-shark-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-shark-900 dark:bg-shark-900 dark:text-shark-100">
          {children}
        </code>
      )
    }
    // Default span with label class
    return <span className={node.data.label}>{children}</span>
  },
  span: ({ text }) => {
    // Preserve line breaks
    if (text === '\n') {
      return <br />
    }
    return <>{text}</>
  },
}

/**
 * Component for "RichTextBlock" Slices.
 */
const RichTextBlock: FC<RichTextBlockProps> = ({ slice }) => {
  return (
    <div className="prose prose-shark mx-auto max-w-none dark:prose-invert">
      <PrismicRichText
        field={slice.primary.rich_text}
        components={components}
      />
    </div>
  )
}

export default RichTextBlock
