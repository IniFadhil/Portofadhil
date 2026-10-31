import Reveal from '@/components/portfolio/atoms/reveal';
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
        <Section id="kontak" tone="tint">
            <SectionHeading
                title={CONTACT.title[locale]}
                lead={CONTACT.lead[locale]}
            />

            <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
                <Reveal delay={80}>
                    <dl className="space-y-7">
                        {rows.map((row) => (
                            <div key={row.label}>
                                <dt className="text-base text-slate-muted">
                                    {row.label}
                                </dt>
                                <dd className="mt-1 text-xl font-semibold break-all text-accent-teal select-all">
                                    {row.href ? (
                                        <a
                                            href={row.href}
                                            {...(row.external
                                                ? {
                                                      target: '_blank',
                                                      rel: 'noopener noreferrer',
                                                  }
                                                : {})}
                                            className="transition-colors hover:text-accent-mint focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none"
                                        >
                                            {row.value}
                                        </a>
                                    ) : (
                                        <span className="font-normal text-sand">
                                            {row.value}
                                        </span>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>

                <Reveal delay={140}>
                    <div className="bg-deck-850 p-8 sm:p-10">
                        <h3 className="font-display text-2xl font-bold text-sand">
                            {CONTACT.boxTitle[locale]}
                        </h3>
                        <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-slate-muted">
                            {CONTACT.boxLead[locale]}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href={CONTACT.mailto[locale]}
                                className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-6 py-3 text-base font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                            >
                                <Mail className="size-4" aria-hidden />
                                {copy.contact}
                            </a>

                            <button
                                type="button"
                                onClick={() =>
                                    void copyToClipboard(PROFILE.email)
                                }
                                className="inline-flex items-center gap-2 rounded-full bg-deck-700 px-5 py-3 text-base font-semibold text-sand transition-colors hover:bg-deck-800 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none"
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
                </Reveal>
            </div>
        </Section>
    );
}
