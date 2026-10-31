import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { Locale } from '@/data/portfolio';

const STORAGE_KEY = 'portfolio-locale';

const DEFAULT_LOCALE: Locale = 'id';

function isLocale(value: string | null): value is Locale {
    return value === 'id' || value === 'en';
}

/**
 * One locale for the whole page. The auth layout and the page inside it both
 * read this, so the language switch keeps them in step.
 */
const listeners = new Set<() => void>();

let current: Locale = DEFAULT_LOCALE;

function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

function setLocale(next: Locale): void {
    if (next === current) {
        return;
    }

    current = next;
    window.localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
}

export function useLocale(): [Locale, (locale: Locale) => void] {
    const locale = useSyncExternalStore(
        subscribe,
        () => current,
        () => DEFAULT_LOCALE,
    );

    // Read the saved choice after hydration so server and client markup match.
    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (isLocale(stored)) {
            setLocale(stored);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const changeLocale = useCallback((next: Locale) => setLocale(next), []);

    return [locale, changeLocale];
}
