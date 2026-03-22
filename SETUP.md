# Local Setup Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose (optional, for local Supabase)

## Option 1: Mock Mode (Fastest - No Setup)

No database, no Docker. See the app instantly with stubbed data:

```bash
npm install
npm run dev:mock
```

Visit http://localhost:3000. You can:
- Sign up (fake auth)
- View dashboard with Alice & Bob's wedding
- See pre-populated guest list (5 mock guests)
- Add/remove guests (in memory, resets on refresh)

Perfect for seeing what the app looks like without wrestling with configuration.

## Option 2: Local Supabase

For a real database with auth:

### Prerequisites

- Docker & Docker Compose
- Node.js 18+

## Quick Start

### 1. Start Local Supabase

```bash
docker-compose up -d
```

Wait for Postgres to be ready (~10 seconds):
```bash
docker-compose logs postgres | grep "accepting connections"
```

### 2. Run Database Migration

```bash
docker exec wedding-planner-postgres-1 psql -U postgres -d postgres << 'EOF'
$(cat supabase/migrations/001_initial_schema.sql)
EOF
```

Or use Supabase Studio at http://localhost:3001:
- Go to SQL Editor
- Create new query
- Paste contents of `supabase/migrations/001_initial_schema.sql`
- Click "Run"

### 3. Install & Run App

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## What's Running

| Service | Port | URL |
|---------|------|-----|
| App (Next.js) | 3000 | http://localhost:3000 |
| Supabase Studio | 3001 | http://localhost:3001 |
| PostgREST | 3001 | http://localhost:3001/rest/v1 |
| Auth (GoTrue) | 9999 | http://localhost:8000/auth/v1 |
| Postgres | 5432 | localhost:5432 |

## Testing the App

1. **Sign up** at http://localhost:3000/signup
   - Intent, partner names, email, password
   - Redirects to `/dashboard`

2. **Guest List** from dashboard
   - Upload CSV or add manually
   - Copy public guest form link

3. **Public Guest Form** (shared link)
   - No login required
   - Anyone can RSVP

## Stopping Services

```bash
docker-compose down
```

Reset data:
```bash
docker-compose down -v
```

## Troubleshooting

**Postgres not starting**
```bash
docker-compose logs postgres
```

**Port already in use**
- Change port in docker-compose.yml
- Update NEXT_PUBLIC_SUPABASE_URL in .env.local

**Migration failed**
- Check Postgres: `docker-compose ps`
- Check logs: `docker-compose logs postgres`

**Auth not working**
- Verify containers running: `docker-compose ps`
- Check Studio is accessible: http://localhost:3001

**"Cannot POST /auth/v1/signup"**
- Auth service might not be ready
- Wait 5 seconds and try again
- Check: `docker-compose logs auth`
