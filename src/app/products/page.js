'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { categoryApi } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProductsPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryApi.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115"
          alt="Products Hero"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white w-full px-6 sm:px-8 md:px-12 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-lg">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6">
                Our Collections
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200">
                Discover our range of meticulously crafted iron works, where each piece 
                tells a story of artisanal excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <div className="group h-full">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                      {/* 背景图片 */}
                      {category.image_url ? (
                        <Image
                          src={category.image_url}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <svg 
                            className="w-16 h-16 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                            />
                          </svg>
                        </div>
                      )}

                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* 内容 */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* 顶部内容 */}
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-white mb-2">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-200 line-clamp-2">
                            {category.description}
                          </p>
                        </div>

                        {/* 底部内容 */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            {category.products?.length || 0} Products
                          </span>
                          <Button 
                            size="sm"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                          >
                            Explore
                            <svg 
                              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No collections found</h3>
            <p className="text-gray-600">Please check back later for our latest collections.</p>
          </div>
        )}
      </div>
    </div>
  )
} 