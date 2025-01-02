-- 创建产品分类表
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name varchar not null,
  slug varchar not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建产品表
create table products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references categories(id) on delete cascade,
  name varchar not null,
  slug varchar not null unique,
  description text,
  features text[], -- 产品特点数组
  specifications jsonb, -- 产品规格JSON
  images text[], -- 产品图片URL数组
  price decimal(10,2),
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建索引
create index products_category_id_idx on products(category_id);
create index products_is_featured_idx on products(is_featured); 