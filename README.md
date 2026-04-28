# Lumen — shadcn/ui SaaS Demo

A fictional dev-tool SaaS landing page built to explore an editorial,
spec-sheet aesthetic on top of [shadcn/ui](https://ui.shadcn.com) — designed
around Space Mono, hairline borders, monospace numerals, and a single warm
clay accent color.

The brand "Lumen" and all copy/quotes are fictional, written for design
purposes.

## Pages

| Route        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `/`          | Landing — manifesto hero, product tour, customer story, social proof marquee, comparison table, pricing, CTA |
| `/pricing`   | Dedicated pricing page with FAQ                               |
| `/changelog` | Public changelog with tagged entries (`[FEATURE]`, `[FIX]`, `[BREAKING]`, `[PERF]`, `[DOCS]`) |
| `/app/chat`  | Claude-style chat UI with collapsible sidebar, recents, projects, and an animated composer |

## Stack

- **Framework** — Vite + React 19 + TypeScript
- **Styling** — Tailwind CSS v4 (via `@tailwindcss/vite`) + custom theme tokens
- **Components** — shadcn/ui (Nova preset, Radix base, neutral)
- **Routing** — React Router v7
- **Icons** — Lucide
- **Type** — Space Mono (Google Fonts) globally; tabular numerals for data
- **Theming** — light / dark / system, persisted to `localStorage`, OS-aware

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the build locally
npm run lint     # eslint
```

## Project structure

```
src/
├── App.tsx                       # Router + ThemeProvider
├── main.tsx
├── index.css                     # Tailwind v4, theme tokens, marquee keyframes
├── pages/
│   ├── landing-page.tsx
│   ├── pricing-page.tsx
│   ├── changelog-page.tsx
│   └── chat-page.tsx
├── components/
│   ├── site-nav.tsx              # Sticky nav, version pill, status dot
│   ├── site-footer.tsx           # Inverted dark footer
│   ├── theme-provider.tsx        # light/dark/system + localStorage
│   ├── theme-toggle.tsx          # Dropdown toggle in nav
│   ├── section-label.tsx         # [NN] // LABEL section header primitive
│   ├── hero.tsx                  # Manifesto hero (12-col asymmetric)
│   ├── product-tour.tsx          # 3 chapters: workflows, inspector, deploy
│   ├── customer-story.tsx        # Single editorial customer feature
│   ├── testimonials.tsx          # Dual-row infinite marquee
│   ├── comparison.tsx            # Honest spec sheet vs Zapier/n8n/LangChain
│   ├── pricing.tsx               # 3 tiers + step-execution unit
│   ├── footer-cta.tsx
│   ├── chat/
│   │   ├── chat-sidebar.tsx
│   │   ├── composer.tsx          # Auto-grow textarea, Enter to send
│   │   ├── message.tsx           # User bubble + assistant bare prose
│   │   └── welcome.tsx           # Time-aware greeting + suggestion cards
│   └── ui/                       # shadcn primitives
└── lib/
    └── utils.ts                  # cn()
```

## Design system notes

- **Type** — Space Mono is set as both `--font-sans` and `--font-mono` so
  every component (incl. shadcn) inherits it.
- **Accent** — `--clay` (warm orange ~`oklch(0.66 0.16 50)`) defined for both
  light and dark, exposed as Tailwind utilities `bg-clay`, `text-clay`,
  `border-clay`. Used sparingly: section indices, key data points, the
  "Most popular" pricing tier, hero accent words.
- **Section rhythm** — every numbered section uses `[NN] // LABEL` via
  `<SectionLabel />`, with a 1px hairline rule that visually separates
  sections without heavy backgrounds.
- **No rounded corners** — sharp edges throughout. Buttons, cards, table
  cells all use `rounded-none` to lean into the spec-sheet vibe.
- **Tabular numerals** — every number uses `tabular-nums` so they line up.
- **Marquee** — pure CSS `@keyframes marquee` + `marquee-reverse` defined in
  `index.css`. Two rows, opposite directions, different speeds, mask-image
  fade at edges, and `group-hover:[animation-play-state:paused]` so users
  can read on hover.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

The project uses the **Nova** preset with the **Radix** base and the
**neutral** base color (`components.json`).

## Theming

The `<ThemeProvider>` in `src/components/theme-provider.tsx` toggles a
`.dark` class on `<html>`, persists the choice to `localStorage`
(`lumen-theme`), and listens for OS color-scheme changes when the user
selects "System". The `<ThemeToggle>` in the nav exposes Light / Dark /
System via a dropdown.

## Avatars

The testimonial marquee uses [pravatar.cc](https://pravatar.cc) with
deterministic seeds (`?u=<seed>`) so the same handle always resolves to the
same face. Lazy-loaded with explicit width/height to avoid CLS.

## Credits

- [shadcn/ui](https://ui.shadcn.com) — component primitives
- [Radix UI](https://www.radix-ui.com) — headless component foundations
- [Tailwind CSS](https://tailwindcss.com) — utility CSS
- [Lucide](https://lucide.dev) — icon set
- [Google Fonts](https://fonts.google.com) — Space Mono / Space Grotesk / DM Mono / Outfit
- [pravatar.cc](https://pravatar.cc) — placeholder avatars

## License

MIT
