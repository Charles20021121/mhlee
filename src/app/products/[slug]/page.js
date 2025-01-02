import { productApi } from '@/lib/api'
import ProductDetails from './ProductDetails'
import ProductNotFound from './ProductNotFound'

export default async function ProductPage({ params }) {
  const product = await productApi.getBySlug(params.slug)
  
  if (!product) {
    return <ProductNotFound />
  }

  return <ProductDetails product={product} />
} 