import { CATEGORY_LABELS } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { QrCode } from 'lucide-react';

type ProjectMockupProps = {
    project: Project;
    locale: Locale;
    noPreview: string;
};

/**
 * One project as a device pair: a laptop showing the project, and a phone
 * standing in front of its lower right corner. Without a screenshot the laptop
 * keeps a wireframe dashboard and the caption says so, so nothing is passed off
 * as real.
 *
 * The laptop is a fixed-width column centred in the slide; the phone is
 * absolutely placed against it so the overlap holds at every width.
 */
export default function ProjectMockup({
    project,
    locale,
    noPreview,
}: ProjectMockupProps) {
    const address = project.demoUrl
        ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
        : `${project.title.toLowerCase().replace(/\s+/g, '-')}.dev`;

    const alt = `${project.title} - ${CATEGORY_LABELS[project.category][locale]}`;

    return (
        <figure className="relative flex items-center justify-center pt-4 pb-10 sm:py-6">
            <div className="relative w-full max-w-[520px] drop-shadow-2xl">
                <div className="rounded-t-2xl border-x border-t border-white/20 bg-[#091518] p-2.5 pb-0 shadow-2xl">
                    <div className="flex w-full justify-center pb-1.5">
                        <span className="flex size-2.5 items-center justify-center rounded-full border border-white/10 bg-[#14282e]">
                            <span className="size-1 rounded-full bg-accent-teal" />
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-t-lg border border-white/10 bg-[#061114]">
                        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f2227] px-3.5 py-1.5">
                            <div className="flex shrink-0 gap-1.5" aria-hidden>
                                <span className="inline-block size-2.5 rounded-full bg-red-500/80" />
                                <span className="inline-block size-2.5 rounded-full bg-yellow-500/80" />
                                <span className="inline-block size-2.5 rounded-full bg-green-500/80" />
                            </div>

                            <span className="mx-auto w-3/5 truncate rounded-md border border-white/5 bg-[#09171b] px-3 py-0.5 text-center font-mono text-[10px] text-slate-muted">
                                {address}
                            </span>
                        </div>

                        {project.image ? (
                            <img
                                src={project.image}
                                alt={alt}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[16/10] w-full object-cover object-top"
                            />
                        ) : (
                            <Wireframe project={project} alt={alt} />
                        )}
                    </div>
                </div>

                <div className="flex h-4 items-center justify-center rounded-b-xl border-t border-white/20 bg-gradient-to-r from-[#172d33] via-[#24424b] to-[#172d33] px-4 shadow-xl">
                    <span className="h-1 w-16 rounded-b-md bg-[#0b171a] shadow-inner" />
                </div>
                <div className="-ml-[2%] h-2 w-[104%] rounded-b-lg bg-[#060e10] shadow-2xl" />
            </div>

            <div className="absolute -right-1 -bottom-4 z-20 w-[132px] sm:right-2 sm:w-[150px]">
                <div className="rounded-[28px] border-2 border-white/25 bg-[#071316] p-2.5 shadow-2xl">
                    <div className="space-y-2 rounded-[20px] border border-white/10 bg-[#0a181d] p-2.5 text-sand">
                        <div className="flex items-center justify-between px-1">
                            <span className="font-mono text-[8px] font-bold text-slate-muted">
                                09:41
                            </span>
                            <span className="h-3 w-10 rounded-full bg-black" />
                            <span className="size-1.5 rounded-full bg-accent-teal" />
                        </div>

                        <div className="space-y-1.5 rounded-xl border border-white/5 bg-deck-850/90 p-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] font-bold tracking-wider text-accent-teal uppercase">
                                    {project.title}
                                </span>
                                <span className="size-1.5 rounded-full bg-accent-mint" />
                            </div>
                            <p className="text-[9px] leading-tight font-semibold text-sand">
                                {CATEGORY_LABELS[project.category][locale]}
                            </p>
                        </div>

                        <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-accent-teal py-1.5 text-[9px] font-bold text-[#0a1618]">
                            <QrCode className="size-2.5" aria-hidden />
                            {project.technologies[0] ?? 'App'}
                        </div>

                        <div className="mx-auto mt-1 h-0.5 w-10 rounded-full bg-white/30" />
                    </div>
                </div>
            </div>

            {project.image ? null : (
                <figcaption className="absolute inset-x-0 bottom-0 text-center font-mono text-[10px] tracking-wider text-slate-muted uppercase">
                    {noPreview}
                </figcaption>
            )}
        </figure>
    );
}

/** The placeholder dashboard shown while a project has no screenshot yet. */
function Wireframe({ project, alt }: { project: Project; alt: string }) {
    return (
        <div
            role="img"
            aria-label={alt}
            className="min-h-[240px] space-y-3 bg-gradient-to-b from-[#0e242a] to-[#071317] p-4"
        >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-accent-teal/40 bg-accent-teal/20 text-xs font-bold text-accent-teal">
                        {project.title.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                        <p className="text-xs font-bold text-sand">
                            {project.title}
                        </p>
                        <p className="text-[9px] text-slate-muted">
                            {project.technologies[0] ?? 'WIP'}
                        </p>
                    </div>
                </div>

                <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-semibold text-emerald-300">
                    <span className="size-1.5 status-pulse rounded-full bg-emerald-400" />
                    Live
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((cell) => (
                    <div
                        key={cell}
                        className="space-y-2 rounded-xl border border-white/5 bg-deck-850/80 p-2.5"
                    >
                        <span className="block h-1.5 w-10 rounded-full bg-white/15" />
                        <span className="block h-2.5 w-16 rounded-full bg-white/25" />
                    </div>
                ))}
            </div>

            <div className="space-y-2 rounded-xl border border-white/10 bg-[#09171b] p-3">
                <div className="flex items-center justify-between">
                    <span className="h-2.5 w-40 rounded-full bg-white/25" />
                    <span className="rounded-full bg-accent-teal/15 px-2 py-0.5 font-mono text-[9px] text-accent-teal">
                        {project.technologies[0] ?? 'WIP'}
                    </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0c1a1e]">
                    <span className="block h-1.5 w-4/5 rounded-full bg-accent-teal" />
                </div>
            </div>
        </div>
    );
}
