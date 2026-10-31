import PortfolioTemplate from '@/components/portfolio/templates/portfolio-template';
import { SEO } from '@/data/portfolio';
import { useLocale } from '@/hooks/use-locale';
import { Head } from '@inertiajs/react';

export default function Home() {
    const [locale, onLocaleChange] = useLocale();

    return (
        <>
            <Head>
                <title>{SEO.title[locale]}</title>
                <meta name="description" content={SEO.description[locale]} />
            </Head>
            <PortfolioTemplate
                locale={locale}
                onLocaleChange={onLocaleChange}
            />
        </>
    );
}
