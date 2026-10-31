import { AUTH, HERO, PROFILE, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { cn } from '@/lib/utils';

type AuthHeroMockupProps = {
    locale: Locale;
    className?: string;
};

/**
 * The monochrome hero from the login reference: the portfolio home page in a
 * monitor, with the same page in a phone standing at its lower right. Pure CSS
 * and container query units, so it scales from a wide panel down to a phone
 * without a second layout, and it never ships a screenshot that can go stale.
 */
export default function AuthHeroMockup({
    locale,
    className,
}: AuthHeroMockupProps) {
    const copy = AUTH[locale];

    return (
        <figure className={cn('@container relative', className)}>
            <div className="absolute top-[88%] left-[14%] h-[5%] w-[66%] rounded-[50%] bg-black/50 blur-[1.4cqw]" />

            {/* Monitor */}
            <div className="relative z-10 w-[74%] rounded-[1cqw] border border-white/12 bg-[linear-gradient(160deg,#f4f4f4_0%,#d7d7d7_46%,#a9a9a9_100%)] px-[2%] pt-[2%] pb-[3.6%] shadow-[0_3cqw_5cqw_-1cqw_rgba(0,0,0,0.65)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.35cqw] bg-[#ededed] ring-1 ring-black/50">
                    <ScreenFace locale={locale} />
                </div>
                <span
                    aria-hidden
                    className="absolute top-[0.7cqw] left-1/2 size-[0.35cqw] -translate-x-1/2 rounded-full bg-black/25"
                />
            </div>

            <div
                aria-hidden
                className="relative z-10 mx-auto aspect-[13/6] w-[11%] bg-[linear-gradient(90deg,#8d8d8d_0%,#e8e8e8_46%,#8d8d8d_100%)]"
            />
            <div
                aria-hidden
                className="relative z-10 mx-auto aspect-[34/2.4] w-[30%] rounded-[0.3cqw] bg-[linear-gradient(180deg,#efefef_0%,#a4a4a4_100%)] shadow-[0_1cqw_1.6cqw_rgba(0,0,0,0.5)]"
            />

            {/* Phone, showing the same page */}
            <div className="absolute bottom-[2%] left-[68%] z-20 aspect-[9/19] w-[22%]">
                <div className="relative size-full rounded-[1.6cqw] border border-white/12 bg-[linear-gradient(150deg,#f4f4f4_0%,#cfcfcf_44%,#9a9a9a_100%)] p-[3%] shadow-[0_2.4cqw_3.6cqw_-0.8cqw_rgba(0,0,0,0.7)]">
                    <div className="relative size-full overflow-hidden rounded-[1.15cqw] bg-[#ededed] ring-1 ring-black/50">
                        <ScreenFace locale={locale} compact />
                    </div>
                    <span
                        aria-hidden
                        className="absolute top-[1.1cqw] left-1/2 h-[0.65cqw] w-[3cqw] -translate-x-1/2 rounded-full bg-black/75"
                    />
                </div>
            </div>

            <figcaption className="mt-5 font-mono text-[10.5px] tracking-[0.18em] text-white/55 uppercase">
                {copy.heroCaption}
            </figcaption>
        </figure>
    );
}

/** A tiny, greyscale stand-in for the portfolio home page. */
function ScreenFace({
    locale,
    compact = false,
}: {
    locale: Locale;
    compact?: boolean;
}) {
    const copy = UI[locale];

    return (
        <div
            aria-hidden
            className={cn(
                'flex size-full flex-col bg-[#ededed] text-[#2c2c2c]',
                compact ? 'gap-[6%] p-[9%]' : 'gap-[4%] p-[6%]',
            )}
        >
            <div className="flex items-baseline justify-between gap-[4%]">
                <span
                    className={cn(
                        'truncate font-display uppercase',
                        compact
                            ? 'text-[11cqw] leading-[0.9]'
                            : 'text-[7cqw] leading-[0.9]',
                    )}
                >
                    {HERO.wordmark[locale]}
                </span>
                {compact ? null : (
                    <span className="shrink-0 text-[1.7cqw] tracking-[0.14em] uppercase">
                        {PROFILE.name}
                    </span>
                )}
            </div>

            <span className="h-px w-full bg-black/25" />

            <div className="flex flex-wrap gap-x-[3%] gap-y-[1%] text-[1.5cqw] tracking-[0.16em] uppercase">
                {HERO.roles.map((role) => (
                    <span key={role}>{role}</span>
                ))}
            </div>

            <div
                className={cn(
                    'flex min-h-0 flex-1 gap-[4%]',
                    compact && 'flex-col',
                )}
            >
                <div className="flex min-w-0 flex-1 flex-col gap-[6%]">
                    <span className="h-[7%] w-[70%] bg-black/70" />
                    <span className="h-[5%] w-full bg-black/25" />
                    <span className="h-[5%] w-[86%] bg-black/25" />
                    <span className="h-[5%] w-[62%] bg-black/25" />
                    <span className="mt-auto h-[16%] w-[44%] bg-black/60" />
                </div>
                <div className="w-[30%] shrink-0 rounded-[0.4cqw] bg-[linear-gradient(160deg,#c9c9c9,#8f8f8f)]" />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-[4%] gap-y-[1%] text-[1.4cqw] tracking-[0.14em] uppercase">
                {SECTIONS_LABELS(locale).map((label) => (
                    <span key={label} className="text-black/45">
                        {label}
                    </span>
                ))}
                <span className="ml-auto text-black/30">{copy.status}</span>
            </div>
        </div>
    );
}

const SECTIONS_LABELS = (locale: Locale) => Object.values(UI[locale].nav);
