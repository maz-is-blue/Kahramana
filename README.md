# Kahramana — Luxury Perfume E-Commerce

A full-stack bilingual (English / Arabic) luxury perfume store built with React and Laravel.

## Project Structure

```
Kahramana/
├── Frontend/        # React + Vite + Tailwind CSS
└── kahramana-api/   # Laravel 13 + SQLite REST API
```

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- React Router v7
- Bilingual EN/AR support

**Backend**
- Laravel 13
- SQLite (zero setup)
- Laravel Sanctum (API token auth)
- RESTful API

## Getting Started

### Backend
```bash
cd kahramana-api
php artisan serve
```
Runs on `http://localhost:8000`

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Admin Access
- URL: `http://localhost:5173/admin/login`
- Email: `admin@kahramana.com`
- Password: `Admin@123456`

## Features
- Product catalog with filtering & search
- Shopping cart & checkout
- User authentication (register / login)
- Wishlist (synced to account when logged in)
- Product reviews & ratings
- Admin dashboard (products, orders management)
- Bilingual UI (English / Arabic with RTL support)
