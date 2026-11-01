import ProjectPanel from '@/components/portfolio/molecules/project-panel';
import { WORKS } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type WorksSectionProps = {
    locale: Locale;
};

const CONTROL =
    'inline-flex items-center justify-center rounded-lg bg-deck-800 p-2.5 text-sand transition-colors hover:bg-deck-700 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none disabled:bg-deck-900 disabled:text-slate-muted/50 disabled:hover:bg-deck-900 motion-reduce:transition-none';

/**
 * The projects: one full-height panel per view, moving sideways. The track is a
 * native scroll container, so drag, swipe and momentum come from the browser
 * and every panel lands flush; the arrows and the arrow keys sit on top of it.
 */
export default function WorksSection({ locale }: WorksSectionProps) {
    const total = WORKS.items.length;
    const track = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    const goTo = useCallback(
        (next: number) => {
            const element = track.current;

            if (!element) {
                return;
            }

            const clamped = Math.min(Math.max(next, 0), total - 1);

            element.scrollTo({
                left: clamped * element.clientWidth,
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
        },
        [reduceMotion, total],
    );

    /** Follows dragging and swiping too, so the counter never lies. */
    useEffect(() => {
        const element = track.current;

        if (!element) {
            return;
        }

        let frame = 0;
        const sync = () => {
            frame = 0;
            setIndex(
                Math.round(element.scrollLeft / (element.clientWidth || 1)),
            );
        };
        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(sync);
            }
        };

        element.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            element.removeEventListener('scroll', onScroll);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <section
            id="proyek"
            aria-labelledby="proyek-title"
            className="relative w-full scroll-mt-24"
        >
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 pt-20 sm:px-8">
                <div>
                    <h2
                        id="proyek-title"
                        className="font-display text-4xl font-black tracking-[-0.02em] text-sand uppercase sm:text-5xl"
                    >
                        {WORKS.title[locale]}
                    </h2>

                    <p className="mt-3 max-w-2xl text-base text-slate-muted">
                        {WORKS.lead[locale]}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <span
                        aria-hidden
                        className="font-mono text-sm text-slate-muted tabular-nums"
                    >
                        {index + 1} / {total}
                    </span>

                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        disabled={index <= 0}
                        aria-label={WORKS.prevLabel[locale]}
                        className={CONTROL}
                    >
                        <ChevronLeft className="size-4" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        disabled={index >= total - 1}
                        aria-label={WORKS.nextLabel[locale]}
                        className={CONTROL}
                    >
                        <ChevronRight className="size-4" aria-hidden />
                    </button>
                </div>
            </div>

            <div
                ref={track}
                role="group"
                aria-roledescription="carousel"
                aria-label={WORKS.galleryLabel[locale]}
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') {
                        event.preventDefault();
                        goTo(index - 1);
                    }

                    if (event.key === 'ArrowRight') {
                        event.preventDefault();
                        goTo(index + 1);
                    }
                }}
                className="mt-8 flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
            >
                {WORKS.items.map((project, position) => (
                    <div
                        key={project.id}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${position + 1} ${WORKS.slideOf[locale]} ${total}`}
                        className="w-full shrink-0 snap-center"
                    >
                        <ProjectPanel
                            project={project}
                            index={position}
                            locale={locale}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
