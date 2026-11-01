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

    const screen =
        project.title === 'SpaceDash: Alien Shooter' ? (
            <SpaceDashScreen locale={locale} />
        ) : project.title === 'Body Explorer' ? (
            <BodyExplorerScreen locale={locale} />
        ) : null;

    return (
        <figure className="relative flex items-center justify-center pt-4 pb-10 sm:py-6">
            <div className="relative w-full max-w-[520px]">
                <div className="rounded-t-2xl bg-[#091518] p-2.5 pb-0">
                    <div className="flex w-full justify-center pb-1.5">
                        <span className="flex size-2.5 items-center justify-center rounded-full bg-[#14282e]">
                            <span className="size-1 rounded-full bg-accent-teal" />
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-t-lg bg-[#061114]">
                        <div className="flex items-center gap-2 bg-[#0f2227] px-3.5 py-1.5">
                            <div className="flex shrink-0 gap-1.5" aria-hidden>
                                <span className="inline-block size-2.5 rounded-full bg-red-500/80" />
                                <span className="inline-block size-2.5 rounded-full bg-yellow-500/80" />
                                <span className="inline-block size-2.5 rounded-full bg-green-500/80" />
                            </div>

                            <span className="mx-auto w-3/5 truncate rounded-md bg-[#09171b] px-3 py-1 text-center text-[13px] text-slate-muted">
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

                <div className="flex h-4 items-center justify-center rounded-b-xl bg-[#1b3840] px-4">
                    <span className="h-1 w-16 rounded-b-md bg-[#0b171a] shadow-inner" />
                </div>
                <div className="-ml-[2%] h-2 w-[104%] rounded-b-lg bg-[#060e10]" />
            </div>

            <div className="absolute -right-1 -bottom-4 z-20 w-[150px] sm:right-2 sm:w-[172px]">
                <div className="rounded-[28px] bg-[#071316] p-2.5">
                    {screen ? (
                        <div className="overflow-hidden rounded-[20px]">
                            {screen}
                        </div>
                    ) : (
                        <div className="space-y-2 rounded-[20px] bg-[#0a181d] p-2.5 text-sand">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[13px] font-bold text-slate-muted">
                                    09:41
                                </span>
                                <span className="h-3 w-10 rounded-full bg-black" />
                                <span className="size-1.5 rounded-full bg-accent-teal" />
                            </div>

                            <div className="space-y-1.5 rounded-xl bg-deck-850 p-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-accent-teal">
                                        {project.title}
                                    </span>
                                    <span className="size-1.5 rounded-full bg-accent-mint" />
                                </div>
                                <p className="text-[13px] leading-tight font-semibold text-sand">
                                    {CATEGORY_LABELS[project.category][locale]}
                                </p>
                            </div>

                            <div className="flex w-full items-center justify-center gap-1 rounded-lg bg-accent-teal py-1.5 text-[13px] font-bold text-[#0a1618]">
                                <QrCode className="size-2.5" aria-hidden />
                                {project.technologies[0] ?? 'App'}
                            </div>

                            <div className="mx-auto mt-1 h-0.5 w-10 rounded-full bg-white/30" />
                        </div>
                    )}
                </div>
            </div>

            {project.image ? null : (
                <figcaption className="absolute inset-x-0 bottom-0 text-center text-[13px] text-slate-muted">
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
            className="min-h-[240px] space-y-3 bg-[#0c2026] p-4"
        >
            <div className="flex items-center justify-between pb-2.5">
                <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-accent-teal/40 bg-accent-teal/20 text-[13px] font-bold text-accent-teal">
                        {project.title.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                        <p className="text-[13px] font-bold text-sand">
                            {project.title}
                        </p>
                        <p className="text-[13px] text-slate-muted">
                            {project.technologies[0] ?? 'WIP'}
                        </p>
                    </div>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[13px] font-semibold text-emerald-300">
                    <span className="size-1.5 status-pulse rounded-full bg-emerald-400" />
                    Live
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((cell) => (
                    <div
                        key={cell}
                        className="space-y-2 rounded-xl bg-deck-850 p-2.5"
                    >
                        <span className="block h-1.5 w-10 rounded-full bg-white/15" />
                        <span className="block h-2.5 w-16 rounded-full bg-white/25" />
                    </div>
                ))}
            </div>

            <div className="space-y-2 rounded-xl bg-[#09171b] p-3">
                <div className="flex items-center justify-between">
                    <span className="h-2.5 w-40 rounded-full bg-white/25" />
                    <span className="rounded-full bg-accent-teal/15 px-2 py-0.5 text-[13px] text-accent-teal">
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

/** A fixed star field, so the drawn screen is identical on every render. */
const STARS: Array<[number, number, number]> = [
    [7, 10, 1],
    [13, 64, 1],
    [21, 30, 1],
    [28, 82, 1],
    [36, 16, 1],
    [44, 58, 1],
    [52, 38, 1],
    [58, 76, 1],
    [66, 22, 1],
    [72, 50, 1],
    [80, 14, 1],
    [86, 68, 1],
];

/** The SpaceDash title screen, drawn so the phone shows the game itself. */
function SpaceDashScreen({ locale }: { locale: Locale }) {
    return (
        <div className="relative flex aspect-[9/16] flex-col justify-between overflow-hidden bg-[#050b1a] p-2.5 text-sand">
            {STARS.map(([top, left, size]) => (
                <span
                    key={`${top}-${left}`}
                    aria-hidden
                    className="absolute rounded-full bg-white/60"
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        width: size * 2,
                        height: size * 2,
                    }}
                />
            ))}

            <div className="relative flex items-center justify-between text-[13px] font-bold text-teal-300">
                <span>{locale === 'id' ? 'SKOR' : 'SCORE'} 0</span>
                <span className="flex gap-1" aria-hidden>
                    {[0, 1, 2].map((life) => (
                        <span
                            key={life}
                            className="size-2 rounded-[2px] bg-teal-300"
                        />
                    ))}
                </span>
            </div>

            <div className="relative flex flex-col items-center gap-2">
                <svg viewBox="0 0 48 48" className="size-9" aria-hidden>
                    <path d="M24 3 34 30 24 25 14 30Z" fill="#7dd3fc" />
                    <path d="M24 25 29 41 24 36 19 41Z" fill="#2dd4bf" />
                </svg>

                <span className="flex gap-2" aria-hidden>
                    {[0, 1].map((alien) => (
                        <span
                            key={alien}
                            className="flex size-3 items-center gap-0.5 rounded-[3px] bg-fuchsia-400/90 p-0.5"
                        >
                            <span className="size-0.5 rounded-full bg-[#050b1a]" />
                            <span className="size-0.5 rounded-full bg-[#050b1a]" />
                        </span>
                    ))}
                </span>
            </div>

            <span className="relative block rounded-lg bg-accent-teal py-1.5 text-center text-[13px] font-bold text-[#0a1618]">
                {locale === 'id' ? 'KETUK MULAI' : 'TAP START'}
            </span>
        </div>
    );
}

/** The Body Explorer drag-and-drop screen: a body outline with one empty slot. */
function BodyExplorerScreen({ locale }: { locale: Locale }) {
    return (
        <div className="relative flex aspect-[9/16] flex-col gap-2 overflow-hidden bg-[#f7efe1] p-2.5 text-[#2b2118]">
            <p className="text-[13px] font-extrabold">Body Explorer</p>

            <div className="relative flex flex-1 items-center justify-center rounded-xl bg-white/70">
                <svg
                    viewBox="0 0 64 120"
                    className="h-full max-h-[130px]"
                    aria-hidden
                >
                    <g
                        fill="none"
                        stroke="#cbbfa8"
                        strokeWidth="6"
                        strokeLinecap="round"
                    >
                        <circle cx="32" cy="16" r="9" />
                        <path d="M32 26v34M32 34 16 50M32 34l16 16M32 60 22 96M32 60l10 36" />
                    </g>
                </svg>

                <span
                    aria-hidden
                    className="absolute top-[38%] left-1/2 size-6 -translate-x-1/2 rounded-full border-2 border-dashed border-[#e8a33d]"
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[13px] font-bold shadow-sm">
                    <svg
                        viewBox="0 0 24 24"
                        className="size-3 text-rose-500"
                        aria-hidden
                    >
                        <path
                            d="M12 21s-7-4.6-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.4 12 21 12 21z"
                            fill="currentColor"
                        />
                    </svg>
                    {locale === 'id' ? 'Jantung' : 'Heart'}
                </span>

                <span className="flex gap-1" aria-hidden>
                    <span className="size-1.5 rounded-full bg-[#e8a33d]" />
                    <span className="size-1.5 rounded-full bg-[#2b2118]/15" />
                    <span className="size-1.5 rounded-full bg-[#2b2118]/15" />
                </span>
            </div>
        </div>
    );
}
