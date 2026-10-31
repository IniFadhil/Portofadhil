import Reveal from '@/components/portfolio/atoms/reveal';
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
    'inline-flex items-center justify-center rounded-full bg-deck-800 p-3 text-sand transition-colors hover:bg-deck-700 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none disabled:bg-deck-900 disabled:text-slate-muted/40 disabled:hover:bg-deck-900 motion-reduce:transition-none';

/**
 * The projects as one featured slide at a time, on every width. It rides native
 * scroll snapping, so drag, swipe, trackpad and momentum come from the browser
 * and every slide lands flush; the arrows and the arrow keys are the only things
 * added on top.
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
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <SectionHeading
                    title={WORKS.title[locale]}
                    lead={WORKS.lead[locale]}
                />

                <div className="flex shrink-0 items-center gap-3 pb-1">
                    <span className="text-base text-slate-muted tabular-nums">
                        {index + 1} / {total}
                    </span>

                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        disabled={index <= 0}
                        aria-label={copy.prevProject}
                        className={CONTROL}
                    >
                        <ChevronLeft className="size-5" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        disabled={index >= total - 1}
                        aria-label={copy.nextProject}
                        className={CONTROL}
                    >
                        <ChevronRight className="size-5" aria-hidden />
                    </button>
                </div>
            </div>

            <Reveal delay={80}>
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
                    className="relative mt-12 flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
                >
                    {WORKS.items.map((project, position) => (
                        <div
                            key={project.title}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${position + 1} / ${total}`}
                            className="relative w-full shrink-0 snap-center"
                        >
                            <ProjectShowcase
                                project={project}
                                locale={locale}
                            />
                        </div>
                    ))}
                </div>
            </Reveal>

            <div className="flex justify-end pt-8">
                <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-semibold text-sand transition-colors hover:text-accent-teal"
                >
                    <span>{WORKS.viewGithub[locale]}</span>
                    <ChevronRight className="size-4" aria-hidden />
                </a>
            </div>
        </Section>
    );
}
