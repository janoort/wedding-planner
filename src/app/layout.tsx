import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vow - Wedding Planning Made Simple',
  description: 'Plan your wedding with ease. Guest lists, timelines, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
