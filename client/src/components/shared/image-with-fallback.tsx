import { useState } from 'react'
import { buildSrcSet, cn } from '../../lib/utils'
import { LogoMark } from './logo'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

export function ImageWithFallback({
  src,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  priority = false,
  width,
  height,
}: ImageWithFallbackProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={cn('relative overflow-hidden bg-ivory-deep', className)}>
      {state !== 'error' && (
        <img
          src={src}
          srcSet={buildSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-out',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      {state === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-ivory-deep" aria-hidden="true" />
      )}

      {state === 'error' && (
        <div
          role="img"
          aria-label={`${alt} (image unavailable)`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ivory-deep p-6 text-center"
        >
          <LogoMark className="size-8 text-ink/40" />
          <span className="max-w-[16rem] text-[11px] font-medium uppercase tracking-label text-slate-soft">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  )
}
