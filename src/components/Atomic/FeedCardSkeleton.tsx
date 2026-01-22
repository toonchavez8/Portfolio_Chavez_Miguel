const FeedCardSkeleton = () => {
  return (
    <article
      className="
          relative grid grid-cols-1 md:grid-cols-[120px_1fr]
          gap-5
          rounded-2xl p-5
          backdrop-blur-md
          border border-viridian-500/20
          bg-viridian-100/30 dark:bg-viridian-900/20
          animate-pulse
        "
    >
      {/* Timeline node */}
      <span
        className="
            absolute -left-8 top-8 h-4 w-4 rounded-full
            bg-viridian-400/60
            ring-4 ring-viridian-200/40 dark:ring-viridian-800/40
          "
      />

      {/* Image skeleton */}
      <div
        className="
            w-full rounded-xl
            aspect-video md:aspect-square
            bg-viridian-300/30 dark:bg-viridian-700/20
          "
      />

      {/* Content skeleton */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <div className="h-5 w-2/3 rounded bg-viridian-300/40" />

        {/* Body lines */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-viridian-300/30" />
          <div className="h-3 w-5/6 rounded bg-viridian-300/30" />
          <div className="h-3 w-4/6 rounded bg-viridian-300/30" />
        </div>

        {/* Date */}
        <div className="h-2 w-24 rounded bg-viridian-300/20 mt-2" />
      </div>
    </article>
  )
}

export default FeedCardSkeleton
