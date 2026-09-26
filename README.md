# web-frontend

Public marketing website for **Top Pristine Luxury Craft** — React + Vite + Tailwind CSS,
consuming `common-backend`'s REST API for CMS content and inquiry/quote submissions.

## Pages
- `/` — Home / landing page
- `/about-us` — About Us (content editable via admin CMS)
- `/inquiries-and-quote` — Instant quote calculator + general inquiry form
- `/contact-us` — Contact form

## Getting started

```bash
cp .env.example .env
npm install
npm run dev      # http://localhost:5173
```

`VITE_API_BASE_URL` must point at a running `common-backend` instance.

## Build & preview

```bash
npm run build
npm run preview
```

## Deployment

Static build output (`dist/`) is deployed to an Amazon S3 bucket behind CloudFront.
See `/.github/workflows/web-frontend.yml` at the repo root for the CI/CD pipeline —
it builds on every push to `main` and syncs `dist/` to S3 + invalidates CloudFront,
using placeholder secret names that must be configured in GitHub before deploying.
