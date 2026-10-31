import AuthHeroMockup from '@/layouts/auth/auth-hero-mockup';
import AuthSidebar from '@/layouts/auth/auth-sidebar';
import LanguageSwitch from '@/components/portfolio/molecules/language-switch';
import { AUTH, UI } from '@/data/portfolio';
import { useLocale } from '@/hooks/use-locale';
import type { AuthLayoutProps } from '@/types';
import type { ReactNode } from 'react';

type AuthSimpleLayoutProps = AuthLayoutProps & {
    /** The sign in card, so it can live inside the teal deck panel. */
    children: ReactNode;
};

/**
 * The login reference composition: a gold sidebar, a monochrome hero on the
 * teal deck, and the form on a light panel. The teal and the gold are the same
 * tokens the portfolio uses, so only the balance changes here.
 */
export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthSimpleLayoutProps) {
    const [locale, onLocaleChange] = useLocale();
    const copy = AUTH[locale];

    return (
        <div className="min-h-dvh paper-page font-ui text-ink-950 antialiased xl:grid xl:grid-cols-[21rem_minmax(0,1fr)]">
            <div className="hidden xl:block">
                <AuthSidebar locale={locale} onLocaleChange={onLocaleChange} />
            </div>

            <div className="flex min-h-dvh flex-col deck-page px-[clamp(20px,5vw,56px)] py-[clamp(24px,4vw,48px)] text-mist-100">
                {/* The gold panel collapses to a bar on tablet and phone. */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[10px] gold-deck px-5 py-4 text-ink-950 xl:hidden">
                    <a href="/" className="min-w-0">
                        <span className="block truncate font-display text-[19px] leading-tight">
                            {AUTH[locale].formTitle}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.16em] uppercase">
                            {copy.brandLine}
                        </span>
                    </a>
                    <div className="flex flex-wrap items-center gap-4">
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
                </div>

                <div className="mx-auto grid w-full max-w-[1120px] flex-1 items-center gap-[clamp(32px,4vw,56px)] py-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
                    <div className="order-2 min-w-0 lg:order-1">
                        <p className="text-[11px] font-semibold tracking-[0.24em] text-jade-300 uppercase">
                            {copy.eyebrow}
                        </p>
                        <h1 className="mt-4 font-display text-[clamp(34px,4.4vw,58px)] leading-[0.95] text-mist-100">
                            {copy.welcome}
                        </h1>
                        <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-mist-300">
                            {copy.lead}
                        </p>

                        <AuthHeroMockup
                            locale={locale}
                            className="mt-10 w-full max-w-[620px]"
                        />
                    </div>

                    <div className="order-1 w-full lg:order-2">
                        <div className="rounded-[10px] border border-ink-950/10 auth-surface p-6 shadow-[0_24px_60px_-24px_rgba(3,22,28,0.7)] sm:p-8">
                            <div className="flex flex-col gap-1">
                                <h2 className="font-display text-[20px] leading-tight">
                                    {title ?? copy.formTitle}
                                </h2>
                                <p className="text-[13px] text-muted-foreground">
                                    {description ?? copy.formLead}
                                </p>
                            </div>

                            <div className="mt-6">{children}</div>
                        </div>

                        <p className="mt-4 text-center text-[12px] text-mist-400">
                            {copy.secureNote}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
