-- PostgreSQL Schema for Pawkit (Supabase)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create custom enum types
create type user_role as enum ('buyer', 'seller', 'both', 'admin');
create type pet_status as enum ('Pending', 'Active', 'Reserved', 'Sold', 'Adopted', 'Rejected', 'Archived');
create type listing_type as enum ('For Sale', 'Adoption', 'Rehoming');

-- 2. Create Users Table
create table public.users (
  id uuid references auth.users not null primary key,
  full_name text not null,
  phone text,
  district text,
  role user_role default 'buyer',
  is_verified_seller boolean default false,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for Users
alter table public.users enable row level security;
create policy "Public profiles are viewable by everyone." on public.users for select using (true);
create policy "Users can insert their own profile." on public.users for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.users for update using (auth.uid() = id);

-- 3. Create Pets Table
create table public.pets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  breed text,
  species text,
  gender text,
  age numeric,
  age_unit text default 'months',
  price numeric,
  district text not null,
  area text,
  description text,
  is_vaccinated boolean default false,
  vaccination_details text,
  health_status text,
  is_neutered boolean default false,
  is_trained boolean default false,
  seller_id uuid references public.users(id) not null,
  status pet_status default 'Pending',
  listing_type listing_type default 'For Sale',
  is_featured boolean default false,
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Pets
alter table public.pets enable row level security;
create policy "Pets are viewable by everyone." on public.pets for select using (true);
create policy "Sellers can insert their own pets." on public.pets for insert with check (auth.uid() = seller_id);
create policy "Sellers can update their own pets." on public.pets for update using (auth.uid() = seller_id);
create policy "Sellers can delete their own pets." on public.pets for delete using (auth.uid() = seller_id);

-- 4. Create Pet Images Table
create table public.pet_images (
  id uuid default uuid_generate_v4() primary key,
  pet_id uuid references public.pets(id) on delete cascade not null,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Pet Images
alter table public.pet_images enable row level security;
create policy "Pet images are viewable by everyone." on public.pet_images for select using (true);
create policy "Sellers can insert images for their pets." on public.pet_images for insert with check (
  exists (select 1 from public.pets where id = pet_images.pet_id and seller_id = auth.uid())
);
create policy "Sellers can update images for their pets." on public.pet_images for update using (
  exists (select 1 from public.pets where id = pet_images.pet_id and seller_id = auth.uid())
);
create policy "Sellers can delete images for their pets." on public.pet_images for delete using (
  exists (select 1 from public.pets where id = pet_images.pet_id and seller_id = auth.uid())
);

-- 5. Create Favorites Table
create table public.favorites (
  user_id uuid references public.users(id) on delete cascade not null,
  pet_id uuid references public.pets(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, pet_id)
);

-- RLS for Favorites
alter table public.favorites enable row level security;
create policy "Users can view their own favorites." on public.favorites for select using (auth.uid() = user_id);
create policy "Users can insert their own favorites." on public.favorites for insert with check (auth.uid() = user_id);
create policy "Users can delete their own favorites." on public.favorites for delete using (auth.uid() = user_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to users and pets
create trigger update_users_updated_at before update on public.users for each row execute procedure update_updated_at_column();
create trigger update_pets_updated_at before update on public.pets for each row execute procedure update_updated_at_column();
