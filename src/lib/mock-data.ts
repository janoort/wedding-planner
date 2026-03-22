// Mock data for development
export const mockCouple = {
  id: 'mock-couple-1',
  user_id: 'mock-user-1',
  intent: 'getting-married' as const,
  partner1_name: 'Alice',
  partner2_name: 'Bob',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const mockGuests = [
  {
    id: 'mock-guest-1',
    couple_id: 'mock-couple-1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    rsvp_status: 'yes' as const,
    notes: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mock-guest-2',
    couple_id: 'mock-couple-1',
    name: 'John Smith',
    email: 'john@example.com',
    rsvp_status: 'no' as const,
    notes: 'Out of town',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'mock-guest-3',
    couple_id: 'mock-couple-1',
    name: 'Emma Davis',
    email: 'emma@example.com',
    rsvp_status: null,
    notes: null,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'mock-guest-4',
    couple_id: 'mock-couple-1',
    name: 'Michael Chen',
    email: 'michael@example.com',
    rsvp_status: 'yes' as const,
    notes: null,
    created_at: new Date(Date.now() - 345600000).toISOString(),
    updated_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'mock-guest-5',
    couple_id: 'mock-couple-1',
    name: 'Rachel Park',
    email: 'rachel@example.com',
    rsvp_status: 'yes' as const,
    notes: 'Bringing +1',
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date(Date.now() - 432000000).toISOString(),
  },
]

export const mockUser = {
  id: 'mock-user-1',
  email: 'demo@example.com',
  user_metadata: {
    intent: 'getting-married',
    partner1_name: 'Alice',
    partner2_name: 'Bob',
  },
}
