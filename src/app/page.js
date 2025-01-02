import Hero from "@/components/Hero"
import Features from "@/components/Features"
import ProductShowcase from "@/components/ProductShowcase"
import BrandStory from "@/components/BrandStory"
import FadeIn from "@/components/FadeIn"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FadeIn>
        <Features />
      </FadeIn>
      <ProductShowcase />
      <FadeIn>
        <BrandStory />
      </FadeIn>
    </main>
  )
}
