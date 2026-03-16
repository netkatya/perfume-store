# Perfume Store – Next.js Technical Test

A small product catalogue built with **Next.js (App Router)** and **TypeScript**.

The goal of this project is to demonstrate practical usage of Next.js features, server and client component architecture, API route handlers, and common frontend patterns such as filtering, sorting, pagination, and global state management.

---

# Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand (basket state management)
- Lucide React (icons)

---

# Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

Open the application:

```
http://localhost:3000/products
```

---

# Features

## Product Catalogue

Route:

```
/products
```

The catalogue page includes:

- Product search
- Price filtering
- Tag filtering
- Sorting by price and rating
- Pagination
- Loading state
- Empty state

All filters and sorting are reflected in **URL search parameters**, allowing users to share filtered links and use browser navigation.

Example:

```
/products?q=rose&sort=price_asc&page=2
```

The catalogue layout is **fully responsive and works across all screen sizes**, adapting the grid and layout for desktop, tablet, and mobile devices.

---

## Product Detail Page

Route:

```
/products/[id]
```

Features:

- Server-rendered product details
- Dynamic metadata using `generateMetadata`
- Proper `notFound()` handling
- "Add to Basket" client-side interaction

---

## Basket

Route:

```
/basket
```

The basket functionality is implemented using **Zustand** for global state management.

Supported functionality:

- Viewing items in the basket
- Updating item quantity
- Removing items
- Displaying the total price

The header also includes a **basket indicator showing the total number of items currently added**.

---

## Responsive Design

The application is designed to work **across all screen sizes**.

The layout automatically adapts for:

- desktop
- tablet
- mobile devices

Navigation includes a **responsive header with a mobile menu**, ensuring a good experience on smaller screens.

---

# API

## GET /api/products

Supports query parameters:

- `q` — text search (name, brand, tags)
- `minPrice`
- `maxPrice`
- `tag`
- `sort`
  - `price_asc`
  - `price_desc`
  - `rating_desc`
- `page`
- `pageSize`

Response format:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "pageSize": 6
}
```

---

## GET /api/products/[id]

Returns a single product.

Returns **404** if the product does not exist.

---

# Architectural Decisions

## App Router

The application uses **Next.js App Router** with a mix of **Server and Client Components**.

- Product pages are rendered on the server
- Interactive elements such as basket interactions are handled with client components

---

## URL State

Filtering and sorting are implemented using **URL search parameters**.

This allows:

- shareable URLs
- proper browser navigation
- server-driven filtering logic

---

## Basket State Management

Basket state is managed using **Zustand**, which provides a lightweight and simple global state solution.

Basket data is persisted using **localStorage**.

---

## Data Layer

Product data is stored locally in:

```
/data/products.ts
```

API route handlers simulate backend behaviour.

Filtering, sorting, and pagination are implemented **server-side**.

---

# Next.js Features Implemented

- App Router
- Route Handlers
- Server Components
- `generateMetadata`
- `notFound()`
- `loading.tsx`
- Query parameter validation

---

# What I Would Improve With More Time

- Improve **accessibility** (ARIA attributes, keyboard navigation, focus management).
- Refine **UI styling and visual consistency** across components.
- Further polish the **responsive experience**, although the application already works across all screen sizes and includes a mobile navigation menu.

---

fixed div -> ul>li
fixed basket -> amount on page, not in store
app>api optimized
main page added
