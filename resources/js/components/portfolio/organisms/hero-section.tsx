import Reveal from '@/components/portfolio/atoms/reveal';
import { HERO, NAME, PROFILE, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { ArrowRight, Github } from 'lucide-react';
import { useState } from 'react';

type HeroSectionProps = {
    locale: Locale;
};

/**
 * The cover: the name at display size, what he does and where in the line under
 * it, the pitch, two actions, the facts, and the character card on the right.
 * Clicking the character turns it over into his photograph.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
    const copy = UI[locale];
    const [first, second] = NAME.parts[locale];
    const [showPhoto, setShowPhoto] = useState(false);

    return (
        <section
            id="hero"
            className="relative w-full scroll-mt-24 pt-14 pb-24 md:pt-24 md:pb-32"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9] font-bold tracking-[-0.045em] text-sand">
                                {first}
                                <br />
                                {second}
                            </h1>
                        </Reveal>

                        <Reveal delay={70}>
                            <p className="mt-7 max-w-[34ch] text-xl leading-snug font-semibold text-sand/90 sm:text-2xl">
                                {HERO.roles[0]} &amp; {HERO.roles[1]}
                            </p>

                            <p className="mt-1 text-lg text-slate-muted">
                                {HERO.location[locale]}
                            </p>

                            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-slate-muted">
                                {HERO.lead[locale]}
                            </p>
                        </Reveal>

                        <Reveal delay={140}>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <a
                                    href="#proyek"
                                    className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-6 py-3 text-base font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                                >
                                    {copy.exploreProjects}
                                    <ArrowRight
                                        className="size-4"
                                        aria-hidden
                                    />
                                </a>

                                <a
                                    href="#kontak"
                                    className="rounded-full bg-deck-800 px-6 py-3 text-base font-semibold text-sand transition-colors hover:bg-deck-700"
                                >
                                    {copy.contact}
                                </a>

                                <a
                                    href={PROFILE.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-muted transition-colors hover:text-accent-teal"
                                >
                                    <Github className="size-4" aria-hidden />
                                    {PROFILE.githubHandle}
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={210}>
                            <ul className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
                                {HERO.facts.map((fact) => (
                                    <li key={fact.label.en}>
                                        <span className="block font-display text-3xl font-bold text-sand">
                                            {fact.value}
                                        </span>
                                        <span className="mt-1 block text-base text-slate-muted">
                                            {fact.label[locale]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    <Reveal delay={120} className="lg:col-span-5">
                        <div className="mx-auto w-full max-w-[360px] bg-deck-900 p-6 sm:p-8">
                            <div className="[perspective:1200px]">
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
                                    className="relative block h-72 w-full cursor-pointer transition-transform duration-500 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none"
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
                                            className="absolute inset-0 size-full object-contain [backface-visibility:hidden]"
                                        />

                                        <img
                                            src={HERO.avatarPhoto}
                                            alt={HERO.avatarPhotoAlt[locale]}
                                            width={800}
                                            height={1000}
                                            className="absolute inset-0 size-full [transform:rotateY(180deg)] object-cover [backface-visibility:hidden]"
                                        />
                                    </div>
                                </button>
                            </div>

                            <p className="mt-6 text-center text-base text-slate-muted">
                                {HERO.profileCard.caption[locale]}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
