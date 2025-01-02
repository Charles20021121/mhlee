'use client'
import { motion } from "framer-motion"

const features = [
  {
    title: "Bespoke Design",
    description: "Each piece is uniquely crafted to your specifications",
    icon: "✨"
  },
  {
    title: "Premium Security",
    description: "Advanced locking systems and reinforced construction",
    icon: "🔒"
  },
  {
    title: "Master Craftsmanship",
    description: "Decades of expertise in metalworking",
    icon: "⚒️"
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">The Pinnacle of Excellence</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Uncompromising quality in every detail, from design to installation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center p-8 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl mb-6">🛡️</div>
            <h3 className="text-xl font-semibold mb-4">Superior Security</h3>
            <p className="text-gray-400 font-light">
              Advanced locking mechanisms and reinforced construction for unparalleled protection
            </p>
          </div>
          
          <div className="text-center p-8 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl mb-6">✨</div>
            <h3 className="text-xl font-semibold mb-4">Bespoke Design</h3>
            <p className="text-gray-400 font-light">
              Custom creations tailored to your architectural vision
            </p>
          </div>
          
          <div className="text-center p-8 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl mb-6">🎨</div>
            <h3 className="text-xl font-semibold mb-4">Master Artistry</h3>
            <p className="text-gray-400 font-light">
              Exquisite craftsmanship that transforms security into art
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 