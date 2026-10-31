import { HERO, NAME, PROFILE, UI } from "@/data/portfolio";
import type { Locale } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ChevronDown, Github, MapPin } from "lucide-react";
import { useState } from "react";

type HeroSectionProps = {
    locale: Locale;
};

const STAT = "rounded-xl border border-deck-700/60 bg-deck-900/80 p-3.5";

/**
 * The cover: the big wordmark and the two roles across the top rule, then the
 * name, the pitch and the stats on the left with the avatar card on the right.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
    const copy = UI[locale];
    const [first, second] = NAME.parts[locale];
    const card = HERO.profileCard;
    const [showPhoto, setShowPhoto] = useState(false);

    return (
        <section
            id="hero"
            className="relative w-full scroll-mt-24 border-b border-deck-700/60 grid-pattern pt-12 pb-20 md:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <div className="mb-10 flex items-center justify-between gap-4 border-b border-deck-700/80 pb-5">
                    <h1 className="font-display text-4xl font-black tracking-tighter text-sand uppercase sm:text-6xl md:text-8xl">
                        {HERO.wordmark[locale]}
                    </h1>

                    <div className="hidden items-center gap-4 text-xs font-bold tracking-widest text-accent-teal md:flex">
                        <span>{HERO.roles[0]}</span>
                        <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-accent-teal"
                        />
                        <span>{HERO.roles[1]}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="space-y-6 lg:col-span-7">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-extrabold tracking-tight text-sand sm:text-5xl lg:text-6xl">
                                {first} {second}
                            </h2>

                            <p className="max-w-2xl text-base leading-relaxed text-slate-muted sm:text-lg">
                                {HERO.lead[locale]}
                            </p>
                        </div>

                        <p className="flex items-center gap-2 text-xs font-medium text-slate-muted sm:text-sm">
                            <MapPin
                                className="size-4 shrink-0 text-accent-teal"
                                aria-hidden
                            />
                            {HERO.eyebrow[locale]}
                        </p>

                        <div className="flex flex-wrap items-center gap-3.5 pt-2">
                            <a
                                href="#proyek"
                                className="inline-flex items-center gap-2 rounded-xl bg-accent-teal px-6 py-3 text-sm font-bold text-[#0a1618] shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-colors hover:bg-accent-mint"
                            >
                                <span>{copy.exploreProjects}</span>
                                <ChevronDown className="size-4" aria-hidden />
                            </a>

                            <a
                                href="#kontak"
                                className="rounded-xl border border-deck-700 bg-deck-900 px-6 py-3 text-sm font-semibold text-sand transition-colors hover:bg-deck-800"
                            >
                                {copy.contact}
                            </a>

                            <a
                                href={PROFILE.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-muted transition-colors hover:text-accent-teal"
                            >
                                <Github className="size-4" aria-hidden />
                                {PROFILE.githubHandle}
                            </a>
                        </div>

                        <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-deck-700/80 pt-6">
                            {HERO.facts.map((fact) => (
                                <div key={fact.value} className={STAT}>
                                    <dt className="block text-[11px] font-semibold tracking-wider text-slate-muted uppercase">
                                        {fact.label[locale]}
                                    </dt>
                                    <dd className="font-display text-2xl font-black text-sand sm:text-3xl">
                                        {fact.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="flex items-center justify-center lg:col-span-5">
                        <div className="relative flex aspect-[4/5] w-full max-w-[340px] flex-col items-center justify-between overflow-hidden rounded-3xl border border-accent-teal/30 bg-gradient-to-b from-deck-850 via-deck-900 to-[#081315] p-5 shadow-2xl">
                            <span
                                aria-hidden
                                className="absolute inset-0 dot-pattern opacity-15"
                            />

                            <div className="z-10 flex w-full items-center justify-between">
                                <span className="rounded-md border border-accent-teal/30 bg-[#0a1618]/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-accent-teal">
                                    {card.badge}
                                </span>

                                <div className="flex gap-1.5" aria-hidden>
                                    <span className="size-2.5 rounded-full bg-red-400/80" />
                                    <span className="size-2.5 rounded-full bg-yellow-400/80" />
                                    <span className="size-2.5 rounded-full bg-green-400/80" />
                                </div>
                            </div>

                            <div className="relative z-10 flex w-full items-center justify-center py-2 [perspective:1200px]">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPhoto((shown) => !shown)
                                    }
                                    aria-pressed={showPhoto}
                                    aria-label={
                                        showPhoto
                                            ? HERO.avatarAlt[locale]
                                            : HERO.avatarPhotoAlt[locale]
                                    }
                                    className="relative block h-64 w-52 cursor-pointer rounded-2xl transition-transform duration-500 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none"
                                >
                                    <div
                                        className={cn(
                                            'relative size-full transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none',
                                            showPhoto &&
                                                '[transform:rotateY(180deg)]',
                                        )}
                                    >
                                        <img
                                            src={HERO.avatar}
                                            alt={HERO.avatarAlt[locale]}
                                            width={255}
                                            height={800}
                                            className="absolute inset-0 size-full object-contain drop-shadow-2xl [backface-visibility:hidden]"
                                        />

                                        <img
                                            src={HERO.avatarPhoto}
                                            alt={HERO.avatarPhotoAlt[locale]}
                                            width={768}
                                            height={960}
                                            className="absolute inset-0 size-full rounded-2xl object-cover shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                                        />
                                    </div>
                                </button>
                            </div>

                            <div className="z-10 w-full rounded-xl border border-deck-700/60 bg-deck-850/90 px-3 py-2 text-center">
                                <span className="text-xs font-semibold text-sand">
                                    {card.caption[locale]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
