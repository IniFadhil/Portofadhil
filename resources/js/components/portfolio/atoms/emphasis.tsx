type EmphasisProps = {
    /**
     * A sentence where `**these**` spans are lifted to strong sand and
     * `__these__` spans to the teal accent.
     */
    text: string;
    className?: string;
};

const MARKERS = [
    { pattern: /\*\*([^*]+)\*\*/g, className: 'font-semibold text-sand' },
    { pattern: /__([^_]+)__/g, className: 'font-medium text-accent-teal' },
];

/**
 * Renders the marked spans inside a sentence. The copy stays one readable string
 * in data/portfolio.ts; only the marked phrases get lifted out of the prose.
 */
export default function Emphasis({ text, className }: EmphasisProps) {
    return (
        <span className={className}>
            {MARKERS.reduce((parts, marker) => splitOn(parts, marker), [
                text,
            ] as (string | { text: string; className: string })[]).map(
                (part, index) =>
                    typeof part === 'string' ? (
                        part
                    ) : (
                        <span key={index} className={part.className}>
                            {part.text}
                        </span>
                    ),
            )}
        </span>
    );
}

function splitOn(
    parts: (string | { text: string; className: string })[],
    marker: { pattern: RegExp; className: string },
) {
    return parts.flatMap((part) => {
        if (typeof part !== 'string') {
            return [part];
        }

        const pieces: (string | { text: string; className: string })[] = [];
        let last = 0;

        for (const match of part.matchAll(marker.pattern)) {
            pieces.push(part.slice(last, match.index));
            pieces.push({ text: match[1], className: marker.className });
            last = match.index + match[0].length;
        }

        pieces.push(part.slice(last));

        return pieces;
    });
}
