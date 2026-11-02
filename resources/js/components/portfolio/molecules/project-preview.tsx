import { UI } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

type PreviewProps = {
    project: Project;
    locale: Locale;
};

/**
 * The device shot for one project. Web work stands in a laptop with a phone on
 * one side and a tablet on the other. The frames are drawn here, the screens are
 * the project's own shot, and a project without one gets a quiet placeholder
 * instead of a fake screen.
 */
export default function ProjectPreview({ project, locale }: PreviewProps) {
    return <WebStage project={project} locale={locale} />;
}

/** Laptop in the middle, phone leaning in from the left, tablet from the right. */
function WebStage({ project, locale }: { project: Project; locale: Locale }) {
    const copy = UI[locale];
    const shots = project.mockups;

    return (
        <div className="relative mx-auto h-[290px] w-full max-w-[600px] sm:h-[380px] lg:h-[400px]">
            <div className="absolute top-0 left-1/2 z-10 w-[82%] -translate-x-1/2">
                <Laptop title={project.title}>
                    {shots?.laptop ? (
                        <Shot
                            src={shots.laptop}
                            alt={`Tampilan ${project.title}`}
                        />
                    ) : (
                        <Placeholder
                            title={project.title}
                            note={copy.mockupPending}
                        />
                    )}
                </Laptop>
            </div>

            {shots?.phone && (
                <div className="absolute bottom-0 left-0 z-20 w-[21%] max-w-[120px] rotate-[-9deg] sm:w-[22%] sm:max-w-[132px]">
                    <Phone label={project.title} compact>
                        <Shot src={shots.phone} alt="" />
                    </Phone>
                </div>
            )}

            {shots?.tablet && (
                <div className="absolute right-0 bottom-[2%] z-20 w-[27%] max-w-[160px] rotate-[7deg] sm:w-[28%] sm:max-w-[178px]">
                    <Tablet title={project.title}>
                        <Shot src={shots.tablet} alt="" />
                    </Tablet>
                </div>
            )}
        </div>
    );
}

/** One captured screen, filling its frame from the top edge. */
function Shot({ src, alt }: { src: string; alt: string }) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
        />
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
