'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isAdminPage = pathname.startsWith('/admin')
  if (isAdminPage) return null

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/consumer-info", label: "Consumer Info" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
        isScrolled ? 'shadow' : ''
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
            MH Lee
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Admin
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden fixed inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out",
            isOpen ? "top-16 opacity-100" : "-top-full opacity-0"
          )}
        >
          <nav className="flex flex-col py-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 