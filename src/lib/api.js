import { supabase } from './supabase'
import { uploadImage } from './cloudinary'

// 分类相关API
export const categoryApi = {
  // 创建分类
  async create({ name, description, image }) {
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-')
      let imageUrl = null
      
      if (image) {
        imageUrl = await uploadImage(image, slug)
      }

      const { data, error } = await supabase
        .from('categories')
        .insert([
          { 
            name, 
            slug, 
            description, 
            image_url: imageUrl 
          }
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  },

  // 获取所有分类
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // 通过slug获取分类
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(*)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  // 删除分类
  async delete(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // 更新分类
  async update(id, { name, description, image }) {
    try {
      const updates = {
        name,
        description,
      }

      if (image) {
        const imageUrl = await uploadImage(image)
        updates.image_url = imageUrl
      }

      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },

  create: async (data) => {
    console.log('API create data:', data)
    const { data: category, error } = await supabase
      .from('categories')
      .insert([{
        name: data.name,
        slug: data.slug,
        description: data.description,
        image_url: data.image_url
      }])
      .select()
      .single()

    if (error) throw error
    return category
  },

  update: async (id, data) => {
    console.log('API update data:', data)
    const { data: category, error } = await supabase
      .from('categories')
      .update({
        name: data.name,
        slug: data.slug,
        description: data.description,
        image_url: data.image_url
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return category
  },
}

// 产品相关API
export const productApi = {
  // 创建产品
  async create({ categoryId, name, description, features, specifications, images, price, isFeatured }) {
    try {
      // 首先验证分类是否存在
      const { data: category } = await supabase
        .from('categories')
        .select()
        .eq('id', categoryId)
        .single()

      if (!category) {
        throw new Error('Category not found')
      }

      const slug = name.toLowerCase().replace(/\s+/g, '-')
      
      // 处理图片上传
      let imageUrls = []
      if (images?.length) {
        imageUrls = await Promise.all(
          images.map(image => uploadImage(image, `products/${slug}`))
        )
      }

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            category_id: categoryId,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            description: description?.trim() || null,
            features,
            specifications,
            images: imageUrls,
            price: price || null,
            is_featured: isFeatured
          }
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  // 获取分类下的所有产品
  async getByCategoryId(categoryId) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(slug)')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(product => ({
      ...product,
      category_slug: product.categories.slug
    }))
  },

  // 获取精选产品
  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // 通过slug获取产品详情
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  // 删除产品
  async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // 更新产品
  async update(id, { categoryId, name, description, features, specifications, images, price, isFeatured }) {
    try {
      const updates = {
        category_id: categoryId,
        name,
        description: description?.trim() || null,
        features,
        specifications,
        price,
        is_featured: isFeatured
      }

      if (images?.length) {
        const imageUrls = await Promise.all(images.map(image => uploadImage(image)))
        updates.images = imageUrls
      }

      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  // 获取所有产品
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
} 