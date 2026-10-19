# Wayne’s Customs Automotive and Towing

Marketing website for Wayne’s Customs, an automotive business offering custom work, vehicle care and towing.

Built with Next.js 16 (App Router) and React 19. Every page is statically prerendered and served from Vercel’s CDN.

---

## Contents

- [Quick start](#quick-start)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Configuration](#configuration)
- [Deploying to Vercel](#deploying-to-vercel)
- [Quality baseline](#quality-baseline)
- [Launch checklist](#launch-checklist)
- [Conventions](#conventions)

---

## Quick start

Requires **Node.js 22.13+** (Vercel uses Node 24 by default).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                 | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Dev server with Turbopack and hot reload    |
| `npm run build`        | Production build                            |
| `npm run start`        | Serve the production build locally          |
| `npm run lint`         | ESLint (Next.js core-web-vitals rules)      |
| `npm run typecheck`    | Generate Next.js types, then run TypeScript |
| `npm run format`       | Prettier, write                             |
| `npm run format:check` | Prettier, check only (use in CI)            |

Before opening a pull request, run `npm run lint && npm run typecheck && npm run build`.

## Tech stack

| Layer     | Choice                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Framework | Next.js 16.4 (App Router), React 19.3                                         |
| Language  | TypeScript 5.9 (strict)                                                       |
| Styling   | Hand-written CSS in `app/globals.css`; Tailwind CSS 4 provides the base reset |
| Fonts     | Self-hosted display face via `next/font/local`                                |
| Images    | `next/image` with static imports (AVIF/WebP, blur placeholders)               |
| Icons     | `lucide-react`                                                                |
| Hosting   | Vercel (static output, no server functions)                                   |

There is no database, CMS or API. All content lives in TypeScript files.

## Project structure

```
app/
  layout.tsx            Root layout, global metadata, viewport
  page.tsx              Home page
  contact/page.tsx      Request planner page
  services/[slug]/      Service detail pages (statically generated)
  error.tsx             Error boundary for page-level errors
  global-error.tsx      Last-resort boundary if the root layout fails
  not-found.tsx         404 page
  robots.ts             robots.txt (follows SITE_INDEXING)
  sitemap.ts            sitemap.xml
  icon.svg              Favicon
  opengraph-image.jpg   Social share image (1200×630)
  fonts.ts, fonts/      Display font and its licence
  globals.css           All site styles
components/site/
  Shell.tsx             Header, footer, logo
  MobileMenu.tsx        Full-screen mobile navigation (modal <dialog>)
  Hero.tsx              Home hero
  ParallaxSection.tsx   Pointer-driven parallax wrapper (client)
  Planner.tsx           Contact request planner (client)
  JsonLd.tsx            Safe structured-data renderer
  nav-links.ts          Desktop navigation links
content/
  site.ts               Services, FAQs and process steps (all page copy)
  images.ts             Static image imports keyed by name
lib/
  site-config.ts        Site URL and indexing switch from env vars
public/
  assets/               Logo and photography
  llms.txt              Plain-language site summary for AI crawlers
docs/
  BRAND-DIRECTION.md    Palette, type and tone guidelines
  brand/                Original logo concept artwork
```

Only `MobileMenu`, `ParallaxSection`, `Planner` and the error boundaries are client components. Everything else renders on the server at build time.

## Editing content

- **Services, FAQs and process steps** are in [`content/site.ts`](content/site.ts). Adding a service there creates its page, sitemap entry, menu link and home card automatically. Its `image` must be a key from `content/images.ts`.
- **New images:** add the file to `public/assets/`, import it in [`content/images.ts`](content/images.ts), then reference the key. Static imports give `next/image` the dimensions and blur placeholder.
- **The FAQ structured data** (`FAQPage` JSON-LD) is generated from the `faqs` array, so it always matches the visible answers.
- **Brand rules** (colours, type, tone) are in [`docs/BRAND-DIRECTION.md`](docs/BRAND-DIRECTION.md).

### Colour tokens

Defined at the top of `app/globals.css`:

| Token              | Value     | Use                                                     |
| ------------------ | --------- | ------------------------------------------------------- |
| `--bg`             | `#151515` | Page background                                         |
| `--paper`          | `#f0eee8` | Body text on dark; light section backgrounds            |
| `--red`            | `#f04432` | Accents, red text on dark backgrounds                   |
| `--red-fill`       | `#d6301f` | Filled buttons and strips carrying white text (WCAG AA) |
| `--red-fill-hover` | `#b8261a` | Hover state for filled red                              |

Don’t put small white text on `--red`: it measures 3.8:1 contrast, below the 4.5:1 minimum.

## Configuration

All configuration is through environment variables. See [`.env.example`](.env.example).

| Variable               | Default                                                         | Purpose                                                     |
| ---------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `localhost:3000` | Canonical URLs, sitemap, Open Graph, structured data        |
| `SITE_INDEXING`        | unset (indexing **off**)                                        | `true` allows search engines; anything else sends `noindex` |

While indexing is off, every response carries `X-Robots-Tag: noindex, nofollow` and a `noindex` meta tag, and `robots.txt` disallows all crawlers. Both variables are read at **build time**, so redeploy after changing them.

Security headers (`nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`) are set in [`next.config.ts`](next.config.ts). Vercel adds HSTS automatically.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The Next.js preset is detected automatically; leave the build settings at their defaults.
3. Under **Settings → Environment Variables**:
   - set `NEXT_PUBLIC_SITE_URL` to the production domain, for example `https://www.waynescustoms.com`, for the **Production** environment;
   - leave `SITE_INDEXING` unset until launch (see the checklist).
4. Under **Settings → Domains**, add the custom domain and follow the DNS instructions.
5. Deploy. Each push to the default branch deploys to production; every other branch gets a preview URL. Preview deployments never set `SITE_INDEXING`, so they stay hidden from search engines.

## Quality baseline

Measured with Lighthouse 12 (mobile, simulated slow 4G) against a local production build with indexing on. Performance varies by a few points between runs.

| Page                | Performance | Accessibility | Best practices | SEO |
| ------------------- | ----------- | ------------- | -------------- | --- |
| `/`                 | 95–97       | 100           | 100            | 100 |
| `/contact`          | 97          | 100           | 100            | 100 |
| `/services/towing`  | 96–98       | 100           | 100            | 100 |
| `/services/customs` | 98–100      | 100           | 100            | 100 |

Cumulative Layout Shift is 0 on every page. With indexing off, SEO scores 69 because the page is deliberately blocked from crawling.

**Browser support** follows the Next.js 16 baseline: Chrome and Edge 111+, Firefox 111+, Safari 16.4+. CSS includes fallbacks for `overflow: clip` and `svh` units. The mobile menu uses the native `<dialog>` element for focus trapping and Escape handling.

**Accessibility:** skip link, visible focus rings, a 44px minimum touch target, an `aria-live` status in the planner, focus management between planner steps, and `prefers-reduced-motion` support (all animation is disabled).

## Launch checklist

### Blockers

- [ ] **Give customers a working way to reach the business.** The contact planner only creates notes that visitors copy or download. Nothing is sent to Wayne’s, and no phone number or address is shown. Before launch, either connect the planner to an inbox (for example a Server Action sending email) or publish a phone number or email address.
- [ ] **Confirm the service list.** Copy in `content/site.ts` describes custom work, vehicle care and towing in general terms. Remove anything Wayne’s doesn’t offer.

### Before turning on indexing

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final domain.
- [ ] Set `SITE_INDEXING=true` for **Production only**, then redeploy.
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console.
- [ ] When an address and phone number can be published, add `AutoRepair` / `LocalBusiness` JSON-LD and a Google Business Profile.

### Nice to have

- [ ] Replace illustrative imagery with real photos of the shop, trucks and finished builds. The current images are generated and say so on the home page.
- [ ] Enable Vercel Web Analytics and Speed Insights to track real-user Core Web Vitals.

## Conventions

- Format with Prettier (`printWidth: 100`). Lint must pass with zero warnings.
- Use `next/link` for internal links and `next/image` for images. Plain `<a>` is only for in-page anchors such as `#main`.
- Keep components on the server unless they need state, effects or browser APIs.
- Put copy in `content/`, not inline in components.
- Don’t publish unverified claims: no invented reviews, prices, response times, certifications or “24/7” promises.

### Known tooling notes

- `npm audit` reports 5 high-severity advisories in `braces`, reached only through `eslint-config-next`. This is development tooling and is never shipped to visitors. Production dependencies report **0** vulnerabilities. Don’t run `npm audit fix --force`: it downgrades the lint config to Next.js 14.
- `AGENTS.md` is generated by `next dev` to point AI coding tools at the bundled Next.js docs. Commit it, or set `agentRules: false` in `next.config.ts` to stop it being generated.
- The original Vinext / Cloudflare Workers export this project was migrated from is preserved in the first git commit.
