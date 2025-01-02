import { categoryApi } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// 获取分类数据
async function getCategory(slug) {
  try {
    const data = await categoryApi.getBySlug(slug)
    return data
  } catch (error) {
    console.error('Error loading category:', error)
    return null
  }
}

export default async function CategoryPage({ params }) {
  try {
    const category = await getCategory(params.slug)

    if (!category) {
      return (
        <div className="min-h-screen pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      )
    }

    // 对产品进行排序（默认按最新排序）
    const sortedProducts = [...(category.products || [])].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    )

    return (
      <div className="min-h-screen pt-16 md:pt-20">
        {/* Category Header */}
        <div className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 rounded-lg max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-square bg-gray-200">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium text-sm sm:text-base">
                        {product.price ? `$${product.price.toLocaleString()}` : 'Contact for Price'}
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <Button size="sm" className="whitespace-nowrap">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Check back later for new products in this category.</p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600">Something went wrong. Please try again later.</p>
        </div>
      </div>
    )
  }
} 