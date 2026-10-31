import AppLogoIcon from '@/components/app-logo-icon';
import LanguageSwitch from '@/components/portfolio/molecules/language-switch';
import { AUTH, PROFILE, SECTIONS, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type AuthSidebarProps = {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};

/**
 * The gold panel from the login reference: logo on top, a numbered vertical
 * nav, then the workspace note. The nav points at the real sections of the
 * portfolio, so every row on it goes somewhere.
 */
export default function AuthSidebar({
    locale,
    onLocaleChange,
}: AuthSidebarProps) {
    const copy = AUTH[locale];

    return (
        <aside className="flex flex-col gap-10 gold-deck p-8 text-ink-950 xl:p-10">
            <a
                href="/"
                className="flex flex-col gap-3 focus-visible:ring-2 focus-visible:ring-ink-950 focus-visible:ring-offset-2 focus-visible:ring-offset-gold-400 focus-visible:outline-none"
            >
                <AppLogoIcon className="size-9 fill-current" />
                <span className="font-display text-[24px] leading-tight">
                    {PROFILE.name}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
                    {copy.brandLine}
                </span>
            </a>

            <nav aria-label={UI[locale].sections} className="min-h-0 flex-1">
                <ul className="flex flex-col">
                    {SECTIONS.map(({ id, hash }, index) => (
                        <li key={id}>
                            <a
                                href={`/${hash}`}
                                className="flex items-baseline gap-3 border-t border-ink-950/20 py-2.5 text-[13px] font-medium transition-colors hover:text-ink-950/70 focus-visible:ring-2 focus-visible:ring-ink-950 focus-visible:ring-offset-2 focus-visible:ring-offset-gold-400 focus-visible:outline-none"
                            >
                                <span
                                    aria-hidden
                                    className="font-mono text-[10px] tracking-[0.14em] text-ink-950/55 tabular-nums"
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {UI[locale].nav[id]}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex flex-col gap-3">
                <h2 className="font-display text-[19px] leading-tight">
                    {copy.panelTitle}
                </h2>
                <p className="text-[13px] leading-relaxed text-ink-950/75">
                    {copy.panelLead}
                </p>
                <ul className="flex flex-col gap-1.5">
                    {copy.points.map((point) => (
                        <li
                            key={point}
                            className="flex items-baseline gap-2 text-[12.5px] text-ink-950/75"
                        >
                            <span
                                aria-hidden
                                className="size-1.5 shrink-0 rounded-full bg-ink-950/60"
                            />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/20 pt-5">
                <LanguageSwitch
                    locale={locale}
                    label={UI[locale].language}
                    onChange={onLocaleChange}
                    tone="gold"
                />
                <a
                    href="/"
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase underline underline-offset-4 hover:no-underline"
                >
                    {copy.back}
                </a>
            </div>
        </aside>
    );
}
