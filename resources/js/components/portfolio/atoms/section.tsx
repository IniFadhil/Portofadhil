import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
    id?: string;
    /** `tint` lifts the band a shade off the deck, for alternating rows. */
    tone?: 'plain' | 'tint';
    className?: string;
    children: ReactNode;
};

/**
 * One band of the page. The band is full bleed, its fill is what separates it
 * from its neighbour, and the content inside is held to the same 1280px column
 * on every band.
 */
export default function Section({
    id,
    tone = 'plain',
    className,
    children,
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                'relative w-full scroll-mt-24 py-24 md:py-32',
                tone === 'tint' && 'bg-[#0c1a1d]/40',
                className,
            )}
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
        </section>
    );
}
