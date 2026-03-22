import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createMockClient } from './supabase-mock'

export function createClient() {
  // Use mock client if NEXT_PUBLIC_MOCK_MODE is set
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
    return createMockClient() as any
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
