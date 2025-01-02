'use client'
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { categoryApi } from "@/lib/api"
import { Offcanvas } from "@/components/ui/offcanvas"
import { Upload } from "lucide-react"
import Image from "next/image"

export default function CategoryEditForm({ category, open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    slug: ''
  })

  // 当 category 改变时更新表单数据
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image_url: category.image_url || '',
        slug: category.slug || ''
      })
    } else {
      setFormData({
        name: '',
        description: '',
        image_url: '',
        slug: ''
      })
    }
  }, [category])

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // 将非字母数字字符替换为连字符
      .replace(/^-+|-+$/g, '') // 删除开头和结尾的连字符
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updates = { [name]: value }
      
      // 如果更改的是名称，自动生成 slug
      if (name === 'name' && !category) { // 只在创建新分类时自动生成 slug
        updates.slug = generateSlug(value)
      }
      
      return { ...prev, ...updates }
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)

      // 如果已有图片，先删除旧图片
      if (formData.image_url) {
        try {
          // 从 Cloudinary URL 提取 public_id
          // 例如: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/mhlee/categories/image123.jpg
          const match = formData.image_url.match(/\/v\d+\/(.+)\.[^.]+$/)
          if (match) {
            const publicId = match[1] // 获取 mhlee/categories/image123
            console.log('Deleting image with public_id:', publicId)

            // 删除旧图片
            const deleteResponse = await fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ public_id: publicId }),
            })

            if (!deleteResponse.ok) {
              throw new Error('Failed to delete old image')
            }

            const deleteResult = await deleteResponse.json()
            console.log('Delete result:', deleteResult)

            // 清除旧图片 URL
            setFormData(prev => ({
              ...prev,
              image_url: ''
            }))
          }
        } catch (error) {
          console.error('Error deleting old image:', error)
          toast.error('Failed to delete old image')
          return // 如果删除失败，不继续上传新图片
        }
      }

      // 上传新图片
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('folder', 'categories')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      console.log('Upload response:', data)

      setFormData(prev => ({
        ...prev,
        image_url: data.url
      }))

      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error handling image:', error)
      toast.error(error.message || 'Failed to handle image')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        image_url: formData.image_url,
        slug: generateSlug(formData.name)
      }

      console.log('Submitting data:', dataToSubmit)

      if (category?.id) {
        await categoryApi.update(category.id, dataToSubmit)
        toast.success("Category updated successfully")
      } else {
        const result = await categoryApi.create(dataToSubmit)
        console.log('Create result:', result)
        toast.success("Category created successfully")
      }
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error(error.message || "Failed to save category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Offcanvas 
      open={open} 
      onClose={onClose} 
      position="center"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {category ? 'Edit Category' : 'Create Category'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Category Image</Label>
            <div className="relative h-[200px] rounded-lg overflow-hidden bg-gray-100">
              {formData.image_url ? (
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Upload size={40} />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors group">
                <Button
                  type="button"
                  variant="outline"
                  className="relative opacity-0 group-hover:opacity-100 bg-white"
                  disabled={loading}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  {loading ? 'Uploading...' : 'Change Image'}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
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
              placeholder="Enter category description"
              rows={4}
            />
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
              {loading ? 'Saving...' : category?.id ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </div>
    </Offcanvas>
  )
} 