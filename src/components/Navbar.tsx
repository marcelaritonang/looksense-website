// src/components/Navbar.tsx
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#F5F5F3] border-b border-[#FF4820]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[#FF4820] text-2xl font-bold ml-0 sm:ml-10 md:ml-23 lg:ml-25 z-10 pl-20"
            onClick={() => setIsOpen(false)}
          >
            LookSense
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className={`text-gray-900 hover:text-[#FF4820] font-medium relative
                ${pathname === '/' ? 'text-[#FF4820]' : ''}
              `}
            >
              HOME
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF4820] transform origin-left transition-transform duration-300
                ${pathname === '/' ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </Link>
            <Link 
              href="/product" 
              className={`text-gray-900 hover:text-[#FF4820] font-medium relative
                ${pathname === '/product' ? 'text-[#FF4820]' : ''}
              `}
            >
              PRODUCT
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF4820] transform origin-left transition-transform duration-300
                ${pathname === '/product' ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </Link>
            <Link 
              href="/packaging" 
              className={`text-gray-900 hover:text-[#FF4820] font-medium relative
                ${pathname === '/packaging' ? 'text-[#FF4820]' : ''}
              `}
            >
              PACKAGING
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF4820] transform origin-left transition-transform duration-300
                ${pathname === '/packaging' ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </Link>
            <Link 
              href="/about" 
              className={`text-gray-900 hover:text-[#FF4820] font-medium relative
                ${pathname === '/about' ? 'text-[#FF4820]' : ''}
              `}
            >
              ABOUT US
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF4820] transform origin-left transition-transform duration-300
                ${pathname === '/about' ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col items-center gap-4">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`w-full text-center py-2 text-gray-900 hover:text-[#FF4820] font-medium
                  ${pathname === '/' ? 'text-[#FF4820] border-b-2 border-[#FF4820]' : ''}
                `}
              >
                HOME
              </Link>
              <Link 
                href="/product" 
                onClick={() => setIsOpen(false)}
                className={`w-full text-center py-2 text-gray-900 hover:text-[#FF4820] font-medium
                  ${pathname === '/product' ? 'text-[#FF4820] border-b-2 border-[#FF4820]' : ''}
                `}
              >
                PRODUCT
              </Link>
              <Link 
                href="/packaging"
                onClick={() => setIsOpen(false)} 
                className={`w-full text-center py-2 text-gray-900 hover:text-[#FF4820] font-medium
                  ${pathname === '/packaging' ? 'text-[#FF4820] border-b-2 border-[#FF4820]' : ''}
                `}
              >
                PACKAGING
              </Link>
              <Link 
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`w-full text-center py-2 text-gray-900 hover:text-[#FF4820] font-medium
                  ${pathname === '/about' ? 'text-[#FF4820] border-b-2 border-[#FF4820]' : ''}
                `}
              >
                ABOUT US
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}