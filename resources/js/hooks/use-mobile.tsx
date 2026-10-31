import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

/** Below this width the site renders the phone layout instead of the laptop one. */
const DESKTOP_BREAKPOINT = 1024;

const mobileQuery =
    typeof window === 'undefined'
        ? undefined
        : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

const desktopQuery =
    typeof window === 'undefined'
        ? undefined
        : window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

function subscribeTo(query: MediaQueryList | undefined) {
    return (callback: (event: MediaQueryListEvent) => void) => {
        if (!query) {
            return () => {};
        }

        query.addEventListener('change', callback);

        return () => {
            query.removeEventListener('change', callback);
        };
    };
}

function getServerSnapshot(): boolean {
    return false;
}

export function useIsMobile(): boolean {
    return useSyncExternalStore(
        subscribeTo(mobileQuery),
        () => mobileQuery?.matches ?? false,
        getServerSnapshot,
    );
}

/**
 * Drives the laptop vs phone layout split. Assumes laptop on the server so the
 * first paint matches what most visitors see.
 */
export function useIsDesktop(): boolean {
    return useSyncExternalStore(
        subscribeTo(desktopQuery),
        () => desktopQuery?.matches ?? false,
        () => true,
    );
}
