'use client'
import { motion } from "framer-motion"
import Image from "next/image"

export default function ConsumerInfoPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#1A1A1A]">
        <Image
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115"
          alt="Consumer Protection"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
            Consumer Information
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Important Reminders */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#1A1A1A]">Important Reminders</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Chinese Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#DAA520]">诚意提醒</h3>
                <div className="space-y-4 text-[#4A4A4A]">
                  <p>经济不景，消费人应该注意以下几点：</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>避免付现金，应以支票或信用卡，或银行直接转账至公司户口。</li>
                    <li>如付现金前，请联络公司，确认促销员身份，以免受骗。</li>
                    <li>了解公司，应抽出时间参观工厂，展销室，别轻易相信促销员口头保证。</li>
                    <li>应该货比三家，了解用料，确保品质高，价格公道，售后服务。</li>
                    <li>估价之前，请问估价是不是免费，应该是免费的。</li>
                    <li>如遇到不守信用，应即刻报警，和到消费人事务部投诉，以保障消费人的利益。</li>
                  </ul>
                </div>
              </div>

              {/* English Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#DAA520]">Good Faith Reminder</h3>
                <div className="space-y-4 text-[#4A4A4A]">
                  <p>Due to economic recession, consumers should concern the following matters:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Instead of make payment with Cash, please make payment via Cheque, Credit Card or Bank Giro Transfer to our company account.</li>
                    <li>If payment made cash, please inform us for checking sales representatives' identity to avoid defraud.</li>
                    <li>Visit our factory or showroom. Do not easily trust sales representatives' verbal guarantee.</li>
                    <li>Compare with other factories to assure good quality products, reasonable price and after sales service.</li>
                    <li>Make sure price quotation service is free of charge.</li>
                    <li>To protect consumer authority, please report to police or make complaint to Consumer Affair Department if found one does not keep his/her promise in agreement.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Payment Notice */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] text-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#FFD700]">Payment Notice</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p className="font-medium">尊敬的客戶</p>
                <p>如支付現金,請立即發短信或撥電話016-2168675李先生通知，否則敝公司將不會對任何遺失款項負責. 謝謝阁下的合作。</p>
              </div>
              <div className="space-y-4">
                <p className="font-medium">Dear Customer</p>
                <p>If payment make by cash, please inform us by SMS or Call 016-2168675 Mr Lee immediately. Otherwise, we are not responsible on any lost of payment. Thank you for your cooperation.</p>
              </div>
              <div className="space-y-4">
                <p className="font-medium">Pelanggan yang dihormati</p>
                <p>Jika anda membayar secara tunai, sila maklumkan kepada kami melalui SMS atau hubungi 016-2168675 Encik Lee dengan segera. Jika tidak, kami tidak bertanggungjawab atas apa-apa kehilangan pembayaran. Terima kasih atas kerjasama anda.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Product Disclaimer */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#1A1A1A]">Product Disclaimer</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <p className="font-medium text-[#DAA520]">尊敬的客戶</p>
                <p className="text-[#4A4A4A]">图片只供参考，可能与实物是有所相差。货物出门，恕不退还。</p>
              </div>
              <div className="space-y-4">
                <p className="font-medium text-[#DAA520]">Dear Value Customer</p>
                <p className="text-[#4A4A4A]">The picture is for reference only, may be some difference with the physical. Goods sold are not refundable.</p>
              </div>
              <div className="space-y-4">
                <p className="font-medium text-[#DAA520]">Pelanggan yang dihormati</p>
                <p className="text-[#4A4A4A]">Gambar adalah untuk rujukan sahaja, mungkin ada perbezaan dengan fizikal. Barangan yang dijual tidak boleh dikembalikan.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 