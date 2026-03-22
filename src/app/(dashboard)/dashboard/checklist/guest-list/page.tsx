'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Papa from 'papaparse'

interface Guest {
  id: string
  name: string
  email: string
  rsvp_status: string | null
}

export default function GuestListPage() {
  const router = useRouter()
  const supabase = createClient()
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [coupleId, setCoupleId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const loadGuests = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.push('/login')
        return
      }

      // Get couple ID
      const { data: couple } = await supabase
        .from('couples')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (couple) {
        setCoupleId(couple.id)

        // Load guests
        const { data } = await supabase
          .from('guests')
          .select('*')
          .eq('couple_id', couple.id)
          .order('created_at', { ascending: false })

        if (data) setGuests(data)
      }

      setLoading(false)
    }

    loadGuests()
  }, [router, supabase])

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !coupleId) return

    setUploading(true)
    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results: any) => {
          const rows = results.data as any[]
          const toInsert = rows
            .filter((row) => row.name && row.email)
            .map((row) => ({
              couple_id: coupleId,
              name: row.name || row.Name,
              email: row.email || row.Email,
              rsvp_status: null,
            }))

          if (toInsert.length > 0) {
            const { data, error } = await supabase
              .from('guests')
              .insert(toInsert)
              .select()

            if (error) {
              alert('Error uploading guests: ' + error.message)
            } else if (data) {
              setGuests((prev) => [...data, ...prev])
              alert(`Added ${toInsert.length} guests!`)
            }
          }
          setUploading(false)
        },
      })
    } catch (error) {
      alert('Error parsing CSV')
      setUploading(false)
    }
  }

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coupleId || !formData.name || !formData.email) return

    try {
      const { data, error } = await supabase
        .from('guests')
        .insert({
          couple_id: coupleId,
          name: formData.name,
          email: formData.email,
          rsvp_status: null,
        })
        .select()

      if (error) {
        alert('Error adding guest: ' + error.message)
      } else if (data) {
        setGuests((prev) => [...data, ...prev])
        setFormData({ name: '', email: '' })
        // Keep form open for next entry
      }
    } catch (error) {
      alert('Error adding guest')
    }
  }

  const handleDeleteGuest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id)

      if (error) {
        alert('Error deleting guest')
      } else {
        setGuests((prev) => prev.filter((g) => g.id !== id))
      }
    } catch (error) {
      alert('Error deleting guest')
    }
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/guest/${coupleId}`

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost">← Back</Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Guest List</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-900">{guests.length}</div>
            <p className="text-sm text-gray-600">Total Guests</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-rose-600">{guests.filter((g) => g.rsvp_status === 'yes').length}</div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-400">{guests.filter((g) => !g.rsvp_status).length}</div>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>

        {/* Public Link */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-900 font-medium mb-2">Public Guest Form</p>
          <p className="text-sm text-blue-800 mb-3">
            Share this link with guests who want to add themselves:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 px-3 py-2 border border-blue-300 rounded-lg bg-white text-sm"
            />
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(publicUrl)}
              className="text-sm"
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Import Guests</h2>
          <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-300 hover:bg-rose-50 transition">
            <div className="text-center">
              <div className="text-2xl mb-2">📄</div>
              <p className="text-sm font-medium text-gray-700">
                Drop CSV/Excel file or click to upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Format: name, email columns
              </p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleCSVUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Manual Entry Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Guest Manually</h2>
          <form onSubmit={handleAddGuest} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Guest Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Guest
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2">Form stays open after submit for quick entry</p>
        </div>

        {/* Guest List Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">RSVP</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{guest.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{guest.email}</td>
                    <td className="px-6 py-4 text-sm">
                      {guest.rsvp_status === 'yes' && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          ✓ Yes
                        </span>
                      )}
                      {guest.rsvp_status === 'no' && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          ✗ No
                        </span>
                      )}
                      {!guest.rsvp_status && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {guests.length === 0 && (
            <div className="p-8 text-center text-gray-600">
              <p>No guests yet. Upload a CSV or add them manually.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
