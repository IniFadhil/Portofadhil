import { LOCALE_LABELS, LOCALES } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { cn } from '@/lib/utils';

type LanguageSwitchProps = {
    locale: Locale;
    label: string;
    onChange: (locale: Locale) => void;
    /** `deck` on the portfolio, `gold` on the auth sidebar. */
    tone?: 'deck' | 'gold';
};

const TONES = {
    deck: {
        group: 'bg-deck-900',
        active: 'bg-[#0a1618] text-accent-teal',
        idle: 'text-slate-muted hover:text-sand',
        focus: 'focus-visible:ring-accent-teal focus-visible:ring-offset-deck-950',
    },
    gold: {
        group: 'bg-transparent border-ink-950/25',
        active: 'bg-ink-950 text-gold-300 font-bold',
        idle: 'text-ink-950/60 hover:text-ink-950',
        focus: 'focus-visible:ring-ink-950 focus-visible:ring-offset-gold-400',
    },
} as const;

export default function LanguageSwitch({
    locale,
    label,
    onChange,
    tone = 'deck',
}: LanguageSwitchProps) {
    const colors = TONES[tone];

    return (
        <div
            role="group"
            aria-label={label}
            className={cn(
                'flex items-center rounded-lg p-1 text-sm font-semibold',
                colors.group,
            )}
        >
            {LOCALES.map((value) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => onChange(value)}
                    aria-pressed={locale === value}
                    className={cn(
                        'inline-flex min-h-8 items-center justify-center rounded px-2.5 py-1 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                        colors.focus,
                        locale === value ? colors.active : colors.idle,
                    )}
                >
                    {LOCALE_LABELS[value]}
                </button>
            ))}
        </div>
    );
}
