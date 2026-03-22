# Setup Guide

## Option 1: Supabase Cloud (Recommended - Simplest)

1. **Create a Supabase project**
   - Go to https://app.supabase.com
   - Click "New Project"
   - Name: `wedding-planner`
   - Wait for it to initialize (~2 min)

2. **Get your API keys**
   - Project Settings → API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
   - Copy `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

3. **Create the database schema**
   - Go to SQL Editor in Supabase
   - Create new query
   - Paste contents of `supabase/migrations/001_initial_schema.sql`
   - Click Run

4. **Run the app**
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000

## Testing

**Sign up:** http://localhost:3000/signup
- Enter intent, partner names, email, password
- You'll be redirected to `/dashboard`

**Guest List:** Click "Guest List" from dashboard
- Upload CSV or add guests manually
- Copy the public guest form link

**Public Guest Form:** Share the link
- Anyone can add themselves without logging in

## Troubleshooting

**"Auth failed"**
- Double-check your `.env.local` has correct Supabase URL and keys
- Make sure you ran the SQL migration

**"Guests table not found"**
- Go to Supabase SQL Editor
- Paste `supabase/migrations/001_initial_schema.sql` and run it

**"CORS error"**
- This shouldn't happen with Supabase Cloud
- If it does, check your NEXT_PUBLIC_SUPABASE_URL is correct
