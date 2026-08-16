[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# My Portfolio

Welcome to my portfolio website! This is a modern, beautifully designed platform to showcase my professional work, projects, and experience.

**Live at [areebmughal.github.io](https://areebmughal.github.io)**

Here you'll find:

- 💼 My professional background and experience
- 🚀 Projects I've built and contributed to
- 🎯 My skills and technical expertise
- 📊 Live GitHub contribution stats, refreshed on every deploy
- 📱 A glimpse into my professional journey

## Tech Stack

- **Framework:** Next.js 12 (static export)
- **UI Library:** React 17
- **Styling:** Tailwind CSS, SCSS
- **Animations:** GSAP, Vanilla Tilt, Typed.js
- **Language:** TypeScript
- **Build Tool:** PostCSS, Autoprefixer
- **Hosting:** GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 14+ and npm/yarn installed

### Installation & Running Locally

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

To produce the exact static bundle that gets deployed:

```bash
npm run export     # -> ./out
```

## Project Structure

```
.github/workflows/ # GitHub Pages build & deploy
components/
├── common/        # Reusable components (Button, Header, Footer, etc.)
└── home/          # Home page sections (Hero, About, Projects, GitHub stats, etc.)
data/              # Generated GitHub stats snapshot
pages/             # Next.js pages
public/            # Static assets (images, fonts)
scripts/           # Build-time data fetchers
styles/            # Global styles
```

## GitHub Stats Section

The **GitHub Activity** section (contribution heatmap, streak tiles, language
breakdown and recent activity) is real data, not an embedded image.

`scripts/fetch-github-stats.mjs` queries the GitHub GraphQL and REST APIs and
writes `data/github-stats.json`, which `constants.ts` imports at build time. The
workflow runs it before every build and on a daily cron, so the site stays
current without needing a commit.

Refresh it locally with a token that has `read:user`:

```bash
GITHUB_TOKEN=ghp_xxx npm run fetch:stats
```

Without a token the script logs a warning, exits cleanly, and the committed
snapshot is used — local builds never break.

**Private contributions:** the workflow's built-in `GITHUB_TOKEN` only sees
public activity. To include private contributions, create a personal access
token with `read:user` and add it as the repository secret `GH_STATS_TOKEN`; the
workflow prefers it when present.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which fetches fresh
stats, runs `next build && next export`, and publishes `out/` to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

## Customization

- Edit component files in the `components/` folder to customize sections
- Modify colors and styling in `tailwind.config.js` and SCSS modules
- Update content in component files with your own information
- Replace images in the `public/` folder with your own assets

## Credits

This portfolio is based on the [Folio](https://github.com/ayush-sharma/ayush-sharma-portfolio) template by [Ayush Singh](https://ayushsingh.co.in/).

**Original Project:** [github.com/ayush-sharma/ayush-sharma-portfolio](https://github.com/ayush-sharma/ayush-sharma-portfolio)

The original project demonstrates excellent UI/UX design principles and advanced animation techniques. Visit the original repository to see the portfolio that inspired this fork.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Note:** Please remember to credit the original author (Ayush Singh) if you fork or re-share this template. Happy coding! 🚀
