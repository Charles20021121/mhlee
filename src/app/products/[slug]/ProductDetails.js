'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProductDetails({ product }) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 图片展示 */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              {product.images?.[currentImage] ? (
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                      currentImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 产品信息 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {product.price ? (
              <div className="text-2xl font-bold">
                ${product.price.toLocaleString()}
              </div>
            ) : (
              <div className="text-lg font-medium text-gray-600">
                Contact for Price
              </div>
            )}

            {product.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3">Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(product.specifications || {}).length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3">Specifications</h2>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2">
                      <dt className="font-medium text-gray-600">{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="pt-6 border-t">
              <Link href={`/categories/${product.categories.slug}`}>
                <Button variant="outline" className="w-full">
                  View More {product.categories.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 