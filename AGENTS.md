# Repository Guide

## Hard Boundaries

- Treat root `content/` as immutable editorial source material. Do not edit it or import it into the build; runtime copies live in `src/content/`.
- Preserve supplied wording and consult `content/editorial-notes.md` before changing personal claims, dates, services, pricing, or career history. Do not invent results, metrics, references, or biographical facts.
- `logo.svg` is the official logo. `SiteHeader.astro` imports it directly; do not replace it with a generated mark.
- Keep the blog file-based and local MDX. Do not add a CMS.
- Do not inspect Git history, branches, commits, `.git`, `/home/tongucwsl/Projects/erdogan.cloud-oldversion`, or online copies of older versions.

## Architecture

- This is one statically built Astro app, not a monorepo. English is unprefixed; Turkish routes are explicit files under `src/pages/tr/`.
- Localized counterparts are wired manually through each page's `alternatePath`, `SiteHeader.astro`, and `BaseLayout.astro` hreflang metadata. Update all three when adding or renaming a route.
- Fixed page content is Markdown under `src/content/site/{en,tr}`. Blog entries are MDX under `src/content/blog/{en,tr}` and must satisfy `src/content.config.ts`.
- Blog filenames must remain a single slug segment: routes use `[slug].astro`, not `[...slug].astro`. The locale folder and frontmatter `locale` must agree.
- The three English blog entries are deliberate dummy content; Turkish currently renders the empty state. Replace them rather than treating them as verified writing.
- RSS (`/rss.xml`, `/tr/rss.xml`) and sitemap output are generated from the content collection and `astro.config.mjs` site URL.
- Deploy is GitHub Actions → GHCR → Coolify. `Dockerfile` builds static `dist` to `nginx:alpine`; `docker-compose.yml` pulls `ghcr.io/erdoganbulut/erdogan.cloud:latest` with `Docker Compose` build pack. Push to `main` builds and pushes via `.github/workflows/deploy.yml` then triggers Coolify webhook (`COOLIFY_WEBHOOK` + `COOLIFY_TOKEN`).

## UI Stack

- shadcn uses Base UI with style `base-vega`; do not introduce Radix or run a Radix migration. Add components with `pnpm dlx shadcn@latest add <component>` and inspect the generated source.
- `MobileNav.tsx` is the only hydrated React island. Keep ordinary pages and blog rendering in Astro unless interaction requires a client component.
- The design is dark-only and monochrome. Global tokens, Geist fonts, prose rules, and responsive breakpoints live in `src/styles/globals.css`.
- Use the repo's `frontend-design` and `shadcn` skills for UI work; preserve the current restrained documentation-style visual language.

## Commands

- Required toolchain: Node `>=22.12.0`, pnpm `10.30.3`; keep `pnpm-lock.yaml` authoritative.
- Install: `pnpm install`
- Development: `pnpm dev`
- Background server: `pnpm astro dev --background`; manage it with `pnpm astro dev status`, `pnpm astro dev logs`, and `pnpm astro dev stop`.
- Verification order: `pnpm check` then `pnpm build`.
- Production preview: run `pnpm build`, then `pnpm astro preview --background`; stop it with `pnpm astro preview stop`.
- No test, lint, formatter, CI, or focused-test command is configured. Do not report those as run.

## Visual Verification

- For UI changes, check at least a 390px mobile viewport and a 1440px desktop viewport, including the mobile Sheet, both locale links, console output, and one blog post.
- Confirm `/rss.xml`, `/tr/rss.xml`, `/robots.txt`, `/favicon.svg`, and `/sitemap-index.xml` still return `200` after the final production build.
