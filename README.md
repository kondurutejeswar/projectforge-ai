# ProjectForge AI

A conversion-optimized marketing site for selling B.Tech final year IEEE projects to
CSE/IT students — dark mode, animated, mobile-first.

Built with **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS** +
**Framer Motion**, with **Supabase** for storing inquiries/testimonials and
**EmailJS** for owner email notifications (no backend server required).

## 1. Install & run

```bash
npm install
cp .env.local.example .env.local   # fill in the values (see below)
npm run dev
```

Open http://localhost:3000.

## 2. Environment variables

All variables live in `.env.local` (never commit this file). See
`.env.local.example` for the full list and inline comments. You need:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings → API |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | emailjs.com dashboard |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your business WhatsApp number, e.g. `919999999999` |
| `NEXT_PUBLIC_OWNER_EMAIL` | Email shown in the footer |

The site works without any of these set — forms just log to the console
instead of persisting, so you can develop the UI before wiring up services.

## 3. Set up Supabase (forms + testimonials database)

The full SQL schema (with row-level security policies) is documented as a
comment at the top of `lib/supabaseClient.ts`. Copy it into the Supabase SQL
editor once to create the `inquiries` and `testimonials` tables.

- **Inquiries**: every form submission (footer + project detail pages) is
  inserted here. No public read access — only your Supabase dashboard.
- **Testimonials**: public insert allowed (student submissions), but public
  *read* is restricted to rows where `approved = true`. Approve reviews
  manually from the Supabase Table Editor by flipping that column.

## 4. Set up EmailJS (owner email notifications)

1. Create a free account at emailjs.com and connect your Gmail/Outlook.
2. Create a template with variables: `from_name`, `college`, `project_title`,
   `email`, `whatsapp`, `message`.
3. Drop the Service ID, Template ID, and Public Key into `.env.local`.

Every inquiry submission fires both a Supabase insert **and** an EmailJS
notification, so you get pinged immediately and still have a searchable
record in Supabase.

## 5. Admin dashboard — approve reviews at /admin

Instead of approving testimonials from the raw Supabase table editor, there's
a small password-protected dashboard built in:

1. Set `ADMIN_PASSWORD` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
   (get the service role key from Supabase → Settings → API — **never**
   prefix it with `NEXT_PUBLIC_`, it must stay server-only).
2. Visit `/admin` — you'll be redirected to `/admin/login`.
3. Log in with `ADMIN_PASSWORD`. You get an httpOnly session cookie valid
   for 8 hours.
4. The dashboard lists every submitted review with **Pending / Approved /
   All** tabs. Approve, unpublish, or permanently delete a review — changes
   reflect on the public `/testimonials` page immediately, since that page
   only ever reads rows where `approved = true`.

**How the protection works, and its limits:** `/admin/*` and `/api/admin/*`
are gated by `middleware.ts`, which checks a cookie against `ADMIN_PASSWORD`
on every request. This is a lightweight single-password gate suited to a
one-person or small-team operation — it is **not** equivalent to a full
user-accounts system with per-admin logins, audit logs, or rate-limited
login attempts. If you later have multiple staff approving reviews or want
stronger guarantees, swap this for Supabase Auth or NextAuth.

## 6. How to add / edit / remove a project

Everything lives in **one file**: `lib/projects.ts`. Copy an existing object,
change the fields, and the home carousel, catalog grid, filters, and detail
page all update automatically — no other file needs to change.

```ts
{
  slug: 'your-project-slug',       // becomes /projects/your-project-slug
  title: '...',
  tier: 'Tier 1' | 'Tier 2',
  domain: 'Medical AI' | 'GenAI' | 'Computer Vision' | 'IoT' | 'Blockchain' | 'Cybersecurity' | 'NLP',
  techStack: ['Python', 'TensorFlow', ...],
  shortDesc: '...',   // catalog card
  longDesc: '...',    // detail page
  features: ['...'],
  demoUrl: 'https://...',        // optional hosted demo link
  demoVideoUrl: 'https://www.youtube.com/embed/...',  // optional embed
  thumbnail: '/thumbnails/your-project.svg',
  ieeeBase: 'IEEE ... 2024 — Paper title',
  pricing: [ { name, price, features, highlighted? } ],
}
```

To add a new **Domain**, just use a new string as the `domain` value and
update the `Domain` union type in `lib/types.ts` — the filter bar picks it up
automatically since it derives its list from the data.

## 7. Project structure

```
app/
  layout.tsx              Root layout: fonts, Navbar/Footer/WhatsApp shell
  page.tsx                Home: hero, stats, featured carousel, guarantees
  globals.css             Design tokens, terminal-frame signature styles
  projects/
    page.tsx              Catalog: search + tier/domain filters
    [slug]/page.tsx        Detail: demo embed, features, pricing, inquiry form
  testimonials/
    page.tsx               Reviews grid + submission form
  admin/
    login/page.tsx          Password gate for the moderation dashboard
    page.tsx                 Dashboard: approve / unpublish / delete reviews
  api/admin/
    login/route.ts           Sets the httpOnly session cookie
    logout/route.ts          Clears it
    testimonials/route.ts     GET all / PATCH approve / DELETE, service-role only
middleware.ts              Guards /admin/* and /api/admin/* behind the cookie
components/
  Navbar.tsx, Footer.tsx, WhatsAppButton.tsx   (all hide themselves on /admin)
  Hero.tsx, Stats.tsx
  ProjectCarousel.tsx, ProjectCard.tsx, FilterBar.tsx, PricingCard.tsx
  InquiryForm.tsx          Shared form (footer + every project page)
  TestimonialCard.tsx, TestimonialForm.tsx, TestimonialsCarousel.tsx
lib/
  projects.ts              ← edit this to manage the catalog
  testimonials.ts           Seed reviews shown before Supabase has data
  types.ts                  Shared TypeScript types
  supabaseClient.ts          Public (anon key) client + SQL schema comment
  supabaseAdmin.ts            Server-only client (service role) for /api/admin
  sendEmail.ts               EmailJS wrapper
```

## 8. Design system

- **Background**: near-black `#080B14` with a soft multi-color radial glow.
- **Accents**: signal green `#22D3A6` (primary CTA / "deploy" color),
  electric blue `#3E7BFA` (secondary actions, links), violet `#8B6BFA`
  (GenAI/AI accents).
- **Type**: Space Grotesk (display/headings), Inter (body), JetBrains Mono
  (tech-stack tags, eyebrows, terminal chrome).
- **Signature motif**: project cards are styled as terminal windows (dot
  controls + monospace tags) — ties the visual language to the CSE/IT
  audience buying the projects.
- Respects `prefers-reduced-motion` and has visible keyboard focus rings
  throughout.

## 9. Deploy

Push to GitHub and import into Vercel — zero config needed beyond adding the
same environment variables in the Vercel dashboard.
