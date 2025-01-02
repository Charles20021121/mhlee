'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { productApi, categoryApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NewProductPage() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const router = useRouter()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)
      const data = {
        categoryId: formData.get('category_id'),
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price') ? Number(formData.get('price')) : null,
        features: formData.get('features').split('\n').filter(Boolean),
        specifications: Object.fromEntries(
          formData.get('specifications')
            .split('\n')
            .filter(Boolean)
            .map(line => {
              const [key, value] = line.split(':').map(s => s.trim())
              return [key, value]
            })
        ),
        images: imageFiles,
        isFeatured: formData.get('is_featured') === 'true'
      }

      await productApi.create(data)
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)

    // 创建预览URL
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Product</h1>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 分类选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category_id"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* 图片上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="space-y-4">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {imagePreviews.map((preview, index) => (
                  <div 
                    key={index}
                    className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
              <p className="text-sm text-gray-500">
                You can upload multiple images. PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>

          {/* 基本信息 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (optional)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty for "Contact for Price"
            </p>
          </div>

          {/* 特性列表 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <textarea
              name="features"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter each feature on a new line"
            />
          </div>

          {/* 规格参数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specifications
            </label>
            <textarea
              name="specifications"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter each specification as 'key: value' on a new line&#10;Example:&#10;Material: Iron&#10;Width: 36 inches"
            />
          </div>

          {/* 精选产品 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_featured"
              value="true"
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Display on Homepage
              <span className="text-gray-500 text-xs ml-2">
                (This product will be featured on the homepage carousel)
              </span>
            </label>
          </div>

          {/* 按钮 */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 