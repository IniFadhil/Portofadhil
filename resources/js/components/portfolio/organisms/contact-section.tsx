import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import { CONTACT, HERO, PROFILE, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useClipboard } from '@/hooks/use-clipboard';
import { Copy, Mail } from 'lucide-react';

type ContactSectionProps = {
    locale: Locale;
};

type ContactRow = {
    label: string;
    value: string;
    href: string | null;
    external?: boolean;
};

export default function ContactSection({ locale }: ContactSectionProps) {
    const copy = UI[locale];
    const [copied, copyToClipboard] = useClipboard();

    const rows: ContactRow[] = [
        {
            label: CONTACT.labels.email[locale],
            value: PROFILE.email,
            href: CONTACT.mailto[locale],
        },
        {
            label: CONTACT.labels.phone[locale],
            value: PROFILE.phone,
            href: PROFILE.phoneHref,
        },
        {
            label: CONTACT.labels.location[locale],
            value: HERO.location[locale],
            href: null,
        },
        {
            label: CONTACT.labels.github[locale],
            value: PROFILE.githubHandle,
            href: PROFILE.github,
            external: true,
        },
    ];

    return (
        <Section id="kontak" tone="tint" divider={false}>
            <div className="mb-10">
                <SectionHeading
                    kicker={CONTACT.kicker[locale]}
                    title={CONTACT.title[locale]}
                />
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-muted sm:text-sm">
                    {CONTACT.lead[locale]}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-deck-700/80 pt-8 md:grid-cols-2 lg:gap-12">
                <dl className="space-y-6">
                    {rows.map((row) => (
                        <div key={row.label}>
                            <dt className="block text-[11px] font-bold tracking-wider text-slate-muted uppercase">
                                {row.label}
                            </dt>
                            <dd className="text-base font-bold text-accent-teal select-all sm:text-lg">
                                {row.href ? (
                                    <a
                                        href={row.href}
                                        {...(row.external
                                            ? {
                                                  target: '_blank',
                                                  rel: 'noopener noreferrer',
                                              }
                                            : {})}
                                        className="break-all transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none"
                                    >
                                        {row.value}
                                    </a>
                                ) : (
                                    <span className="text-base font-normal text-sand">
                                        {row.value}
                                    </span>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="flex flex-col justify-center gap-4 rounded-3xl border border-deck-700/70 bg-deck-900/80 p-7 shadow-xl sm:p-8">
                    <h3 className="text-xl font-bold text-sand">
                        {CONTACT.boxTitle[locale]}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-muted">
                        {CONTACT.boxLead[locale]}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                        <a
                            href={CONTACT.mailto[locale]}
                            className="inline-flex items-center gap-2 rounded-xl bg-accent-teal px-6 py-3 text-xs font-bold text-[#0a1618] shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-colors hover:bg-accent-mint sm:text-sm"
                        >
                            <Mail className="size-4" aria-hidden />
                            {copy.contact}
                        </a>

                        <button
                            type="button"
                            onClick={() => void copyToClipboard(PROFILE.email)}
                            className="inline-flex items-center gap-2 rounded-xl border border-deck-700 bg-deck-850 px-5 py-3 text-xs font-semibold text-sand transition-colors hover:bg-deck-800 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none sm:text-sm"
                        >
                            <Copy
                                className="size-4 text-accent-teal"
                                aria-hidden
                            />
                            {copied === PROFILE.email
                                ? copy.copiedEmail
                                : copy.copyEmail}
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
