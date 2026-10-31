import { CATEGORY_LABELS } from '@/data/portfolio';
import type { Locale, Project } from '@/data/portfolio';

type ProjectMockupProps = {
    project: Project;
    locale: Locale;
};

/**
 * The project's picture. A real screenshot when one exists; otherwise a title
 * card set in type, because a fake dashboard drawn from grey bars is worse than
 * no picture at all.
 */
export default function ProjectMockup({ project, locale }: ProjectMockupProps) {
    if (project.image) {
        return (
            <figure className="aspect-[16/10] w-full overflow-hidden bg-deck-800">
                <img
                    src={project.image}
                    alt={`${project.title} - ${CATEGORY_LABELS[project.category][locale]}`}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-top"
                />
            </figure>
        );
    }

    return (
        <div
            aria-hidden
            className="flex aspect-[16/10] w-full flex-col justify-end bg-deck-800 p-8"
        >
            <span className="font-display text-4xl leading-[0.95] font-bold tracking-[-0.03em] text-sand">
                {project.title}
            </span>
            <span className="mt-2 text-base text-slate-muted">
                {CATEGORY_LABELS[project.category][locale]}
            </span>
        </div>
    );
}
