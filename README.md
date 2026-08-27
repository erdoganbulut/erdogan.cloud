# erdogan.cloud

Personal website built with Astro, local MDX content collections, Tailwind CSS
and shadcn/ui components on Base UI.

## Deployment

Push to `main` → GitHub Actions builds `Dockerfile` and pushes to `ghcr.io/erdoganbulut/erdogan.cloud:latest` → Coolify pulls via `docker-compose.yml` (`Docker Compose` build pack, port `80`, `nginx:alpine`).

## Commands

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

The root `content/` directory is an immutable editorial source. Runtime site
content lives under `src/content/`.
