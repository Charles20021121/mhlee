'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-[#1A1A1A]">
        <Image
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f"
          alt="Workshop"
          fill
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl px-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B]">
              MH LEE METAL WORKS
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-4 text-[#FFD700]">
              万豪鐵業工程有限公司
            </p>
            <p className="text-lg md:text-xl text-[#E5E5E5] max-w-2xl mx-auto">
              Crafting Excellence in Metal Works Since 1990
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-[#1A1A1A]">Our Expertise</h2>
            <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
              Comprehensive solutions in premium metalwork, combining traditional craftsmanship with modern innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Stainless Steel & Iron Works", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115" },
              { title: "Security Solutions", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde" },
              { title: "Custom Designs", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea" },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FFFFFF] p-12 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-8">
                <span className="text-4xl font-serif font-bold text-[#DAA520]">01</span>
                <h3 className="text-3xl font-serif font-bold ml-4 text-[#1A1A1A]">Our Mission</h3>
              </div>
              <div className="space-y-6 text-lg">
                <p className="text-[#1A1A1A] font-medium">提高员工技能,控制材料品质以及严格控制生产成本</p>
                <p className="text-[#4A4A4A]">To improve technician skills, quality control on the materials and tight control on the production costs</p>
                <p className="text-[#4A4A4A]">Meningkatkan kemahiran kakitangan, mengawal kualiti bahan-bahan dan mengawal-ketat terhadap kos pengeluaran</p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FFFFFF] p-12 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-8">
                <span className="text-4xl font-serif font-bold text-[#DAA520]">02</span>
                <h3 className="text-3xl font-serif font-bold ml-4 text-[#1A1A1A]">Our Vision</h3>
              </div>
              <div className="space-y-6 text-lg">
                <p className="text-[#1A1A1A] font-medium">让客户得到安全,实用,美观和美好体验</p>
                <p className="text-[#4A4A4A]">To provide safety to the customers, practical, elegant and deliver wonderful experience</p>
                <p className="text-[#4A4A4A]">Memberi keselamatan kepada pelanggan-pelanggan, praktikal, menarik dan memberi pengalaman yang indah</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objective */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-serif font-bold mb-12 text-[#1A1A1A]">Our Objective</h2>
            <div className="space-y-6 text-lg">
              <p className="text-[#1A1A1A] font-medium">让消费者享有实惠，品质保证的铁门窗花</p>
              <p className="text-[#4A4A4A]">To let customers enjoy affordable, quality warranty iron grilles</p>
              <p className="text-[#4A4A4A]">Membolehkan pelanggan-pelanggan menikmati harga gril-gril besi yang berpatutan dan jaminan kualiti</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-24 px-4 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-[#FFD700]">Start Your Project Today</h2>
            <p className="text-xl text-[#E5E5E5] mb-12 max-w-2xl mx-auto">
              Let us transform your vision into reality with our expert craftsmanship
            </p>
            <Button 
              size="lg"
              className="bg-[#DAA520] text-white hover:bg-[#B8860B] px-12 transition-colors duration-300"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 