[![Deploy to GitHub Pages](https://github.com/AreebMughal/AreebMughal.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/AreebMughal/AreebMughal.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Areeb Arshad — Portfolio

**[areebmughal.github.io](https://areebmughal.github.io)**

Personal portfolio of Areeb Arshad, a Senior Full-Stack Software Engineer with 6+ years
architecting scalable, secure systems for international clients — NestJS microservices,
database design, and HIPAA-compliant healthcare platforms.

The site covers my professional background, the projects I've built, my technical stack,
and a GitHub Activity section that pulls live contribution data on every deploy.

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 12 (static export) |
| UI | React 17, TypeScript |
| Styling | Tailwind CSS, SCSS modules |
| Animation | GSAP + ScrollTrigger, Typed.js, Vanilla Tilt |
| Hosting | GitHub Pages via GitHub Actions |

## Running locally

Requires Node.js 14+.

```bash
npm install
npm run dev          # http://localhost:3000
```

To produce the exact bundle that gets deployed:

```bash
npm run export       # -> ./out
```

## Project structure

```
.github/workflows/  # Build & deploy to GitHub Pages
components/
├── common/         # Header, Footer, Cursor, Button, Layout
└── home/           # Hero, About, Projects, Skills, Timeline, GitHub stats
data/               # Generated GitHub stats snapshot
pages/              # Next.js pages
public/             # Images, icons, fonts, résumé
scripts/            # Build-time data fetchers
styles/             # Global styles
constants.ts        # Site content — bio, projects, skills, timeline
```

Most content edits happen in `constants.ts`.

> **Note:** `MENULINKS` is read by array position (`MENULINKS[3]` in the timeline,
> `MENULINKS[5]` in the footer). If you add or reorder a nav entry, update those indices.

## GitHub Activity section

The contribution heatmap, streak tiles, language breakdown and activity feed are built
from real GitHub API data rather than embedded card images, so the section matches the
rest of the site's design.

`scripts/fetch-github-stats.mjs` queries the GraphQL and REST APIs and writes
`data/github-stats.json`, which `constants.ts` imports at build time. The deploy workflow
runs it before every build and on a daily cron, so the numbers stay current without
needing a commit.

Refresh it locally with a token that has `read:user`:

```bash
GITHUB_TOKEN=ghp_xxx npm run fetch:stats
```

Without a token the script logs a warning, exits cleanly, and the committed snapshot is
used — local builds never break.

**Private contributions:** the workflow's built-in `GITHUB_TOKEN` only sees public
activity. To include private contributions, create a personal access token with
`read:user` and add it as the repository secret `GH_STATS_TOKEN`; the workflow prefers it
when present.

Tuning knobs: `MAX_LANGUAGES` and `MAX_ACTIVITY` in the fetch script, `LEVEL_COLORS` and
the `tiles` array in `components/home/github-stats.tsx`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which fetches fresh stats, runs
`next build && next export`, and publishes `out/` to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Credits

Built on the [Folio](https://github.com/ayush-sharma/ayush-sharma-portfolio) template by
[Ayush Singh](https://ayushsingh.co.in/), used under the MIT License. The layout and
animation system originate there; the content, GitHub Activity section, and deployment
pipeline are my own.

## License

MIT — see [LICENSE](LICENSE). If you reuse this, please keep the credit to Ayush Singh for
the original template.
