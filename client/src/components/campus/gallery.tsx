import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import { institution } from '../../config/institution'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { DemoNote } from '../shared/demo-note'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '../ui/dialog'
import { cn } from '../../lib/utils'

interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  category: string
  caption: string
}

const facilityCategories: Record<string, string> = {
  'smart-classrooms': 'Learning',
  library: 'Learning',
  'science-laboratories': 'Learning',
  'innovation-lab': 'Learning',
  sports: 'Sport',
  auditorium: 'Arts',
  'wellbeing-centre': 'Community',
}

const lifeCategories: Record<string, string> = {
  sport: 'Sport',
  'performing-arts': 'Arts',
  'clubs': 'Community',
  'creative-arts': 'Arts',
  'community': 'Community',
}

const CATEGORIES = ['All', 'Learning', 'Sport', 'Arts', 'Community'] as const

export function CampusGallery() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = useMemo<GalleryItem[]>(() => {
    const { facilities, studentLife } = institution.content
    return [
      ...facilities.map((facility) => ({
        id: `facility-${facility.slug}`,
        src: facility.image.src,
        alt: facility.image.alt,
        title: facility.title,
        category: facilityCategories[facility.slug] ?? 'Learning',
        caption: facility.description,
      })),
      ...studentLife.items.map((item) => ({
        id: `life-${item.slug}`,
        src: item.image.src,
        alt: item.image.alt,
        title: item.title,
        category: lifeCategories[item.slug] ?? 'Community',
        caption: item.description,
      })),
    ]
  }, [])

  const filtered = useMemo(
    () => (category === 'All' ? items : items.filter((item) => item.category === category)),
    [category, items],
  )

  const current = activeIndex !== null ? filtered[activeIndex] : null

  function move(direction: 1 | -1) {
    setActiveIndex((index) => {
      if (index === null) return index
      return (index + direction + filtered.length) % filtered.length
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {CATEGORIES.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => {
                setCategory(option)
                setActiveIndex(null)
              }}
              className={cn(
                'rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-label transition-colors',
                category === option
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-ink/15 text-slate hover:border-ink/30 hover:text-ink',
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-[11px] uppercase tracking-label text-slate-soft">
          {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <figure key={item.id} className="group relative bg-ink">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              aria-label={`View larger image: ${item.title}`}
            >
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 92vw"
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-label text-gold">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-display text-[15px] font-semibold leading-snug text-ivory">
                    {item.title}
                  </span>
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-ink/30 text-ivory backdrop-blur-sm">
                  <Expand className="size-3.5" aria-hidden="true" />
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      <DemoNote className="mt-5">
        Gallery images are licensed stock photographs used to demonstrate the layout. Replace them
        with the institution’s own campus photography before launch.
      </DemoNote>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null)
        }}
      >
        <DialogContent
          hideClose
          className="max-w-4xl border-0 bg-ink p-0 text-ivory"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') move(1)
            if (event.key === 'ArrowLeft') move(-1)
          }}
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.title}</DialogTitle>
              <div className="relative">
                <ImageWithFallback
                  src={current.src}
                  alt={current.alt}
                  sizes="(min-width: 1024px) 70vw, 95vw"
                  className="h-[42vh] w-full bg-ink-deep sm:h-[56vh]"
                  imgClassName="object-contain"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outlineLight"
                      size="icon"
                      onClick={() => move(-1)}
                      aria-label="Previous image"
                      className="bg-ink/40 backdrop-blur"
                    >
                      <ChevronLeft aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="outlineLight"
                      size="icon"
                      onClick={() => move(1)}
                      aria-label="Next image"
                      className="bg-ink/40 backdrop-blur"
                    >
                      <ChevronRight aria-hidden="true" />
                    </Button>
                  </div>
                  <p className="text-[10px] uppercase tracking-label text-ivory/60">
                    {String((activeIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                    {String(filtered.length).padStart(2, '0')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <Badge variant="inverse">{current.category}</Badge>
                  <h2 className="mt-3 font-display text-xl font-semibold text-ivory">
                    {current.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory/60">{current.caption}</p>
                </div>
                <DialogClose asChild>
                  <Button type="button" variant="outlineLight" size="sm">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
