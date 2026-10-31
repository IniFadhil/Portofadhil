---
paths:
    - 'resources/js/components/portfolio/**'
    - 'resources/js/data/portfolio.ts'
---

# Portfolio

## Atomic design for the portfolio UI

Portfolio UI lives under resources/js/components/portfolio, layered atomic-design style:

- atoms/ : primitives with no portfolio-specific knowledge (container, section, section-heading, reveal).
- molecules/: small compositions of atoms (site-header, site-footer, mobile-header, bottom-nav, language-switch, project-stack-card, skill-group, timeline-item).
- organisms/: full page sections, one per file. Laptop: hero-section, works-section, capabilities-section, journey-section, about-section, contact-section. Phone: mobile-hero-section, mobile-works-section, mobile-capabilities-section, mobile-journey-section, mobile-about-section, mobile-contact-section.
- templates/: page-level composition (portfolio-template, desktop-template, mobile-template).

Pages in resources/js/pages only render a template plus <Head>. Import through the @/ alias, never relative ../ paths.

## Two layouts, one viewport

templates/portfolio-template.tsx picks the layout from useIsDesktop() (@/hooks/use-mobile). Laptop is >= 1024px, phone below. Only one layout is mounted at a time.

- Every section exists twice, as a _-section and mobile-_-section pair. A change to a section is a change to both files.
- Keep the Section id values identical in both (top, works, capabilities, journey, about, contact). The laptop header and the phone bottom tab bar link to those anchors.

## Copy and data

resources/js/data/portfolio.ts is the single source of all copy and project data, in both languages. Never hardcode user-visible text in a component.

## Horizontal scroll containers

An absolutely positioned element inside a horizontally scrolled box needs a positioned ancestor inside that box. Without it the sr-only utility escapes the clipping and the whole document scrolls sideways. The phone works carousel keeps relative on the scroll container for this reason. Keep the same in any new scroll region.
