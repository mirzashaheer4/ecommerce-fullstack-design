# E-Commerce Web App

A full-stack e-commerce storefront with a polished customer experience, authenticated cart flow, wishlist and order pages, Stripe-ready checkout, and a separate admin workspace for product and order management.

## Overview

This project pairs a React + Vite frontend with an Express + MongoDB backend. The customer app covers product discovery, product detail pages, cart, checkout, profile, orders, wishlist, and support pages. The admin area is isolated from the public layout and includes dashboard, product CRUD, and order management.

## Live Demo

- Frontend: [https://ecommerce-fullstack-design-zeta.vercel.app](https://ecommerce-fullstack-design-zeta.vercel.app)
- Backend API: [https://ecommerce-fullstack-design-1c72.onrender.com](https://ecommerce-fullstack-design-1c72.onrender.com)

## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | React 19, React Router 7, Vite, Vanilla CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 9 |
| Auth | JWT, bcryptjs |
| Payments | Stripe |
| Tooling | ESLint, concurrently |

## Highlights

- Fast product discovery with featured items, category browsing, filters, sorting, and search.
- Product detail pages with image galleries, related products, and add-to-cart actions.
- Cart flow that supports authenticated users and guest sessions.
- Protected customer pages for profile, orders, and checkout.
- Admin workspace with dashboard metrics, product management, and order updates.
- Responsive layout designed to work cleanly across mobile, tablet, and desktop.

## Frontend Routes

- Public: `/`, `/products`, `/products/:id`, `/about`, `/contact`, `/wishlist`, `/messages`
- Customer: `/cart`, `/checkout`, `/order-confirmation`, `/profile`, `/orders`
- Auth: `/login`, `/register`
- Admin: `/admin/dashboard`, `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`, `/admin/orders`

## Backend API

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
- Products: `/api/products`, `/api/products/featured`, `/api/products/:id`, `/api/products/:id/related`
- Search: `/api/search?q=term`
- Cart: `/api/cart`
- Admin: `/api/admin/stats`, `/api/admin/products`, `/api/admin/users`, `/api/admin/orders`
- Payments: `/api/payment/create-intent`, `/api/payment/confirm`, `/api/payment/my-orders`, `/api/payment/orders/:id`
- Health check: `/api/health`

## Getting Started

### Requirements

- Node.js 18 or newer
- MongoDB Atlas or a local MongoDB instance

### 1. Install Dependencies

```bash
npm install
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example files and fill in your values:

- Root: [.env.example](.env.example) -> `.env`
- Backend: [backend/.env.example](backend/.env.example) -> `backend/.env`

### 3. Seed the Database

```bash
cd backend
npm run seed
npm run seed:admin
```

The admin seed creates:

- Email: `admin@ecommerce.com`
- Password: `admin123`

### 4. Run the App

From the project root:

```bash
npm run dev
```

This starts both the Vite frontend and the backend server.

## Environment Variables

### Root `.env`

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API base URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key used by the frontend |

### `backend/.env`

| Variable | Description |
| --- | --- |
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_URL` | Frontend origin allowed by CORS |
| `NODE_ENV` | Environment mode |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRES_IN` | JWT token lifetime |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

## Available Scripts

### Root

- `npm run dev` - Start frontend and backend together.
- `npm run dev:frontend` - Start the Vite app only.
- `npm run dev:backend` - Start the backend only.
- `npm run build` - Build the frontend for production.
- `npm run lint` - Run ESLint.
- `npm run preview` - Preview the production build.

### Backend

- `npm run dev` - Start the backend with nodemon.
- `npm start` - Start the backend in production mode.
- `npm run seed` - Seed products.
- `npm run seed:admin` - Create the admin user.

## Project Structure

```
├── backend/
│   ├── config/        # Database connection
│   ├── controllers/   # API logic for auth, cart, products, payments, admin
│   ├── middleware/    # Auth, admin, and error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express route definitions
│   ├── seed/          # Seed scripts for products and admin user
│   └── server.js      # Backend entry point
├── src/
│   ├── api/           # Frontend API wrappers
│   ├── components/    # Shared UI components
│   ├── context/       # App state providers
│   ├── pages/         # Public, customer, and admin pages
│   └── styles/        # Global styles and design tokens
├── public/            # Static assets
└── Figma_Designs/     # Design references
```

## Notes

- The root `npm run dev` command uses `concurrently` to run both apps.
- The backend exposes a simple `/api/health` endpoint for quick checks.

## License

ISC
