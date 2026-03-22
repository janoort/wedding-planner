'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [couple, setCouple] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCouple = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('couples')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error loading couple:', error)
      } else {
        setCouple(data)
      }
      setLoading(false)
    }

    loadCouple()
  }, [router, supabase])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!couple) {
    return <div className="flex items-center justify-center min-h-screen">No couple found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {couple.partner1_name} & {couple.partner2_name}
            </h1>
            <p className="text-gray-600 mt-1">Your wedding awaits</p>
          </div>
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Checklist */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Wedding Checklist</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Guest List */}
          <Link href="/dashboard/checklist/guest-list">
            <div className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest List</h3>
              <p className="text-gray-600 text-sm">
                Upload your guests and track RSVPs
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-rose-600 font-medium text-sm">Get started →</span>
              </div>
            </div>
          </Link>

          {/* Website Design (coming soon) */}
          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 opacity-50 cursor-not-allowed">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Design</h3>
            <p className="text-gray-600 text-sm">
              Pick a design for your wedding site
            </p>
            <div className="mt-4 flex justify-end">
              <span className="text-gray-500 font-medium text-sm">Coming soon</span>
            </div>
          </div>

          {/* Save the Dates (coming soon) */}
          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 opacity-50 cursor-not-allowed">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Save the Dates</h3>
            <p className="text-gray-600 text-sm">
              Design and send save the dates
            </p>
            <div className="mt-4 flex justify-end">
              <span className="text-gray-500 font-medium text-sm">Coming soon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
