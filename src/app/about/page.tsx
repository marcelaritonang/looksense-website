// src/app/about/page.tsx
'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import PageTransition from '@/components/PageTransition'

export default function AboutPage() {
  return (
    <PageTransition>
    <div className="min-h-screen bg-[#F5F5F3]">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-8">About Us</h1>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 border border-[#FFA2B6]/20">
            {/* Team Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Developers:</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Marcel Aritonang</li>
                    <li>Haqi Ammal</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* About Project Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">About LookSense</h2>
              <p className="text-gray-600 leading-relaxed">
                LookSense is an AI-powered fashion detection platform developed at Institut
                Teknologi Sepuluh Nopember, Surabaya. Our system leverages advanced deep
                learning algorithms to analyze and identify various fashion items and styles.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Email:</h3>
                  <p className="text-gray-600">marcelaritonang1303@gmail.com</p>
                  <p className="text-gray-600">haqi.ammal@gmail.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Phone:</h3>
                  <p className="text-gray-600">+62 8139 851 7263</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Address:</h3>
                  <p className="text-gray-600">
                    Institut Teknologi Sepuluh Nopember<br />
                    Surabaya, Indonesia
                  </p>
                </div>
              </div>
            </section>

            {/* Back to Home Button */}
            <div className="text-center">
            <Link href="/" className="inline-block px-8 py-3 bg-gradient-to-r from-[#E43D12] to-[#D6536D] text-white rounded-lg hover:opacity-90 transition-all">
                Back to Home
            </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  )
}