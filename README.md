# RecetTech

A premium technology storefront and service platform for Nigeria. This project includes a polished storefront layout, route scaffolding, static product data and backend API endpoints that can be extended to Supabase, Paystack and admin authorization.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment and admin setup

The ignored local `.env.local` contains the Supabase project URL, publishable key, and local admin username/password. Set the server-only Supabase **secret key** in `SUPABASE_SECRET_KEY` (or `RECETTECH_SUPABASE_SERVICE_ROLE_KEY`); get it from your Supabase project's API settings. The app accepts either `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` for the project URL, and either `SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for the publishable key. Never put the secret key in a `NEXT_PUBLIC_` variable or send it in chat. Set all required variables in the deployment environment as well.

Before using the catalog admin:

1. In the Supabase SQL Editor, run [`supabase/migrations/20261025203000_catalog_management.sql`](./supabase/migrations/20261025203000_catalog_management.sql). It creates the catalog tables, public-read policies, and public `catalog-images` Storage bucket. Admin writes use the server-only service-role key.
2. Restart the development server after changing environment variables.
3. Sign in at `/admin/login`. Open **Products** and choose **Import starter catalog** to copy the existing sample products, brands, and categories into Supabase. This only adds missing entries; it does not overwrite edits. After import, Supabase becomes the storefront catalog source, so edits, drafts, and deletions are reflected on the storefront.

The catalog admin supports product and inventory management, brand and category CRUD, image uploads (JPG, PNG, WebP, or AVIF up to 5 MB), and homepage announcement/headline editing. Next.js 16 uses the root `proxy.ts` for session checks; API routes also verify the admin session server-side. The other admin sections remain scaffolding until their order, customer, payments, and service workflows are connected.

## Included features

- Homepage with CTA sections and premium merchandising
- Product catalogue, categories and brand pages
- Product detail, cart, wishlist and checkout-ready route shells
- Service, repair booking, device sell and trade-in sections
- Customer and admin route scaffolding
- API endpoints for products, categories, brands and checkout

## Deployment notes

- Use Vercel or another Node-compatible host
- Configure environment variables in the deployment dashboard
- Add Supabase database migrations and real auth flows before production launch
