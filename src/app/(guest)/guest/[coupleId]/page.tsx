'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function PublicGuestPage({ params }: { params: { coupleId: string } }) {
  const supabase = createClient()
  const [couple, setCouple] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    rsvp: 'yes',
  })

  useEffect(() => {
    const loadCouple = async () => {
      const { data } = await supabase
        .from('couples')
        .select('*')
        .eq('id', params.coupleId)
        .single()

      if (data) setCouple(data)
      setLoading(false)
    }

    loadCouple()
  }, [params.coupleId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from('guests').insert({
        couple_id: params.coupleId,
        name: form.name,
        email: form.email,
        rsvp_status: form.rsvp,
      })

      if (error) throw error

      setSubmitted(true)
      setForm({ name: '', email: '', rsvp: 'yes' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      alert('Error adding yourself to the guest list')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!couple) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Wedding not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-rose-600 mb-2">💍</h1>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {couple.partner1_name} & {couple.partner2_name}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We'd love for you to celebrate with us!
        </p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center text-sm">
            ✓ Thanks for joining! We'll send updates to your email.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Will you be joining us?
            </label>
            <div className="space-y-2">
              {['yes', 'no'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="rsvp"
                    value={option}
                    checked={form.rsvp === option}
                    onChange={(e) => setForm({ ...form, rsvp: e.target.value })}
                    className="w-4 h-4 text-rose-600"
                  />
                  <span className="ml-3 text-gray-700 capitalize">{option === 'yes' ? '✓ Yes, I\'ll be there!' : '✗ Sorry, can\'t make it'}</span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full text-lg py-3">
            Add Me to the Guest List
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Your info is secure and only shared with {couple.partner1_name} and {couple.partner2_name}
        </p>
      </div>
    </div>
  )
}
