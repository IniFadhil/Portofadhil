import ProjectMockup from '@/components/portfolio/molecules/project-mockup';
import { CATEGORY_LABELS, UI } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

type ProjectShowcaseProps = {
    project: Project;
    number: string;
    locale: Locale;
};

const LINK =
    'inline-flex items-center gap-1.5 text-xs font-semibold text-sand transition-colors hover:text-accent-teal';

/**
 * One project as the featured card: the details on the left, the device pair on
 * the right. Everything the project does not have is simply left out.
 */
export default function ProjectShowcase({
    project,
    number,
    locale,
}: ProjectShowcaseProps) {
    const copy = UI[locale];

    const links = [
        { href: project.repositoryUrl, label: copy.sourceCode, Icon: Github },
    ].filter(
        (link): link is { href: string; label: string; Icon: typeof Github } =>
            Boolean(link.href),
    );

    return (
        <article className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl glass-card p-6 sm:p-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded border border-accent-teal/20 bg-accent-teal/10 px-2 py-0.5 font-mono text-xs font-bold text-accent-teal">
                        #{number}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-slate-muted uppercase">
                        {CATEGORY_LABELS[project.category][locale]}
                        {project.period ? ` • ${project.period[locale]}` : null}
                    </span>
                </div>

                <h3 className="text-2xl font-extrabold text-sand sm:text-3xl">
                    {project.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-muted sm:text-sm">
                    {project.description[locale]}
                </p>

                {project.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={tech}
                                className={
                                    index === 0
                                        ? 'rounded-md border border-accent-teal/30 bg-deck-850 px-3 py-1 text-xs font-medium text-accent-teal'
                                        : 'rounded-md border border-deck-700/60 bg-deck-850 px-3 py-1 text-xs text-sand'
                                }
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.demoUrl ? (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-accent-teal px-5 py-2.5 text-xs font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                        >
                            <span>{copy.liveDemo}</span>
                            <ExternalLink className="size-3.5" aria-hidden />
                        </a>
                    ) : null}

                    {links.map(({ href, label, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={LINK}
                        >
                            <Icon className="size-3.5" aria-hidden />
                            {label}
                            <ArrowUpRight className="size-3.5" aria-hidden />
                        </a>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-7">
                <ProjectMockup
                    project={project}
                    locale={locale}
                    noPreview={copy.noPreview}
                />
            </div>
        </article>
    );
}
