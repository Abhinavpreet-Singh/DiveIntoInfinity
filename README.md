# DiveintoInfinity — Digital Product Studio

**Tagline:** _"We build the products our clients are judged by."_
**Supporting line:** _"Go deep. Build infinite."_

The studio site for DiveintoInfinity — a digital product studio that designs and engineers
web platforms, mobile apps and internal software for founders, institutions and research
teams. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide icons.

---

## ✦ Theme — monochrome, light and dark

Two colours and the greys between them. **Firi white `#F7F7F4`** and **ink `#14120B`** —
no hue anywhere in the system. Light and dark are the same design inverted, switched by the
toggle in the navigation bar (choice stored in `localStorage`, OS preference respected until
the visitor picks one, no flash on load).

| Token            | Light     | Dark      | Use                        |
| ---------------- | --------- | --------- | -------------------------- |
| `--bg`           | `#F7F7F4` | `#14120B` | Page background            |
| `--bg-2`         | `#F1F0EA` | `#100E08` | Alternate band             |
| `--surface`      | `#FFFFFF` | `#1B1912` | Panels and cards           |
| `--line`         | `#E3E2DC` | `#2C2A22` | Borders                    |
| `--line-strong`  | `#CFCEC6` | `#413E34` | Emphasised borders         |
| `--ink`          | `#14120B` | `#F7F7F4` | Primary text, the mark     |
| `--body`         | `#3A382F` | `#CFCDC4` | Body copy                  |
| `--muted`        | `#6B6962` | `#918F86` | Secondary text             |
| `--dim`          | `#9A988E` | `#65635B` | Labels, mono annotations   |

Utilities in `app/globals.css`: `.panel`, `.panel-hover`, `.grain`, `.grid-field`,
`.depth-vignette`, `.hairline`, `.lumen-text`, `.outline-text`, `.link-underline`,
`.particle`, `.marquee-track`, `.eyebrow`, `.mono`.

### Motion

- **Hero** — the infinity path draws itself in on load, then a light pulse runs the loop
  forever; the wordmark rises letter by letter (`SplitText`).
- **Scroll reveal** — `Reveal` uses an IntersectionObserver to settle elements into place
  once, with per-item stagger delays.
- **Stacking work cards** — each case study pins a little lower than the last, so the three
  collect into a deck as you descend.
- **Ticker** — a seamless capability marquee under the hero.
- **Chrome** — hover sweeps on buttons, growing link underlines, a scroll-depth gauge in
  the navigation bar, and a fine grain overlay across the whole page.
- Everything respects `prefers-reduced-motion`.

---

## ✦ Page structure

1. **Hero** — full-viewport dive entry. The infinity mark is the centrepiece, with the
   wordmark seated at its origin point, light shafts and a rising particle field behind
   it, and an instrument readout strip along the floor.
2. **Manifesto** — the narrative band: why the studio exists, set in tracked uppercase.
3. **Selected Work** — three live client products as alternating editorial case rows.
4. **Capabilities** — six services, from product design through launch and care.
5. **Process** — the dive profile: Surface → Descend → Pressure → Infinity, on a depth line.
6. **Studio** — who you work with, plus four operating principles.
7. **FAQ** — accordion covering scope, pricing, ownership and timelines.
8. **Contact** — enquiry form posting to `/api/contact`, plus direct email and WhatsApp.

Plus `/work` (archive) and `/work/[slug]` (full case studies), `/sitemap.xml`, `/robots.txt`.

---

## ✦ Client work

All three case studies are real, shipped products. Everything in `highlights` and
`features` describes functionality visible in the live product — there are **no invented
traffic, revenue or growth numbers** anywhere in `data/projects.ts`.

| Project                 | What it is                                  | Surfaces                      |
| ----------------------- | ------------------------------------------- | ----------------------------- |
| **UniEvent**            | Campus-to-city event discovery & ticketing  | Web · Android · Host dashboard|
| **CellsInVitro**        | Research-kit storefront + lab management suite | Web · LMS · Admin          |
| **AISTEM International**| B2B scientific equipment procurement catalogue | Web · Admin CMS            |

---

## ✦ Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, Cache Components)
- **Language:** TypeScript, strict
- **Styling:** Tailwind CSS v4 with `@theme` tokens
- **Icons:** Lucide React
- **Fonts:** Inter via `next/font/google`

---

## ✦ Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` to `.env.local` and set:

- `CONTACT_EMAIL` — inbox for enquiries
- `RESEND_API_KEY` — (optional) deliver enquiries by email
- `CONTACT_WEBHOOK_URL` — (optional) Slack/Discord/Zapier forwarding
- `NEXT_PUBLIC_SITE_URL` — production domain

### Build

```bash
npm run build
```

```bash
npm run lint
```

---

## ✦ Project structure

```text
app/
  api/contact/route.ts     # Enquiry validation & dispatch
  work/page.tsx            # Archive
  work/[slug]/page.tsx     # Case studies
  globals.css              # Design tokens, utilities, motion
  layout.tsx               # Root layout, fonts, SEO
  page.tsx                 # Homepage
  robots.ts · sitemap.ts
components/
  layout/                  # Navbar (curved edge, drawer), Footer, CurrentYear
  portfolio/               # ProjectCard, ProjectVisual (schematic, no fake screenshots)
  sections/                # Hero, Manifesto, SelectedWork, Services,
                           # Process, About, Faq, Contact
  ui/                      # Atmosphere (particles, shafts, curves), Badge, Button,
                           # Container, InfinitySymbol, SectionHeading
data/
  site.ts · projects.ts · services.ts · process.ts · faqs.ts
lib/utils.ts
```

---

## ✦ Editing content

Everything is data-driven — no copy lives in components:

- **`data/site.ts`** — studio name, email, WhatsApp, location, availability, nav, socials
- **`data/projects.ts`** — case studies (accent colour, platforms, highlights, features)
- **`data/services.ts`** — the six capabilities
- **`data/process.ts`** — the four dive stages
- **`data/faqs.ts`** — FAQ accordion entries

Adding a project automatically adds it to the homepage, the archive, the footer and
generates its case study page and sitemap entry.

---

## ✦ Deployment

Deploys to Vercel, Netlify or any Node host. Add the environment variables above in your
host's dashboard.
