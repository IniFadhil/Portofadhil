import ProjectMockup from '@/components/portfolio/molecules/project-mockup';
import { CATEGORY_LABELS, UI } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

type ProjectShowcaseProps = {
    project: Project;
    locale: Locale;
};

const LINK =
    'inline-flex items-center gap-1.5 text-base font-semibold text-sand transition-colors hover:text-accent-teal';

/**
 * One project: the details on the left, its picture on the right. Everything the
 * project does not have is simply left out.
 */
export default function ProjectShowcase({
    project,
    locale,
}: ProjectShowcaseProps) {
    const copy = UI[locale];

    return (
        <article className="grid grid-cols-1 items-center gap-10 bg-deck-900 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
                <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-sand">
                    {project.title}
                </h3>

                <p className="mt-2 text-base text-slate-muted">
                    {CATEGORY_LABELS[project.category][locale]}
                    {project.period ? ` · ${project.period[locale]}` : null}
                </p>

                <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-slate-muted">
                    {project.description[locale]}
                </p>

                {project.technologies.length > 0 ? (
                    <p className="mt-5 text-base text-sand/80">
                        {project.technologies.join(' · ')}
                    </p>
                ) : null}

                <div className="mt-7 flex flex-wrap items-center gap-4">
                    {project.demoUrl ? (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-5 py-2.5 text-base font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                        >
                            <span>{copy.liveDemo}</span>
                            <ExternalLink className="size-4" aria-hidden />
                        </a>
                    ) : null}

                    {project.repositoryUrl ? (
                        <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={LINK}
                        >
                            <Github className="size-4" aria-hidden />
                            {copy.sourceCode}
                            <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                    ) : null}
                </div>
            </div>

            <div className="lg:col-span-7">
                <ProjectMockup project={project} locale={locale} />
            </div>
        </article>
    );
}
