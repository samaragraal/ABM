-- ABM Kuwait — Initial Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ──────────────────────────────────────────────────────────────────────────────
-- Categories
-- ──────────────────────────────────────────────────────────────────────────────
create table categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  description text,
  icon       text,
  image_url  text,
  parent_id  uuid references categories(id),
  created_at timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Products
-- ──────────────────────────────────────────────────────────────────────────────
create table products (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  category_id   uuid references categories(id) on delete set null,
  brand         text,
  price         numeric(10, 3) not null,
  compare_price numeric(10, 3),
  description   text,
  specs         jsonb default '[]'::jsonb,
  images        text[] default '{}',
  is_featured   boolean default false,
  is_new        boolean default false,
  is_coming_soon boolean default false,
  in_stock      boolean default true,
  stock_count   int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Profiles (extends Supabase auth.users)
-- ──────────────────────────────────────────────────────────────────────────────
create table profiles (
  id       uuid primary key references auth.users(id) on delete cascade,
  name     text,
  phone    text,
  role     text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- Auto-create profile on sign up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ──────────────────────────────────────────────────────────────────────────────
-- Orders
-- ──────────────────────────────────────────────────────────────────────────────
create table orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete set null,
  status           text not null default 'pending'
                   check (status in ('pending','processing','shipped','delivered','cancelled')),
  items            jsonb not null default '[]'::jsonb,
  total            numeric(10, 3) not null,
  shipping_address jsonb,
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Cart items (persistent cart for logged-in users)
-- ──────────────────────────────────────────────────────────────────────────────
create table cart_items (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references auth.users(id) on delete cascade,
  session_id text,
  product_id uuid references products(id) on delete cascade,
  quantity   int not null default 1 check (quantity > 0),
  created_at timestamptz default now(),
  unique (user_id, product_id),
  unique (session_id, product_id)
);

-- ──────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ──────────────────────────────────────────────────────────────────────────────
alter table categories  enable row level security;
alter table products    enable row level security;
alter table profiles    enable row level security;
alter table orders      enable row level security;
alter table cart_items  enable row level security;

-- Public read for categories and products
create policy "Public read categories"  on categories  for select using (true);
create policy "Public read products"    on products    for select using (true);

-- Profiles: users can read/update their own
create policy "Users read own profile"   on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

-- Orders: users can read their own orders; admins see all
create policy "Users read own orders" on orders for select
  using (auth.uid() = user_id);

create policy "Users insert own orders" on orders for insert
  with check (auth.uid() = user_id);

-- Cart items: users manage their own
create policy "Users manage own cart" on cart_items for all
  using (auth.uid() = user_id);

-- Admin policies (requires 'admin' role in profiles)
create policy "Admins manage categories" on categories for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Admins manage products" on products for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Admins manage orders" on orders for all
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ──────────────────────────────────────────────────────────────────────────────
-- Seed categories
-- ──────────────────────────────────────────────────────────────────────────────
insert into categories (name, slug, description, icon) values
  ('Printers & MFP',       'printers-mfp',        'Multifunction inkjet and laser printers',               'Printer'),
  ('Label Printers',       'label-printers',       'Professional label printers for barcodes and tags',     'Tag'),
  ('Inks & Toners',        'inks-toners',          'Genuine ink tanks, bottles and toner cartridges',       'Droplet'),
  ('Labels & Tapes',       'labels-tapes',         'DK rolls, TZe tapes and adhesive label media',         'BookMarked'),
  ('Copiers',              'copiers',              'High-speed document copiers',                           'Copy'),
  ('Scanners',             'scanners',             'High-resolution document and photo scanners',           'ScanLine'),
  ('Projectors',           'projectors',           'Business and classroom projectors',                     'Projector'),
  ('Screens',              'screens',              'Display screens and monitors',                          'Monitor'),
  ('Interactive Screens',  'interactive-screens',  'Touch-enabled interactive display panels',              'MonitorSmartphone'),
  ('Shredders',            'shredders',            'Micro-cut and cross-cut paper shredders',               'Scissors'),
  ('Time Recorders',       'time-recorders',       'Attendance and time recording machines',               'Clock'),
  ('Safes & Filing',       'safes-filing',         'Fire-resistant safes and file storage cabinets',        'Lock'),
  ('Accessories',          'accessories',          'Cables, adapters and office equipment accessories',     'Package');
