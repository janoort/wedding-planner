'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function SignUp() {
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    intent: 'getting-married',
    partner1Name: '',
    partner2Name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            intent: form.intent,
            partner1_name: form.partner1Name,
            partner2_name: form.partner2Name,
          },
        },
      })

      if (signUpError) throw signUpError

      // Create couple profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('couples')
          .insert({
            user_id: data.user.id,
            intent: form.intent,
            partner1_name: form.partner1Name,
            partner2_name: form.partner2Name,
          })

        if (profileError) throw profileError
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-rose-600 mb-2">💍 Vow</h1>
          <h2 className="text-2xl font-bold text-gray-900">Start your planning</h2>
          <p className="mt-2 text-sm text-gray-600">Tell us about your wedding</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are you planning?
            </label>
            <select
              value={form.intent}
              onChange={(e) => setForm({ ...form, intent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="getting-married">Getting married</option>
              <option value="planning-for-other">Planning for someone else</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner 1 First Name
              </label>
              <input
                type="text"
                required
                value={form.partner1Name}
                onChange={(e) => setForm({ ...form, partner1Name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner 2 First Name
              </label>
              <input
                type="text"
                required
                value={form.partner2Name}
                onChange={(e) => setForm({ ...form, partner2Name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating account...' : 'Get Started'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-rose-600 hover:text-rose-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
