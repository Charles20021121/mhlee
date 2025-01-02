import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <Link href="/products">
        <Button>Back to Products</Button>
      </Link>
    </div>
  )
} 