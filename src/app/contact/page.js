'use client'
import { motion } from "framer-motion"

const contactInfo = [
  {
    title: "Visit Our Showroom",
    details: [
      "123 Iron Art Street",
      "City, State 12345",
      "United States"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Contact Numbers",
    details: [
      "Sales: (555) 123-4567",
      "Support: (555) 765-4321",
      "WhatsApp: +1 555-888-9999"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Visit our showroom to experience our craftsmanship firsthand or reach out 
              to discuss your custom iron door and window needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="text-primary mb-4">{info.icon}</div>
              <h2 className="text-xl font-bold mb-4">{info.title}</h2>
              <ul className="space-y-2">
                {info.details.map((detail, i) => (
                  <li key={i} className="text-gray-600">{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[400px] bg-gray-100 relative">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Google Maps will be embedded here</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/products" 
                className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                View Products
              </a>
              <a 
                href="/about" 
                className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                About Us
              </a>
              <a 
                href="/consumer-info" 
                className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                Consumer Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 