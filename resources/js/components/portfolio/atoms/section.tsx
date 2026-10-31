import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
    id?: string;
    /** `tint` steps the band up one tone off the deck, for alternating rows. */
    tone?: 'plain' | 'tint';
    className?: string;
    children: ReactNode;
};

/**
 * One band of the page. The band is full bleed, its fill is the only thing that
 * separates it from its neighbour, and the content inside is held to the same
 * 1280px column on every band.
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
                'relative w-full scroll-mt-24 py-24 md:py-36',
                tone === 'tint' && 'bg-deck-900',
                className,
            )}
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                {children}
            </div>
        </section>
    );
}
