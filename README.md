# eCommerce Full-Stack App

A modern, full-featured eCommerce web application with product browsing, cart management, user authentication, and an admin panel.

## Live Demo

- **Frontend**: [https://ecommerce-fullstack-design-zeta.vercel.app](https://ecommerce-fullstack-design-zeta.vercel.app)
- **Backend API**: [https://ecommerce-fullstack-design-1c72.onrender.com](https://ecommerce-fullstack-design-1c72.onrender.com)

## Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React 19, React Router 7, Vanilla CSS |
| Backend    | Node.js, Express 5                   |
| Database   | MongoDB Atlas, Mongoose 9            |
| Auth       | JWT (jsonwebtoken), bcryptjs         |
| Deployment | Vercel (frontend), Render (backend)  |

## Features

- **Product Browsing** — Home page with featured products, category grid, deals section
- **Product Listing** — Filter by category, brand, features, condition, price range. Sort by price, rating, newest
- **Product Details** — Image gallery, related products, add to cart
- **Search** — Full-text search across product name, description, category, and tags
- **Cart** — Guest cart (localStorage) + authenticated cart (MongoDB). Automatic merge on login
- **Authentication** — Register, login, logout with JWT tokens
- **Admin Panel** — Dashboard stats, product CRUD (create, read, update, delete), user listing
- **Responsive** — Fully responsive across mobile, tablet, and desktop

## Getting Started (Local Development)

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Then fill in your values
npm run seed            # Seed 30 products
npm run seed:admin      # Create admin user
npm run dev             # Starts on http://localhost:5000
```

### Frontend Setup

```bash
# From project root
npm install
cp .env.example .env    # Set VITE_API_URL=http://localhost:5000/api
npm run dev             # Starts on http://localhost:5173
```

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                    | Example                      |
| -------------- | ------------------------------ | ---------------------------- |
| `PORT`         | Server port                    | `5000`                       |
| `MONGO_URI`    | MongoDB connection string      | `mongodb+srv://...`          |
| `CLIENT_URL`   | Frontend URL (for CORS)        | `http://localhost:5173`      |
| `NODE_ENV`     | Environment                    | `development` or `production`|
| `JWT_SECRET`   | Secret key for JWT signing     | `your_secret_key`            |
| `JWT_EXPIRES_IN` | JWT expiration              | `7d`                         |

### Frontend (`.env`)

| Variable       | Description         | Example                              |
| -------------- | ------------------- | ------------------------------------ |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api`          |

## Test Credentials

| Role  | Email                  | Password   |
| ----- | ---------------------- | ---------- |
| Admin | admin@ecommerce.com    | admin123   |
| User  | _Register a new account_ | _Your choice_ |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `GET /api/auth/profile` — Get profile (protected)
- `PUT /api/auth/profile` — Update profile (protected)

### Products
- `GET /api/products` — List products (with filters/pagination)
- `GET /api/products/featured` — Featured products
- `GET /api/products/:id` — Single product
- `GET /api/products/:id/related` — Related products

### Cart (protected)
- `GET /api/cart` — Get cart
- `POST /api/cart` — Add to cart
- `PUT /api/cart/:productId` — Update quantity
- `DELETE /api/cart/:productId` — Remove item
- `DELETE /api/cart` — Clear cart

### Admin (protected + admin)
- `GET /api/admin/stats` — Dashboard stats
- `GET /api/admin/products` — All products
- `POST /api/admin/products` — Create product
- `PUT /api/admin/products/:id` — Update product
- `DELETE /api/admin/products/:id` — Delete product
- `GET /api/admin/users` — All users

### Search
- `GET /api/search?q=term` — Search products

## Deployment

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root directory**: `backend`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
4. Add environment variables (see table above)
5. Set `CLIENT_URL` to your Vercel frontend URL
6. Deploy

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Settings:
   - **Framework**: Vite
   - **Root directory**: `.` (project root)
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy
6. Go back to Render → update `CLIENT_URL` to the Vercel URL → redeploy

## Project Structure

```
├── backend/
│   ├── config/           # Database connection
│   ├── controllers/      # Route handlers (auth, cart, admin, product)
│   ├── middleware/        # Auth, admin, error handler
│   ├── models/           # Mongoose schemas (User, Product, Cart)
│   ├── routes/           # Express routes
│   ├── seed/             # Database seeders
│   └── server.js         # Entry point
├── src/
│   ├── api/              # Frontend API layer
│   ├── components/       # Shared components (Navbar, Footer, etc.)
│   ├── context/          # React contexts (Auth, Cart)
│   ├── pages/            # Page components + admin panel
│   └── styles/           # Design tokens
└── Figma_Designs/        # Reference designs
```

## License

ISC
