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
- **Database:** PostgreSQL (managed via Supabase)

## Quick Start

**See [SETUP.md](./SETUP.md) for detailed local setup instructions.**

TL;DR:
1. Create a Supabase project at https://app.supabase.com
2. Get your API keys and update `.env.local`
3. Run the SQL migration from `supabase/migrations/001_initial_schema.sql`
4. `npm install && npm run dev`

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Sign up, login routes
│   ├── (dashboard)/         # Protected routes (dashboard, guest list)
│   ├── (guest)/             # Public guest self-entry page
│   ├── api/                 # API routes (stripe webhooks, etc)
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx             # Landing page
├── components/
│   └── ui/                  # Reusable UI components (Button, etc)
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── stripe.ts            # Stripe initialization
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts
```

## Database Schema

- **couples** — User couples with intent, partner names
- **guests** — Guest list with RSVP status
- RLS policies for multi-tenant isolation
- Public policy for guest self-submissions

See `supabase/migrations/001_initial_schema.sql` for details.

## Contributing

PRs welcome! This is a learning project for agentic workflows.

## License

MIT
