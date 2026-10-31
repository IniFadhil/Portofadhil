---
paths:
    - 'resources/js/components/portfolio/templates/**'
---

# Templates

## Mount the intro overlay once per tab from the template, never from a section

molecules/intro-loader.tsx is an overlay rendered by templates/portfolio-template.tsx on top of the live layout. It is gated on sessionStorage ('portfolio-intro-played') and skipped entirely when useReducedMotion() is true, so it never blocks a return visit or a reduced-motion visitor. The layout behind it gets inert while it is up. Do not mount it inside a section, and do not add copy to it outside resources/js/data/portfolio.ts.
