'use client'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { productApi, categoryApi } from "@/lib/api"
import { Offcanvas } from "@/components/ui/offcanvas"
import { Upload } from "lucide-react"
import Image from "next/image"

export default function ProductEditForm({ product, open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    features: '',
    specifications: '',
    images: [],
    is_featured: false
  })
  const [imagePreviews, setImagePreviews] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryApi.getAll()
        if (!data || data.length === 0) {
          toast.error('No categories found. Please create a category first.')
        }
        setCategories(data || [])
      } catch (error) {
        console.error('Error loading categories:', error)
        toast.error('Failed to load categories')
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description?.replace(/\n/g, '\n') || '',
        category_id: product.category_id || '',
        price: product.price || '',
        features: (product.features || []).join('\n'),
        specifications: Object.entries(product.specifications || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
        images: product.images || [],
        is_featured: product.is_featured || false
      })
      setImagePreviews(product.images || [])
    } else {
      resetForm()
    }
  }, [product])

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category_id: '',
      price: '',
      features: '',
      specifications: '',
      images: [],
      is_featured: false
    })
    setImagePreviews([])
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    try {
      setLoading(true)

      // 如果是編輯模式且有舊圖片，先刪除舊圖片
      if (formData.images.length > 0) {
        for (const imageUrl of formData.images) {
          const match = imageUrl.match(/\/v\d+\/(.+)\.[^.]+$/)
          if (match) {
            const publicId = match[1]
            await fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ public_id: publicId }),
            })
          }
        }
      }

      // 上傳新圖片
      const uploadPromises = files.map(file => {
        const uploadFormData = new FormData()
        uploadFormData.append('file', file)
        uploadFormData.append('folder', 'products')
        return fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        }).then(res => res.json())
      })

      const results = await Promise.all(uploadPromises)
      const urls = results.map(result => result.url)

      setFormData(prev => ({
        ...prev,
        images: urls
      }))
      setImagePreviews(urls)
      toast.success('Images uploaded successfully')
    } catch (error) {
      console.error('Error handling images:', error)
      toast.error('Failed to upload images')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 添加表單驗證
      if (!formData.category_id) {
        throw new Error('Please select a category')
      }

      if (!formData.name) {
        throw new Error('Please enter a product name')
      }

      const formValues = {
        categoryId: formData.category_id,
        name: formData.name,
        description: formData.description.replace(/\r\n/g, '\n'),
        price: formData.price ? parseFloat(formData.price) : null,
        features: formData.features.split('\n').filter(Boolean),
        specifications: Object.fromEntries(
          formData.specifications
            .split('\n')
            .filter(Boolean)
            .map(line => {
              const [key, value] = line.split(':').map(s => s.trim())
              return [key, value]
            })
        ),
        images: formData.images,
        isFeatured: formData.is_featured
      }

      if (product?.id) {
        await productApi.update(product.id, formValues)
      } else {
        await productApi.create(formValues)
      }

      toast.success(product?.id ? 'Product updated' : 'Product created')
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error(error.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Offcanvas 
      open={open} 
      onClose={onClose} 
      position="center"
      className="w-full max-w-2xl"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {product ? 'Edit Product' : 'Create Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {imagePreviews.map((url, index) => (
                <div 
                  key={index}
                  className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
                disabled={loading}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="resize-y"
              placeholder="Enter product description..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Leave empty for 'Contact for Price'"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              placeholder="Enter each feature on a new line"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">
              Specifications (key: value format, one per line)
            </Label>
            <Textarea
              id="specifications"
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              rows={4}
              placeholder="Material: Iron&#10;Width: 36 inches"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="is_featured">Feature on Homepage</Label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </Offcanvas>
  )
} 