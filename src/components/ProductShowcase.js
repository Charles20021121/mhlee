'use client'
import { motion } from "framer-motion"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Royal Collection",
    description: "Handcrafted masterpieces with intricate European designs",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    price: "Exclusive Pricing",
  },
  {
    id: 2,
    name: "Modern Luxe Series",
    description: "Contemporary elegance with advanced security features",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    price: "Exclusive Pricing",
  },
  {
    id: 3,
    name: "Heritage Elite",
    description: "Timeless designs inspired by classical architecture",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    price: "Exclusive Pricing",
  }
]

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">Signature Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Each piece is meticulously crafted to become the centerpiece of your home, 
            combining centuries-old artisanship with modern engineering excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-primary font-medium">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 