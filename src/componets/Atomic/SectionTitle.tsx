interface SectionTitleProps {
  title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => (
  <h2 className="font-mono text-lg opacity-60 transition-colors duration-150 group-hover/section:text-viridian-600 dark:group-hover/section:text-viridian-500">
    <span className="animate-pulse" aria-hidden="true">
      &#47;&#47;{' '}
    </span>
    {title}
  </h2>
)

export default SectionTitle
