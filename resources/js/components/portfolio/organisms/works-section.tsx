import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import ProjectShowcase from '@/components/portfolio/molecules/project-showcase';
import { PROFILE, UI, WORKS } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type WorksSectionProps = {
    locale: Locale;
};

const CONTROL =
    'inline-flex items-center justify-center rounded-lg border border-deck-700 bg-deck-900 p-2.5 text-sand transition-colors hover:bg-deck-800 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none disabled:opacity-30 disabled:hover:bg-deck-900 motion-reduce:transition-none';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * The projects as one featured card at a time, on every width. It rides native
 * scroll snapping, so drag, swipe, trackpad and momentum come from the browser
 * and every slide lands flush; the arrows, the arrow keys and the counter are
 * the only things added on top.
 *
 * The scroller keeps `relative` so the absolutely positioned phone inside a
 * slide stays clipped by it instead of scrolling the document sideways.
 */
export default function WorksSection({ locale }: WorksSectionProps) {
    const copy = UI[locale];
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
        <Section id="proyek">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-deck-700/80 pb-6 md:flex-row md:items-end">
                <SectionHeading
                    kicker={WORKS.kicker[locale]}
                    title={WORKS.title[locale]}
                    lead={WORKS.lead[locale]}
                />

                <div className="flex shrink-0 items-center gap-3">
                    <span
                        aria-hidden
                        className="font-mono text-xs font-bold text-slate-muted tabular-nums"
                    >
                        {pad(index + 1)} / {pad(total)}
                    </span>

                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        disabled={index <= 0}
                        aria-label={copy.prevProject}
                        className={CONTROL}
                    >
                        <ChevronLeft className="size-4" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        disabled={index >= total - 1}
                        aria-label={copy.nextProject}
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
                aria-label={copy.worksCarousel}
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
                className="relative flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain pb-1 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
            >
                {WORKS.items.map((project, position) => (
                    <div
                        key={project.title}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${pad(position + 1)} ${copy.slideOf} ${pad(total)}`}
                        className="relative w-full shrink-0 snap-center"
                    >
                        <ProjectShowcase
                            project={project}
                            number={pad(position + 1)}
                            locale={locale}
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-2 pt-6 text-xs text-slate-muted sm:flex-row">
                <p>{copy.dragHint}</p>
                <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-accent-teal"
                >
                    <span>{WORKS.viewGithub[locale]}</span>
                    <ChevronRight className="size-3.5" aria-hidden />
                </a>
            </div>
        </Section>
    );
}
