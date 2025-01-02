'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAdminPage = pathname.startsWith('/admin')

  if (isAdminPage) {
    return null
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
        isScrolled ? 'shadow' : ''
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
            MH Lee
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/consumer-info"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Consumer Info
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 