import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-rose-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-rose-600">💍 Vow</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plan your perfect wedding
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage guest lists, timelines, and everything in between. Built for couples who want simplicity.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8">
              Start Planning
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-200 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2026 Vow. Made with 💕.</p>
        </div>
      </footer>
    </div>
  )
}
