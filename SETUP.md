# Local Setup Guide

## Quick Start (Recommended)

Everything is pre-configured to run locally with Docker Compose. No cloud accounts needed.

### Prerequisites
- Docker & Docker Compose
- Node.js 18+

### 1. Start Local Supabase

```bash
docker-compose up -d
```

Wait for services to be ready (~30 seconds):
```bash
docker-compose logs -f postgres | grep "accepting connections"
```

### 2. Run Database Migration

Once Postgres is ready, run the SQL migration:

```bash
docker exec wedding-planner-postgres-1 psql -U postgres -d postgres -f /dev/stdin < supabase/migrations/001_initial_schema.sql
```

Or manually via Supabase Studio:
- Open http://localhost:3001 (Supabase Studio)
- Go to SQL Editor
- Create new query
- Paste contents of `supabase/migrations/001_initial_schema.sql`
- Click Run

### 3. Install & Run App

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Testing the App

### Sign Up
- Go to http://localhost:3000/signup
- Fill in: intent, partner names, email, password
- Redirect to /dashboard

### Guest List
- From dashboard, click "Guest List"
- Upload CSV or add guests manually
- Copy public guest form link

### Public Guest Form
- Visit the link (e.g., http://localhost:3000/guest/[coupleId])
- Anyone can add themselves without login
- RSVP yes/no

## Services Running

| Service | Port | Purpose |
|---------|------|---------|
| App (Next.js) | 3000 | Your wedding planner app |
| Kong (API Gateway) | 8000 | Supabase API endpoint |
| Supabase Studio | 3001 | Database UI & SQL editor |
| PostgREST | 3001 | REST API (behind Kong) |
| Auth (GoTrue) | 9999 | Auth service (behind Kong) |
| Postgres | 5432 | Database |
| Storage | 5000 | File storage (behind Kong) |
| Realtime | 4000 | Subscriptions (behind Kong) |

## Stopping Services

```bash
docker-compose down
```

To reset data:
```bash
docker-compose down -v
```

## Troubleshooting

**Postgres not starting**
```bash
docker-compose logs postgres
```

**Port already in use**
- Change port in docker-compose.yml (e.g., 8000 → 8001)
- Update `.env.local` NEXT_PUBLIC_SUPABASE_URL

**Migration failed**
- Check Postgres is running: `docker-compose ps`
- Check logs: `docker-compose logs postgres`

**Auth not working**
- Check Kong is running: `docker-compose ps`
- Test API: `curl http://localhost:8000/auth/v1/settings`
- Verify JWT tokens in .env.local

**"Cannot GET /rest/v1/guests"**
- The `guests` table needs to be created via migration
- Check Studio SQL editor to confirm tables exist

## Environment Variables

Pre-configured in `.env.local` to work with local Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  (pre-generated JWT)
SUPABASE_SERVICE_ROLE_KEY=eyJ...      (pre-generated JWT)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

All JWT tokens are pre-generated for local dev (not secure, only for testing).

## Using Supabase Cloud Instead (Optional)

If you want to use cloud instead:

1. Create project at https://app.supabase.com
2. Get API keys from Settings → API
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```
4. Run migration in Supabase SQL Editor
5. `npm run dev`
