import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type RevealProps = {
    /** Stagger between sibling blocks, in milliseconds. */
    delay?: number;
    className?: string;
    children: ReactNode;
};

/**
 * Rises 24px and fades in once, the first time the block enters the viewport.
 * Transform and opacity only, and the content is in the DOM from the start.
 */
export default function Reveal({
    delay = 0,
    className,
    children,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -12% 0px' },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={cn(
                'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
                shown
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
                className,
            )}
        >
            {children}
        </div>
    );
}
