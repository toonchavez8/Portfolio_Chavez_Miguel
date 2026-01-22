const ImageSkeleton = () => {
  return (
    <div
      className="
          relative w-full h-full rounded-xl
          aspect-video md:aspect-square
          bg-viridian-200/30 dark:bg-viridian-900/20
          backdrop-blur-sm
          overflow-hidden
        "
    >
      {/* Shimmer */}
      <span
        className="
            absolute inset-0
            animate-pulse
            bg-linear-to-r
            from-transparent
            via-white/30
            to-transparent
          "
      />
    </div>
  )
}

export default ImageSkeleton
