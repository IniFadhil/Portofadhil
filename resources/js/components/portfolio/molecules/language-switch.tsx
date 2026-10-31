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
        active: 'bg-deck-700 text-sand',
        idle: 'text-slate-muted hover:text-sand',
        focus: 'focus-visible:ring-accent-teal',
    },
    gold: {
        group: 'bg-ink-950/10',
        active: 'bg-ink-950 text-gold-300',
        idle: 'text-ink-950/60 hover:text-ink-950',
        focus: 'focus-visible:ring-ink-950',
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
                'flex items-center gap-1 rounded-full p-1 text-base font-semibold',
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
                        'inline-flex min-h-8 items-center justify-center rounded-full px-3 py-1 transition-colors focus-visible:ring-2 focus-visible:outline-none',
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
