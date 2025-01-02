import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function BrandStory() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center mb-12">Our Legacy</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Since 1990, MH Lee Metal Works has been at the forefront of architectural 
              metalwork, creating bespoke iron doors and windows that grace some of the 
              most prestigious properties worldwide.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our commitment to excellence, passed down through generations, combines 
              traditional Asian craftsmanship with modern European design sensibilities, 
              resulting in creations that are both timeless and innovative.
            </p>
            <div className="pt-6">
              <Button variant="outline" size="lg" className="border-gray-300">
                Our Heritage
              </Button>
            </div>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f"
              alt="Our Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 