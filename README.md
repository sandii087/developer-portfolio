# Sandeep Yadav — Developer Portfolio

A responsive, accessible personal portfolio centered on backend and full-stack development. The attached resume is the primary factual source; public GitHub repositories provide implementation detail. See `docs/source-audit.md` for evidence, selection decisions, and discrepancies.

## Requirements and local development

Node.js 20 or newer. There are no runtime or build dependencies to install.

```sh
npm run dev
```

Open `http://localhost:4173`. Source and public-asset changes rebuild automatically; refresh the browser after changes. Stop with Ctrl+C. To use a different port, set the `PORT` environment variable. The development server binds only to the local machine.

## Production build

```sh
npm test
npm run build
npm start
```

`dist/` is the complete deployable website. `npm start` builds and serves it at `http://localhost:4173`. A generated production build is also included in the downloadable archive.

For canonical URLs, social sharing metadata, and a sitemap, set `SITE_URL` to the final public HTTPS address before building. The variable is optional for local development. On macOS/Linux:

```sh
export SITE_URL=https://sandii087.github.io
npm run build
```

Use that address only if deliberately replacing the existing analytics portfolio. For a GitHub project site, include its repository path in `SITE_URL`. In PowerShell, use `$env:SITE_URL = 'https://sandii087.github.io'` before building.

## Deployment

This is a static site: upload **the contents of `dist/`**, including `assets/`, to any static host. No server functions, database, API keys, or environment secrets are required.

- **Netlify / Cloudflare Pages:** choose the Git repository, use `npm run build` as the build command, and `dist` as the output directory. Set Node to 20+ and `SITE_URL` to the chosen public URL.
- **GitHub Pages:** publish the contents of `dist/` using your Pages workflow or deployment branch. Asset URLs are relative, so both user sites and project subpaths work. The 404 page uses the deployment subpath supplied by `SITE_URL`. A ready-to-run workflow is included at `.github/workflows/deploy-pages.yml`; select GitHub Actions in the repository’s Pages settings.
- **Other static hosting:** upload `dist/` intact. Keep the PDF and image assets in the `assets` directory.

An owner-private Sites preview is created separately. Making it public or connecting a custom domain requires an explicit final hosting choice. Do not share the private preview with recruiters as though it were public.

Recommended host configuration: enable HTTPS; use a short cache lifetime for HTML and a moderate lifetime for the unhashed CSS/JS files. No service worker or tracking scripts are installed.

## Project structure

| File | Purpose |
| --- | --- |
| `src/content.mjs` | Profile, skills, project case studies, education, and certifications |
| `src/components.mjs` | Reusable server-rendered section components |
| `src/page.mjs` | Page composition, semantic document, metadata, structured data |
| `public/styles.css` | Responsive styles, light/dark themes, reduced-motion and print rules |
| `public/main.js` | Accessible mobile navigation, theme toggle, project filtering |
| `public/theme.js` | Apply saved theme before first paint |
| `public/assets/` | Original resume PDF, SVG favicon, social image, touch icon |
| `scripts/build.mjs` | Zero-dependency static build |
| `scripts/serve.mjs` | Local development and production-preview server |
| `scripts/validate.test.mjs` | Content/link integrity and simulated interaction tests |
| `scripts/check-links.mjs` | Repeatable external HTTP link audit |
| `docs/` | Evidence audit, original link inventory, QA report, link results |

## Editing

Change factual content in `src/content.mjs`; change layout in `src/components.mjs`; change design tokens at the beginning of `public/styles.css`. Keep any new claims supported by the resume or reviewed source code. After editing, run `npm test` and `npm run build`.

The page is pre-rendered HTML rather than a client-side SPA. All profile content, project details, links, and contact actions work without JavaScript. JavaScript progressively adds theme preferences, filters, and the collapsible mobile menu. Native `details` elements provide keyboard-operable case studies.

Contact uses the visitor’s email application and telephone handler. There is no simulated submission form or unconfigured mail backend.

## Verification

```sh
npm test
npm run check:links
```

The link check updates `docs/link-checks.json`. Third-party sites may return bot challenges, redirects, temporary cold starts, or require login. Review response content as well as status codes. The tests use a small DOM harness; they are **not browser or visual tests**. See `docs/qa-report.md` for completed checks and remaining manual checks.

Before public launch, choose the final URL, review the mobile/desktop rendering and browser console, verify the LinkedIn profile through its browser challenge, and confirm that academic-record sharing permissions remain appropriate. No extra biographical details are needed to run the site.
