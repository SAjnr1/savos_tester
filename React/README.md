# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Comments & Products App

A React app with:
- A homepage showing a product grid (image, name, price, Call/WhatsApp buttons) and a public comment section
- An `/admin` page, protected by a real login, for posting/deleting products and deleting comments

Visitors still need no account at all — they can read/post comments and
browse products freely. Only `/admin` requires signing in, using a single
admin account you create yourself (not a public sign-up).

## 1. Create the comments table

```sql

create table comments (
  id uuid default gen_random_uuid() primary key,
  author text not null,
  location text,
  body text not null,
  created_at timestamptz default now()
);

alter table comments enable row level security;

create policy "Public can read comments" on comments
  for select using (true);

create policy "Public can insert comments" on comments
  for insert with check (true);

create policy "Authenticated can delete comments" on comments
  for delete using (auth.role() = 'authenticated');
```

## 2. Create the products table

```sql
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric(10,2) not null,
  image_url text not null,
  phone text not null,
  whatsapp text not null,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Public can read products" on products
  for select using (true);

create policy "Authenticated can insert products" on products
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated can delete products" on products
  for delete using (auth.role() = 'authenticated');
```

## 3. Create the admin account

In the Supabase dashboard: **Authentication → Users → Add user**.
Create exactly one user with the admin's email and password. This is
the *only* way to create an account — there's no sign-up form anywhere
on the site, so nobody else can register.

## 4. Create a Storage bucket for product photos

Also done in the dashboard:

1. **Storage** → **New bucket**
2. Name it exactly `product-images`
3. Toggle **Public bucket** ON (so images can be viewed on the site)
4. Create it

Then run this in the SQL Editor so only the logged-in admin can upload:

```sql
create policy "Authenticated can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');
```

Reading images doesn't need a policy — public buckets serve files
directly over their URL regardless of RLS.

## 5. (If you set this up before) remove the old password functions

If you previously ran the password-check SQL functions from an earlier
version of this app, they're no longer used and can be removed:

```sql
drop function if exists delete_comment_as_admin(uuid, text);
drop function if exists insert_product_as_admin(text, numeric, text, text, text, text);
drop function if exists delete_product_as_admin(uuid, text);
drop function if exists verify_admin_password(text);
drop policy if exists "Public upload to product-images" on storage.objects;
```

## 6. Set your credentials

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_ANON_KEY
```

Get both from Project Settings → API. Use the **anon / public** key —
never the secret / service-role key, which must never appear in
frontend code.

## 7. Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Visit `/admin` and sign in with the
account you created in step 3.

## How the admin login works

`/admin` now uses Supabase's built-in authentication instead of a
custom password check. Signing in creates a real session; Storage and
the database's row-level security both check "is there a valid
logged-in session" before allowing an upload, insert, or delete. This
is the standard way to protect an action without adding accounts for
everyone — only the one admin user exists, and visitors never see or
need a login at all.

A **Log out** button on the admin page ends the session. If you close
the tab without logging out, Supabase's session token expires on its
own after a while, so it's not left open forever.

## Notes

- The comment section is fully open by design, so anyone can post
  anything, including spam. Consider rate limiting or a honeypot field
  if that becomes an issue.
- Prices display with the "GH¢ " prefix on both the homepage and the
  admin product list — change it in `CommentsPage.jsx` and
  `AdminPage.jsx` if you switch currencies later.
- Phone numbers are used as-is for the "Call" button, and stripped of
  non-digit characters for the WhatsApp link — enter them in full
  international format (e.g. `+233551234567`) for both to work
  reliably.
- Deleting a product removes its database row but leaves the image
  file in Storage — not automatically cleaned up. Fine to ignore for a
  small personal project.
