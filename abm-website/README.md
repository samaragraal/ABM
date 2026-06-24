# ABM Kuwait — Office Equipment Website

Modern Next.js 15 + Supabase e-commerce platform for [ABM Kuwait](https://abm-kuwait.com), Kuwait's premier office equipment partner.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Components | Radix UI primitives + custom CVA components |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Data Fetching | TanStack React Query |
| Notifications | Sonner |
| Deployment | Vercel |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then update with values from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

Run the migration in your Supabase SQL editor:

```
supabase/migrations/001_initial_schema.sql
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── shop/               # Product catalogue
│   │   ├── page.tsx        # All products
│   │   ├── [category]/     # Category pages
│   │   └── [category]/[product]/ # Product detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── order/[id]/         # Order confirmation
│   ├── account/            # Customer account
│   ├── admin/              # Admin dashboard
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── login/              # Authentication
│   └── register/
├── components/
│   ├── ui/                 # Base UI components (Button, Badge, Input, etc.)
│   ├── layout/             # Navbar, Footer
│   └── shop/               # ProductCard, CategoryCard, CartDrawer, SearchModal
├── context/
│   ├── cart-context.tsx    # Cart state (localStorage + React Context)
│   └── providers.tsx       # All providers wrapper
├── lib/
│   ├── utils.ts            # cn(), formatPrice(), slugify()
│   ├── constants.ts        # Categories, brand info
│   ├── mock-data.ts        # Product data (replace with Supabase queries)
│   └── supabase/           # Supabase client factories
└── types/
    └── index.ts            # TypeScript interfaces
```

## Key Features

- **13 product categories** with filterable product grids
- **Cart** with localStorage persistence and slide-out drawer
- **Multi-step checkout** (shipping → review → payment)
- **Customer accounts** with order history
- **Admin dashboard** with product and order management
- **Search** with instant results
- **WhatsApp** floating contact button
- **Sitemap** & robots.txt for SEO
- **Mobile-first** responsive design
- **KD (Kuwaiti Dinar)** currency formatting

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Set the env vars in Vercel project settings
4. Deploy — production URL will be `https://abm-kuwait.com` after DNS cutover

## Adding Supabase

The app runs on **mock data by default**. To switch to live Supabase data:

1. Set your env vars
2. Run the SQL migration
3. Replace calls to `PRODUCTS` / helper functions in `lib/mock-data.ts` with Supabase queries using the client from `lib/supabase/server.ts` (server components) or `lib/supabase/client.ts` (client components)

## Contact

ABM Kuwait — Al-Qibla, Ali Al-Salem Street, Al-Jawhra Tower, Floor 21  
Tel: 69008879 / 22288194
