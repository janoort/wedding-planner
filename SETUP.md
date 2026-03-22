# Local Setup Guide

## Option 1: Supabase Cloud (Recommended - Simplest)

1. **Create a Supabase project**
   - Go to https://app.supabase.com
   - Click "New Project"
   - Name it `wedding-planner`, set a password
   - Wait for it to initialize (~2 min)

2. **Get your credentials**
   - Go to Settings → API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
   - Copy `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

3. **Run the database migration**
   - In your Supabase project, go to SQL Editor
   - Click "New Query"
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and click "Run"

4. **Start the app**
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000

## Option 2: Local Supabase (Via Docker)

Not recommended for now — the Docker setup requires the full Supabase stack which is complex. Use Cloud instead.

## Testing the App

1. **Sign up** at http://localhost:3000/signup
   - Fill in intent, partner names, email, password
   - You'll be redirected to `/dashboard`

2. **Guest List** at `/dashboard/checklist/guest-list`
   - Upload a CSV or add guests manually
   - Copy the public guest form link
   - Test it at `/guest/[coupleId]`

3. **Public Guest Form** (no login needed)
   - Accessible at the link from step 2
   - Anyone can add themselves to the guest list

## Env Variables Reference

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

All `NEXT_PUBLIC_*` vars are exposed to the browser (safe for public keys).
Service role and secret keys stay on the server.

## Troubleshooting

**"Could not read Username for github.com"**
- Run `git push origin main` again or use `gh` CLI

**Auth not working**
- Check `.env.local` has correct Supabase URL and keys
- Verify the `couples` table exists in your Supabase project

**Public guest form 404**
- Make sure you're using the exact coupleId from your dashboard
- Check the URL format: `http://localhost:3000/guest/[coupleId]`
