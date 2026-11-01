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
        {
            label: CONTACT.labels.linkedin[locale],
            value: PROFILE.linkedinHandle,
            href: PROFILE.linkedin,
            external: true,
        },
        {
            label: CONTACT.labels.instagram[locale],
            value: PROFILE.instagramHandle,
            href: PROFILE.instagram,
            external: true,
        },
    ];

    return (
        <Section id="kontak" tone="tint">
            <div className="mb-10">
                <SectionHeading title={CONTACT.title[locale]} />
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-muted">
                    {CONTACT.lead[locale]}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                <dl className="space-y-6">
                    {rows.map((row) => (
                        <div key={row.label}>
                            <dt className="block text-sm font-bold text-slate-muted">
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

                <div className="flex flex-col justify-center gap-4 rounded-3xl bg-deck-900 p-7 sm:p-8">
                    <h3 className="text-xl font-bold text-sand">
                        {CONTACT.boxTitle[locale]}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-muted">
                        {CONTACT.boxLead[locale]}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                        <a
                            href={CONTACT.mailto[locale]}
                            className="inline-flex items-center gap-2 rounded-xl bg-accent-teal px-6 py-3 text-sm font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                        >
                            <Mail className="size-4" aria-hidden />
                            {copy.contact}
                        </a>

                        <button
                            type="button"
                            onClick={() => void copyToClipboard(PROFILE.email)}
                            className="inline-flex items-center gap-2 rounded-xl bg-deck-800 px-5 py-3 text-sm font-semibold text-sand transition-colors hover:bg-deck-700 focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deck-950 focus-visible:outline-none"
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
