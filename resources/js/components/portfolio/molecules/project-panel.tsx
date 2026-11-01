import { UI } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

type ProjectPanelProps = {
    project: Project;
    index: number;
    locale: Locale;
};

/**
 * One project as a full panel: the number, title, short read and stack in a
 * narrow column on the left, the mockup on the right. The mockup is shown as
 * delivered, so nothing is drawn around it.
 */
export default function ProjectPanel({
    project,
    index,
    locale,
}: ProjectPanelProps) {
    const copy = UI[locale];
    const { ref, revealed } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[78vh] lg:flex-row lg:items-center lg:gap-14"
        >
            <div
                data-revealed={revealed}
                className={cn(
                    'order-2 lg:order-1 lg:w-[36%] lg:shrink-0',
                    'motion-safe:translate-y-5 motion-safe:opacity-0 motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-out',
                    'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:opacity-100',
                )}
            >
                <div className="flex items-baseline gap-3">
                    <span
                        aria-hidden
                        className="font-mono text-sm leading-none text-slate-muted/60 tabular-nums"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="font-display text-3xl font-black tracking-tight text-sand sm:text-4xl">
                        {project.title}
                    </h3>
                </div>

                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-pretty text-slate-muted sm:text-lg">
                    {project.description[locale]}
                </p>

                {project.tech.length > 0 ? (
                    <p className="mt-7 font-mono text-[13px] leading-loose tracking-[0.15em] text-slate-muted/80 uppercase">
                        {project.tech.join(' • ')}
                    </p>
                ) : null}

                {project.link ? (
                    <a
                        href={project.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${copy.projectLink}: ${project.title}`}
                        className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] tracking-[0.12em] text-slate-muted transition-colors hover:text-accent-teal focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none"
                    >
                        {project.link.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                ) : null}
            </div>

            <div
                data-revealed={revealed}
                className={cn(
                    'order-1 lg:order-2 lg:min-w-0 lg:flex-1',
                    'motion-safe:translate-x-6 motion-safe:opacity-0 motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-out',
                    'motion-safe:data-[revealed=true]:translate-x-0 motion-safe:data-[revealed=true]:opacity-100',
                )}
            >
                {project.mockup ? (
                    <img
                        src={project.mockup}
                        alt={`Mockup ${project.title}`}
                        width={1280}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto block h-auto w-full object-contain transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] motion-reduce:transform-none"
                    />
                ) : (
                    <p className="flex aspect-[16/10] w-full items-center justify-center font-mono text-[13px] tracking-[0.15em] text-slate-muted/50 uppercase">
                        {copy.mockupPending}
                    </p>
                )}
            </div>
        </article>
    );
}
