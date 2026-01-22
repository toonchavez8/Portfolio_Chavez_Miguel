import FeedCardSkeleton from './FeedCardSkeleton'

const SKELETON_KEYS = ['skeleton-1', 'skeleton-2', 'skeleton-3']

const FeedSkeleton = () => {
  return (
    <div className="relative mt-8 pl-8 space-y-8 w-full">
      {/* Timeline line */}
      <span
        className="
          absolute left-2 top-0 h-full w-px
          bg-linear-to-b from-viridian-500/40 via-viridian-400/20 to-transparent
        "
      />

      {SKELETON_KEYS.map((key) => (
        <FeedCardSkeleton key={key} />
      ))}
    </div>
  )
}

export default FeedSkeleton
