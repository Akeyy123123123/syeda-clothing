# Syeda Clothing — Luxury Women's Fashion E-Commerce

A premium, cinematic e-commerce experience built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, GSAP, Framer Motion, and React Three Fiber.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
npm run start
```

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — luxury dark theme (black / gold / beige / ivory)
- **GSAP** + **ScrollTrigger** — scroll-triggered reveals
- **Framer Motion** — page/element transitions, drawers, modals
- **React Three Fiber** + **drei** — 3D hero scene, particles, scroll-linked camera
- **React Context + localStorage** — cart, wishlist, and mock auth persistence (no backend required)

## What's Included

- Cinematic animated loading screen
- Glassmorphism sticky navbar with live search, wishlist, cart drawer, mobile menu
- 3D hero section with mouse parallax, floating gold particles, and scroll-driven camera movement
- 9 category sections (Lawn, Pret, Formals, Abayas, Casual, Party, Eid, Summer, Winter)
- Shop page with filtering (category, price, size, color, availability) + sorting
- Product detail pages with gallery, size/color selection, tabs, related products
- Quick View modal, 3D tilt product cards, discount badges, star ratings, stock status
- Full cart (qty, remove, save for later, coupon codes, shipping, tax, totals)
- Checkout with shipping form + 6 payment methods (COD, EasyPaisa, JazzCash, Bank Transfer, Visa, Mastercard)
- Account flows: login, register, forgot password, profile, orders, wishlist
- Reviews, newsletter, Instagram gallery, About, Contact (form + map placeholder + hours + socials)
- Footer with full policy pages (Privacy, Terms, Return, Shipping, FAQ)
- SEO: metadata, `sitemap.xml`, `robots.txt`
- Fully responsive (mobile, tablet, desktop) + `prefers-reduced-motion` support

## Notes on Assets

This build ships with placeholder imagery (via `placehold.co`) so it runs immediately with zero
external accounts or API keys. Before launch:

1. **Product photography** — replace the URLs in `lib/products.ts` (`image`, `images`) with your
   real product photos (or wire up a CMS / headless commerce backend).
2. **3D model** — `components/HeroScene.tsx` renders a stylised abstract "silk drapery" form so the
   hero works with no external assets. To use a photorealistic 3D female fashion model, drop a
   rigged `.glb` file at `public/models/model.glb` and swap in `useGLTF` as documented in the
   comment block at the top of that file.
3. **Payments & checkout** — the checkout flow is a fully-designed front-end only; connect it to a
   real payment gateway (EasyPaisa/JazzCash APIs, Stripe, a bank's payment API) and an order backend
   before going live.
4. **Auth** — `context/AuthContext.tsx` is a local-storage mock for demo purposes. Replace with a
   real auth provider (NextAuth, Firebase Auth, Supabase, etc.) for production use.
5. **Contact form / Newsletter** — currently client-side only; wire to an email service (Resend,
   SendGrid, Mailchimp) to actually deliver messages/subscriptions.
6. **Google Map** — replace the placeholder in `app/contact/page.tsx` with a real embedded map.

## Folder Structure

```
app/                 Routes (App Router)
  shop/, product/[slug]/, cart/, checkout/, account/, wishlist/, search/, about/, contact/, faq/, *-policy/
components/          Reusable UI (Navbar, Hero, ProductCard, CartDrawer, etc.)
context/             CartContext, WishlistContext, AuthContext
lib/                 Product data + shared TypeScript types
```

## Brand

- **Name:** Syeda Clothing
- **Tagline:** Luxury Women's Fashion
- **Currency:** PKR (Rs.)
- **Contact:** syedasidra2003@gmail.com
