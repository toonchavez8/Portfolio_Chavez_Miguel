import { cn } from '@/lib/utils'

type BGVariantType =
  | 'dots'
  | 'diagonal-stripes'
  | 'grid'
  | 'horizontal-lines'
  | 'vertical-lines'
  | 'checkerboard'
type BGMaskType =
  | 'fade-center'
  | 'fade-edges'
  | 'fade-top'
  | 'fade-bottom'
  | 'fade-left'
  | 'fade-right'
  | 'fade-x'
  | 'fade-y'
  | 'none'

type BGPatternProps = React.ComponentProps<'div'> & {
  variant?: BGVariantType
  mask?: BGMaskType
  edge?: 'dark' | 'light' | 'none'
  size?: number
  fill?: string
}

function getMaskStyle(mask: BGMaskType): React.CSSProperties {
  switch (mask) {
    case 'fade-edges':
      return {
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,  rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%,  rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)',
      }
    case 'fade-center':
      return {
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0), rgba(0,0,0,1))',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0), rgba(0,0,0,1))',
      }
    case 'fade-top':
      return {
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
      }
    case 'fade-bottom':
      return {
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
      }
    case 'fade-left':
      return {
        maskImage: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))',
      }
    case 'fade-right':
      return {
        maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
      }
    case 'fade-x':
      return {
        maskImage:
          'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))',
      }
    case 'fade-y':
      return {
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1), rgba(0,0,0,0))',
      }
    default:
      return {}
  }
}

function geBgImage(variant: BGVariantType, fill: string, size: number) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`
    default:
      return undefined
  }
}
function getEdgeOverlay(e?: 'dark' | 'light' | 'none') {
  if (!e || e === 'none') return undefined
  if (e === 'dark')
    return `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%)`
  return `radial-gradient(ellipse at center, rgba(255,255,255,0) 45%, rgba(255,255,255,0.35) 100%)`
}

const BGPattern = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = '#252525',
  className,
  style,
  ...props
}: BGPatternProps) => {
  const bgSize = `${size}px ${size}px`
  const patternImage = geBgImage(variant, fill, size)

  const edgeOverlay = getEdgeOverlay(props.edge)
  const backgroundImage = edgeOverlay
    ? `${edgeOverlay}, ${patternImage}`
    : patternImage

  // when we have an overlay, set backgroundSize so second layer repeats
  const backgroundSize = edgeOverlay ? `auto, ${bgSize}` : bgSize
  const maskStyle = getMaskStyle(mask)

  return (
    <div
      className={cn('absolute inset-0 -z-10 w-full h-full', className)}
      style={{
        backgroundImage,
        backgroundSize,
        backgroundRepeat: 'repeat',
        ...maskStyle,
        ...style,
      }}
      {...props}
    />
  )
}

BGPattern.displayName = 'BGPattern'
export { BGPattern }
