import { UI } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

type PreviewProps = {
    project: Project;
    locale: Locale;
};

/**
 * The device shot for one project. Web work stands in a laptop with a phone on
 * one side and a tablet on the other; the two games sit in a pair of phones.
 * The frames are drawn here, the screens are the project's own shot, and a
 * project without one gets a quiet placeholder instead of a fake screen.
 */
export default function ProjectPreview({ project, locale }: PreviewProps) {
    if (project.screen) {
        return (
            <div className="relative mx-auto h-[350px] w-full max-w-[430px] sm:h-[410px]">
                <div className="absolute top-2 right-0 z-0 w-[48%] max-w-[186px] sm:right-1">
                    <Phone label={project.title}>
                        {project.screen === 'spacedash' ? (
                            <SpaceDashScreen locale={locale} variant="title" />
                        ) : (
                            <BodyExplorerScreen
                                locale={locale}
                                variant="play"
                            />
                        )}
                    </Phone>
                </div>

                <div className="absolute bottom-0 left-0 z-10 w-[46%] max-w-[178px] rotate-[-14deg] sm:left-2">
                    <Phone label={project.title}>
                        {project.screen === 'spacedash' ? (
                            <SpaceDashScreen locale={locale} variant="play" />
                        ) : (
                            <BodyExplorerScreen
                                locale={locale}
                                variant="menu"
                            />
                        )}
                    </Phone>
                </div>
            </div>
        );
    }

    return <WebStage project={project} locale={locale} />;
}

/** Laptop in the middle, phone leaning in from the left, tablet from the right. */
function WebStage({ project, locale }: { project: Project; locale: Locale }) {
    const copy = UI[locale];

    const screen = project.mockup ? (
        <img
            src={project.mockup}
            alt={`Tampilan ${project.title}`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
        />
    ) : (
        <Placeholder title={project.title} note={copy.mockupPending} />
    );

    return (
        <div className="relative mx-auto h-[290px] w-full max-w-[600px] sm:h-[380px] lg:h-[400px]">
            <div className="absolute top-0 left-1/2 z-10 w-[82%] -translate-x-1/2">
                <Laptop title={project.title}>{screen}</Laptop>
            </div>

            <div className="absolute bottom-0 left-0 z-20 w-[21%] max-w-[120px] rotate-[-9deg] sm:w-[22%] sm:max-w-[132px]">
                <Phone label={project.title} compact>
                    <div className="size-full bg-[#0c1417]">
                        {project.mockup ? (
                            <img
                                src={project.mockup}
                                alt=""
                                aria-hidden
                                loading="lazy"
                                decoding="async"
                                className="size-full object-cover object-top"
                            />
                        ) : (
                            <div className="size-full bg-[#0c1417]" />
                        )}
                    </div>
                </Phone>
            </div>

            <div className="absolute right-0 bottom-[2%] z-20 w-[27%] max-w-[160px] rotate-[7deg] sm:w-[28%] sm:max-w-[178px]">
                <Tablet title={project.title}>
                    {project.mockup ? (
                        <img
                            src={project.mockup}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover object-top"
                        />
                    ) : (
                        <div className="size-full bg-[#0c1417]" />
                    )}
                </Tablet>
            </div>
        </div>
    );
}

/** What a project without a screenshot shows: its name, and that is all. */
function Placeholder({ title, note }: { title: string; note: string }) {
    return (
        <div className="flex size-full flex-col bg-[#0c1417]">
            <div className="flex items-center gap-1.5 bg-[#101b1f] px-3 py-2">
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="ml-2 h-2 w-24 rounded-full bg-white/8" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
                <span className="font-display text-lg font-bold text-slate-muted/45 sm:text-2xl">
                    {title}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-slate-muted/30 uppercase sm:text-[10px]">
                    {note}
                </span>
            </div>
        </div>
    );
}

/** A laptop seen head on, the lid tipped back a little. */
function Laptop({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            role="img"
            aria-label={`Mockup laptop ${title}`}
            className="w-full"
        >
            <div className="[perspective:1600px]">
                <div className="origin-bottom [transform:rotateX(8deg)]">
                    <div className="rounded-t-[14px] bg-gradient-to-b from-[#1a2227] to-[#0d1316] p-2.5 pb-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:p-3">
                        <div className="flex justify-center pb-1.5 sm:pb-2">
                            <span className="size-1 rounded-full bg-white/25" />
                        </div>

                        <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-[#060a0c] ring-1 ring-black/60">
                            {children}
                        </div>
                    </div>

                    <div className="relative -mt-px h-3.5 w-[104%] -translate-x-[2%] rounded-b-[10px] bg-gradient-to-b from-[#2a343a] to-[#141b1f] [clip-path:polygon(2%_0,98%_0,100%_100%,0_100%)] sm:h-4">
                        <span className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-[#0b1114]" />
                    </div>
                </div>
            </div>

            <div
                aria-hidden
                className="mx-auto mt-2 h-5 w-[86%] rounded-[50%] bg-black/55 blur-xl sm:h-6"
            />
        </div>
    );
}

/** A tablet standing on its short edge. */
function Tablet({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            role="img"
            aria-label={`Mockup tablet ${title}`}
            className="rounded-[1rem] bg-gradient-to-b from-[#1a2227] to-[#0d1316] p-1.5 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
        >
            <div className="aspect-[3/4] overflow-hidden rounded-[0.7rem] bg-[#060a0c]">
                {children}
            </div>
        </div>
    );
}

/** A phone in its frame, with the island, the buttons and a soft drop. */
function Phone({
    label,
    children,
    compact = false,
}: {
    label: string;
    children: React.ReactNode;
    compact?: boolean;
}) {
    return (
        <div
            role="img"
            aria-label={`Mockup ponsel ${label}`}
            className="relative rounded-[1.9rem] bg-[#0d1214] p-[5px] shadow-[0_26px_50px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
        >
            <span
                aria-hidden
                className="absolute top-[18%] -left-[2px] h-6 w-[2px] rounded-l bg-white/15"
            />
            <span
                aria-hidden
                className="absolute top-[18%] -right-[2px] h-9 w-[2px] rounded-r bg-white/15"
            />

            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] bg-black">
                <span
                    aria-hidden
                    className={cn(
                        'absolute top-1.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black',
                        compact ? 'h-1.5 w-6' : 'h-2.5 w-10',
                    )}
                />
                {children}
            </div>
        </div>
    );
}

/** A fixed star field, so the drawn screen is identical on every render. */
const STARS: Array<[number, number]> = [
    [7, 10],
    [13, 64],
    [21, 30],
    [28, 82],
    [36, 16],
    [44, 58],
    [52, 38],
    [58, 76],
    [66, 22],
    [72, 50],
    [80, 14],
    [86, 68],
];

function SpaceDashScreen({
    locale,
    variant,
}: {
    locale: Locale;
    variant: 'title' | 'play';
}) {
    return (
        <div className="relative flex size-full flex-col justify-between overflow-hidden bg-[#050b1a] p-2.5 text-sand">
            {STARS.map(([top, left]) => (
                <span
                    key={`${top}-${left}`}
                    aria-hidden
                    className="absolute size-0.5 rounded-full bg-white/60"
                    style={{ top: `${top}%`, left: `${left}%` }}
                />
            ))}

            <div className="relative flex items-center justify-between text-[10px] font-bold text-teal-300">
                <span>
                    {locale === 'id' ? 'SKOR' : 'SCORE'}{' '}
                    {variant === 'play' ? '1240' : '0'}
                </span>
                <span className="flex gap-1" aria-hidden>
                    {[0, 1, 2].map((life) => (
                        <span
                            key={life}
                            className={cn(
                                'size-1.5 rounded-[1px]',
                                variant === 'play' && life === 2
                                    ? 'bg-teal-300/25'
                                    : 'bg-teal-300',
                            )}
                        />
                    ))}
                </span>
            </div>

            {variant === 'title' ? (
                <div className="relative flex flex-col items-center gap-2.5">
                    <svg viewBox="0 0 48 48" className="size-9" aria-hidden>
                        <path d="M24 3 34 30 24 25 14 30Z" fill="#7dd3fc" />
                        <path d="M24 25 29 41 24 36 19 41Z" fill="#2dd4bf" />
                    </svg>

                    <span className="flex gap-2" aria-hidden>
                        {[0, 1].map((alien) => (
                            <span
                                key={alien}
                                className="flex size-2.5 items-center gap-0.5 rounded-[2px] bg-fuchsia-400/90 p-0.5"
                            >
                                <span className="size-0.5 rounded-full bg-[#050b1a]" />
                                <span className="size-0.5 rounded-full bg-[#050b1a]" />
                            </span>
                        ))}
                    </span>
                </div>
            ) : (
                <div className="relative flex flex-1 flex-col items-center justify-center gap-3">
                    <span className="flex gap-3" aria-hidden>
                        {[0, 1, 2].map((alien) => (
                            <span
                                key={alien}
                                className="flex size-2.5 items-center gap-0.5 rounded-[2px] bg-fuchsia-400/90 p-0.5"
                            >
                                <span className="size-0.5 rounded-full bg-[#050b1a]" />
                                <span className="size-0.5 rounded-full bg-[#050b1a]" />
                            </span>
                        ))}
                    </span>

                    <svg viewBox="0 0 48 48" className="size-7" aria-hidden>
                        <path d="M24 3 34 30 24 25 14 30Z" fill="#7dd3fc" />
                        <path d="M24 25 29 41 24 36 19 41Z" fill="#2dd4bf" />
                    </svg>

                    <span
                        aria-hidden
                        className="absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-teal-400/30"
                    />
                </div>
            )}

            <span className="relative block rounded-md bg-accent-teal py-1.5 text-center text-[10px] font-bold text-[#0a1618]">
                {variant === 'play'
                    ? locale === 'id'
                        ? 'JEDA'
                        : 'PAUSE'
                    : locale === 'id'
                      ? 'KETUK MULAI'
                      : 'TAP START'}
            </span>
        </div>
    );
}

function BodyExplorerScreen({
    locale,
    variant,
}: {
    locale: Locale;
    variant: 'play' | 'menu';
}) {
    return (
        <div className="relative flex size-full flex-col gap-2 overflow-hidden bg-[#f7efe1] p-2.5 text-[#2b2118]">
            <p className="text-[11px] font-extrabold">Body Explorer</p>

            {variant === 'play' ? (
                <>
                    <div className="relative flex flex-1 items-center justify-center rounded-lg bg-white/70">
                        <svg
                            viewBox="0 0 64 120"
                            className="h-full max-h-[120px]"
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
                            className="absolute top-[34%] left-1/2 size-5 -translate-x-1/2 rounded-full border-2 border-dashed border-[#e8a33d]"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1 rounded-md bg-white px-1.5 py-1 text-[9px] font-bold">
                            <svg
                                viewBox="0 0 24 24"
                                className="size-2.5 text-rose-500"
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
                </>
            ) : (
                <>
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-white/70">
                        <svg viewBox="0 0 64 120" className="h-16" aria-hidden>
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
                    </div>

                    <div className="space-y-1.5">
                        {[
                            locale === 'id' ? 'Mulai' : 'Start',
                            locale === 'id' ? 'Level' : 'Level',
                            locale === 'id' ? 'Keluar' : 'Quit',
                        ].map((label) => (
                            <span
                                key={label}
                                className="block rounded-md bg-[#e8a33d] py-1.5 text-center text-[10px] font-bold text-[#2b2118]"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
