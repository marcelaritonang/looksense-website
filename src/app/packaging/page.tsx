'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MessageCircle } from 'lucide-react'
import { ShoppingBag, Package, Gift } from 'lucide-react'
import PageTransition from '@/components/PageTransition'

export default function PackagingPage() {
 const packages = [
   {
     title: "Basic Package",
     price: "Free",
     features: [
       "Basic Fashion Detection",
       "Style Analysis",
       "Limited Categories",
       "Standard Support"
     ],
     icon: <ShoppingBag className="w-12 h-12 text-[#FF4820] mb-4" />
   },
   {
     title: "Pro Package",
     price: "$9.99/month",
     features: [
       "Advanced Fashion Detection",
       "Detailed Style Analysis",
       "All Categories Access",
       "Priority Support",
       "Trend Predictions",
       "Style Recommendations"
     ],
     icon: <Package className="w-12 h-12 text-[#FF4820] mb-4" />
   },
   {
     title: "Enterprise",
     price: "Custom",
     features: [
       "Custom Fashion Detection",
       "API Access",
       "Dedicated Support",
       "Custom Integration",
       "Advanced Analytics",
       "White Label Solution"
     ],
     icon: <Gift className="w-12 h-12 text-[#FF4820] mb-4" />
   }
 ]

 return (
  <PageTransition>
   <div className="min-h-screen bg-[#F5F5F3]">
     <Navbar />
     <main className="container mx-auto px-4 pt-24 pb-12">
       {/* Header Section */}
       <div className="text-center mb-16">
         <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
           Choose Your Package
         </h1>
         <p className="text-gray-600 max-w-2xl mx-auto text-lg">
           Select the perfect package that suits your needs. From basic fashion detection 
           to enterprise solutions, we&apos;ve got you covered.
         </p>
       </div>

       {/* Packages Grid */}
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
         {packages.map((pkg, index) => (
           <div 
             key={index}
             className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#FFA2B6]/20"
           >
             {/* Icon */}
             <div className="flex justify-center">
               {pkg.icon}
             </div>

             {/* Title & Price */}
             <div className="text-center mb-6">
               <h3 className="text-2xl font-bold text-gray-800 mb-2">
                 {pkg.title}
               </h3>
               <p className="text-[#FF4820] text-xl font-semibold">
                 {pkg.price}
               </p>
             </div>

             {/* Features List */}
             <ul className="space-y-3">
               {pkg.features.map((feature, idx) => (
                 <li 
                   key={idx}
                   className="flex items-center text-gray-600"
                 >
                   <svg 
                     className="w-5 h-5 text-[#FF4820] mr-2" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                   >
                     <path 
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       strokeWidth={2} 
                       d="M5 13l4 4L19 7" 
                     />
                   </svg>
                   {feature}
                 </li>
               ))}
             </ul>

             {/* Action Button */}
             <button className="w-full mt-8 py-3 px-6 bg-gradient-to-r from-[#E43D12] to-[#D6536D] text-white rounded-lg hover:opacity-90 transition-all font-medium">
               Get Started
             </button>
           </div>
         ))}
       </div>

       {/* Additional Information */}
       <div className="mt-20 text-center">
         <h2 className="text-3xl font-bold text-gray-800 mb-6">
           Need a Custom Solution?
         </h2>
         <p className="text-gray-600 max-w-2xl mx-auto mb-8">
           Contact us to discuss your specific requirements. We&apos;ll create a tailored 
           package that perfectly matches your needs.
         </p>
         <button className="py-3 px-8 bg-[#FF4820] text-white rounded-lg hover:bg-opacity-90 transition-all font-medium">
         <a 
          href="https://wa.me/+6281398517263" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-3 px-8 bg-[#FF4820] text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          Contact Sales
        </a>
         </button>
       </div>
     </main>
     <Footer />
   </div>
   </PageTransition>
 )
}