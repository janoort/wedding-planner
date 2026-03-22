// Mock Supabase client for development
import { mockCouple, mockGuests, mockUser } from './mock-data'

let guestList = [...mockGuests]

export const createMockClient = () => {
  return {
    auth: {
      getUser: async () => {
        await new Promise((r) => setTimeout(r, 100)) // Simulate network delay
        return { data: { user: mockUser }, error: null }
      },
      signUp: async (options: any) => {
        await new Promise((r) => setTimeout(r, 200))
        return { data: { user: mockUser }, error: null }
      },
      signInWithPassword: async (options: any) => {
        await new Promise((r) => setTimeout(r, 200))
        return { data: { user: mockUser }, error: null }
      },
      signOut: async () => {
        await new Promise((r) => setTimeout(r, 100))
        return { error: null }
      },
    },
    from: (table: string) => {
      if (table === 'couples') {
        return {
          select: () => ({
            eq: () => ({
              single: async () => {
                await new Promise((r) => setTimeout(r, 100))
                return { data: mockCouple, error: null }
              },
            }),
          }),
          insert: async (data: any) => {
            await new Promise((r) => setTimeout(r, 150))
            return { data: [{ ...data, id: 'new-couple-' + Date.now() }], error: null }
          },
        }
      }

      if (table === 'guests') {
        return {
          select: () => ({
            eq: () => ({
              order: () => ({
                then: async (cb: Function) => {
                  await new Promise((r) => setTimeout(r, 100))
                  cb({ data: guestList, error: null })
                  return { data: guestList, error: null }
                },
              }),
            }),
          }),
          insert: async (data: any) => {
            await new Promise((r) => setTimeout(r, 150))
            const newGuest = Array.isArray(data)
              ? data.map((g: any) => ({ ...g, id: 'new-guest-' + Math.random() }))
              : { ...data, id: 'new-guest-' + Math.random() }
            if (Array.isArray(newGuest)) {
              guestList = [...guestList, ...newGuest]
            } else {
              guestList = [...guestList, newGuest]
            }
            return { data: Array.isArray(newGuest) ? newGuest : [newGuest], error: null }
          },
          delete: () => ({
            eq: async () => {
              await new Promise((r) => setTimeout(r, 100))
              return { error: null }
            },
          }),
        }
      }

      return {}
    },
  }
}
