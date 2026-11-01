import LanguageSwitch from '@/components/portfolio/molecules/language-switch';
import { PROFILE, SECTIONS, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

const SECTION_IDS = SECTIONS.map(({ id }) => id);

type SiteHeaderProps = {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};

const LINK = 'transition-colors hover:text-accent-teal';

/**
 * The sticky top bar: identity and the availability badge, the section links,
 * the language toggle and the CV action.
 *
 * The section links only appear once there is room for all seven; below that a
 * scroll strip under the bar keeps every anchor reachable on a phone.
 */
export default function SiteHeader({
    locale,
    onLocaleChange,
}: SiteHeaderProps) {
    const copy = UI[locale];
    const active = useActiveSection(SECTION_IDS);

    return (
        <header className="sticky top-0 z-40 w-full bg-deck-950">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                <a
                    href="#hero"
                    className="group flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
                >
                    <span className="text-base font-bold tracking-tight whitespace-nowrap text-sand transition-colors group-hover:text-accent-teal sm:text-lg">
                        {PROFILE.name}
                    </span>

                    <span className="hidden w-fit shrink-0 items-center gap-1.5 rounded-full bg-deck-900 px-2.5 py-0.5 sm:flex">
                        <span
                            aria-hidden
                            className="size-2 status-pulse rounded-full bg-accent-teal"
                        />
                        <span className="text-[13px] font-semibold text-accent-mint">
                            {copy.status}
                        </span>
                    </span>
                </a>

                <nav
                    aria-label={copy.sections}
                    className="hidden items-center gap-7 text-[15px] font-medium text-slate-muted xl:flex"
                >
                    {SECTIONS.map(({ id, hash }) => (
                        <a
                            key={id}
                            href={hash}
                            aria-current={active === id ? 'true' : undefined}
                            className={cn(
                                LINK,
                                active === id && 'text-accent-teal',
                            )}
                        >
                            {copy.nav[id]}
                        </a>
                    ))}
                </nav>

                <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden sm:block">
                        <LanguageSwitch
                            locale={locale}
                            label={copy.language}
                            onChange={onLocaleChange}
                        />
                    </div>

                    <a
                        href={PROFILE.cv}
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-accent-teal px-4 py-2 text-sm font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                    >
                        <span>{copy.downloadCv}</span>
                        <Download className="size-4" aria-hidden />
                    </a>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-5 pb-3 sm:px-8 xl:hidden">
                <nav
                    aria-label={copy.sections}
                    className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm font-semibold text-slate-muted"
                >
                    {SECTIONS.map(({ id, hash }) => (
                        <a
                            key={id}
                            href={hash}
                            aria-current={active === id ? 'true' : undefined}
                            className={cn(
                                LINK,
                                active === id && 'text-accent-teal',
                            )}
                        >
                            {copy.nav[id]}
                        </a>
                    ))}
                </nav>

                <div className="sm:hidden">
                    <LanguageSwitch
                        locale={locale}
                        label={copy.language}
                        onChange={onLocaleChange}
                    />
                </div>
            </div>
        </header>
    );
}
