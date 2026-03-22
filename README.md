# Vow - Wedding Planning SaaS

A modern, multi-tenant wedding planning platform built with Next.js, Supabase, and Stripe.

## Features

- **Guest List Management**
  - CSV/Excel upload
  - Manual entry with real-time confirmation
  - Public self-entry form (no login required)
- **Save the Dates** (coming soon)
- **Wedding Checklist** (coming soon)
- **Multi-tenant Architecture** with Supabase Auth
- **Stripe Payments** for premium tiers

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Payments:** Stripe
- **Dev:** Docker Compose for local Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Supabase account (or local setup via Docker)

### Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/wedding-planner.git
   cd wedding-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local Supabase (optional)**
   ```bash
   docker-compose up -d
   # Access Supabase Studio at http://localhost:3001
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase/Stripe keys
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

### Database Schema

See `supabase/migrations/` for schema details.

### API Routes

- `/api/auth/*` - Supabase Auth endpoints
- `/api/guests/*` - Guest list operations
- `/api/stripe/*` - Payment webhooks

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth routes (sign up, login)
│   ├── (dashboard)/     # Protected routes
│   ├── (guest)/         # Public guest pages
│   ├── api/             # API routes
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── ui/              # Reusable UI components
│   └── features/        # Feature components
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## Contributing

This is a personal project for learning agentic workflows. PRs welcome!

## License

MIT
