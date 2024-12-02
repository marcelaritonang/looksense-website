// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Fashion Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Fashion Categories</h3>
            <ul className="space-y-3">
              {[
                'Bags',
                'Bottomwear',
                'Dress',
                'Headwear',
                'Shoes',
                'Topwear',
                'Watches'
              ].map((category) => (
                <li key={category} className="flex items-center space-x-2 hover:text-[#FFA2B6] transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <a href={`/category/${category.toLowerCase()}`} className="hover:ml-2 transition-all">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <p>marcelaritonang1303@gmail.com</p>
            <p >haqi.ammal@gmail.com</p>
            <p>Phone: +62 8139 851 7263</p>
            <p>Address: Institut Teknologi Sepuluh Nopember Surabaya </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-[#FFA2B6] transition-colors">About Us</a></li>
              <li><a href="/terms" className="hover:text-[#FFA2B6] transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-[#FFA2B6] transition-colors">Privacy Policy</a></li>
              <li><a href="/faq" className="hover:text-[#FFA2B6] transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-sm text-gray-300">Subscribe to get fashion updates and news</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-lg flex-1 text-white"
              />
              <button className="px-4 py-2 bg-[#D6536D] rounded-lg hover:bg-[#E43D12] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 LookSense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}