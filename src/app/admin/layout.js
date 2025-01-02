'use client'
import AdminNavbar from '@/components/AdminNavbar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
} 