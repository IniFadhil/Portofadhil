import { useEffect, useState } from 'react';

/**
 * Tracks which of the given element ids currently sits in the middle of the
 * viewport, so the mobile nav can highlight the section being read.
 */
export function useActiveSection(ids: readonly string[]): string {
    const [active, setActive] = useState(ids[0] ?? '');

    useEffect(() => {
        const targets = ids
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null);

        if (targets.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );

                if (visible[0]) {
                    setActive(visible[0].target.id);
                }
            },
            { rootMargin: '-45% 0px -45% 0px' },
        );

        targets.forEach((target) => observer.observe(target));

        return () => observer.disconnect();
    }, [ids]);

    return active;
}
