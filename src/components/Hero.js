'use client'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b",
    alt: "Luxury Iron Door"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    alt: "Modern Iron Gate"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    alt: "Classic Iron Window"
  }
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // 每5秒切换一次

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          style={{ y }}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            transition: { duration: 1 }
          }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-sm px-12 py-8 rounded-lg"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-serif font-bold mb-6 text-center bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent"
          >
            MH Lee Metal Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-center max-w-2xl text-white/90 font-light tracking-wide"
          >
            Crafting Architectural Excellence Since 1990
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-6 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90 px-8 font-medium"
            >
              View Collections
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 px-8 font-medium"
            >
              Book Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 