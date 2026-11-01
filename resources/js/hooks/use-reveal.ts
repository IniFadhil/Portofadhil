import { useEffect, useRef, useState } from 'react';

/**
 * Flips `revealed` to true the first time the element scrolls into view, so a
 * block can fade in once and then stay put. Nothing is observed when the
 * visitor asks for reduced motion: the block is simply shown.
 */
export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setRevealed(true);

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setRevealed(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -12% 0px' },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return { ref, revealed };
}
