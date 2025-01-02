'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { categoryApi } from '@/lib/api'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        const { count } = await supabase
          .from('products')
          .select('*', { count: 'exact' })
        
        const categories = await categoryApi.getAll()
        
        setStats({
          categories: categories.length,
          products: count || 0
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Categories</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{stats.categories}</p>
            <Link href="/admin/categories">
              <Button>Manage Categories</Button>
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Products</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{stats.products}</p>
            <Link href="/admin/products">
              <Button>Manage Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 