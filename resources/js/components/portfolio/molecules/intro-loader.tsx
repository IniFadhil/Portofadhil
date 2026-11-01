import { HERO, NAME, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useEffect, useState } from 'react';

type IntroLoaderProps = {
    locale: Locale;
    onDone: () => void;
};

/** How long the meter takes to reach 100. */
const FILL_MS = 2600;

/**
 * The opening screen: the deck cover held full bleed, the visitor's name run
 * out to the right with the character landing on top of it.
 *
 * The meter fills on its own, but the sequence never leaves on its own: at 100
 * the door opens (the Lanjutkan button and the Enter hint fade in) and only then
 * does a click or Enter wipe the overlay up off the page. The caller does not
 * mount this at all for a reduced-motion visitor or a return visit in the tab.
 */
export default function IntroLoader({ locale, onDone }: IntroLoaderProps) {
    const copy = UI[locale];
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const ready = progress >= 100;

    // The meter, eased out so it settles instead of stopping dead at 100.
    useEffect(() => {
        const started = performance.now();
        let frame = requestAnimationFrame(function tick(now) {
            const elapsed = Math.min(1, (now - started) / FILL_MS);
            setProgress(Math.round((1 - (1 - elapsed) ** 3) * 100));

            if (elapsed < 1) {
                frame = requestAnimationFrame(tick);
            }
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    // Enter opens the door, but only once it is actually open.
    useEffect(() => {
        if (!ready || leaving) {
            return;
        }

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setLeaving(true);
            }
        };

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, [ready, leaving]);

    // Nothing behind the overlay should scroll while it is up.
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.introLabel}
            data-state={leaving ? 'leaving' : ready ? 'ready' : 'loading'}
            onAnimationEnd={(event) => {
                if (leaving && event.animationName === 'intro-loader-out') {
                    onDone();
                }
            }}
            className="intro-loader fixed inset-0 z-[100] flex items-center justify-center deck-field px-6"
        >
            <div className="flex w-full max-w-[min(92vw,52rem)] flex-col items-center gap-[clamp(16px,3.4vh,34px)] text-center">
                <Cover locale={locale} />

                <div className="flex flex-col items-center gap-3">
                    <div className="relative h-px w-[min(320px,58vw)] overflow-hidden bg-sand/25">
                        <span
                            className="absolute inset-y-0 left-0 bg-sand"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p
                        aria-live="polite"
                        className="flex items-baseline gap-2 text-sm leading-none tracking-[0.22em] text-slate-muted uppercase"
                    >
                        <span>{copy.loadingLabel}</span>
                        <span className="text-sand tabular-nums">
                            {String(progress).padStart(3, '0')}
                        </span>
                    </p>
                </div>

                <div className="intro-loader__door flex flex-col items-center gap-2">
                    <button
                        type="button"
                        tabIndex={ready ? 0 : -1}
                        disabled={!ready}
                        onClick={() => setLeaving(true)}
                        className="rounded-full border border-sand/60 px-6 py-2 font-display text-[12px] font-bold tracking-[0.18em] text-sand uppercase transition-colors duration-200 hover:bg-sand hover:text-[#0a1618] focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none motion-reduce:transition-none"
                    >
                        {copy.continueLabel}
                    </button>
                    <span className="text-sm leading-none tracking-[0.16em] text-slate-muted uppercase">
                        {copy.continueHint}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * The cover slide: the name on one line, wiped in from the left so it reads as
 * running out to the right, with the character landing on top of it. Both are
 * sized in `em` so the whole lockup scales with one font size, and the
 * character is nudged down so the type crosses its chest rather than its waist.
 */
function Cover({ locale }: { locale: Locale }) {
    const name = NAME.parts[locale].join(' ');

    const wordmark =
        'intro-loader__mark font-display leading-[0.8] font-extrabold tracking-[-0.01em] text-sand uppercase [text-shadow:0.03em_0.03em_0_rgb(0_0_0/0.45)]';

    return (
        <div className="relative flex flex-col items-stretch">
            {/* Behind the type and the character: a negative index keeps it off
                both, above only the deck gradient. */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_46%_at_50%_44%,rgb(255_255_255/0.1),transparent_72%)]"
            />

            <div className="relative flex h-[2.2em] items-center justify-center text-[clamp(20px,6.6vw,60px)] leading-none">
                <span className="intro-loader__name inline-block whitespace-nowrap">
                    <span className={wordmark}>{name}</span>
                </span>

                <img
                    src={HERO.avatar}
                    alt=""
                    width={285}
                    height={800}
                    className="intro-loader__figure z-10 h-[2.2em] w-auto drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
                />
            </div>

            <div className="mt-[clamp(10px,1.6vw,20px)] flex items-start justify-between gap-6 text-[clamp(13px,1.1vw,14px)] tracking-[0.24em] text-accent-teal uppercase">
                {HERO.roles.map((role) => (
                    <span key={role}>{role}</span>
                ))}
            </div>
        </div>
    );
}
