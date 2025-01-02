export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Classic Iron Door Series",
      description: "Exquisite carved design, durable and sturdy",
      image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7"
    },
    {
      id: 2,
      name: "Premium Window Guard",
      description: "Elegant protection for your windows",
      image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5"
    },
    {
      id: 3,
      name: "Security Gate Collection",
      description: "Beautiful and secure entrance solutions",
      image: "https://images.unsplash.com/photo-1506126799754-92bc47fc5d78"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Products will be fetched from Supabase */}
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                {/* Product images will be loaded from Cloudinary */}
                <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 