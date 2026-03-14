import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageGallery from '../components/business/ImageGallery'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import { getBusinessById } from '../data/mockData'

const BusinessDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    message: '',
    email: '',
    phone: ''
  })
  
  const business = getBusinessById(Number(id))

  if (!business) {
    return (
      <div className="py-12 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Business not found</h1>
        <Button variant="primary" onClick={() => navigate('/listings')}>
          Back to Listings
        </Button>
      </div>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert('Message sent successfully! We\'ll contact you soon.')
    setContactModalOpen(false)
    setContactForm({ message: '', email: '', phone: '' })
  }

  return (
    <div className="py-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
        <button onClick={() => navigate('/listings')} className="hover:text-primary">
          Listings
        </button>
        <span>/</span>
        <span className="text-gray-400 truncate max-w-50 sm:max-w-none">{business.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Image Gallery */}
          <ImageGallery images={business.images} />

          {/* Business Info */}
          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">{business.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {business.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {business.category}
                    </span>
                  </div>
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary whitespace-nowrap">
                  {formatCurrency(business.price)}
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                <span className="px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs sm:text-sm font-medium">
                  {business.status}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
                  {business.type}
                </span>
                {business.featured && (
                  <span className="px-2 sm:px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs sm:text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Business Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{business.description}</p>
              </div>

              {/* Financials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Card hover={false}>
                  <div className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500 mb-1 sm:mb-2">
                      {formatCurrency(business.revenue)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Annual Revenue</p>
                  </div>
                </Card>
                <Card hover={false}>
                  <div className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500 mb-1 sm:mb-2">
                      {formatCurrency(business.profit)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Annual Profit</p>
                  </div>
                </Card>
                <Card hover={false}>
                  <div className="p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                      {business.employees || 'N/A'}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Employees</p>
                  </div>
                </Card>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Business Details</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    <li className="flex justify-between">
                      <span>Established</span>
                      <span className="font-medium">{business.established}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Location Type</span>
                      <span className="font-medium">Prime Location</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Business Type</span>
                      <span className="font-medium">{business.category}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Transaction Details</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    <li className="flex justify-between">
                      <span>Asking Price</span>
                      <span className="font-medium text-primary">{formatCurrency(business.price)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Price Includes</span>
                      <span className="font-medium">Inventory & Equipment</span>
                    </li>
                    {business.leaseDetails && (
                      <li className="flex justify-between">
                        <span>Lease Terms</span>
                        <span className="font-medium">{business.leaseDetails}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Reason for Selling */}
              {business.reason && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Reason for Selling</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{business.reason}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact Card */}
          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-base sm:text-lg">Interested in this business?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                Get in touch with the seller to discuss details, schedule a visit, or make an offer.
              </p>
              <Button
                variant="primary"
                className="w-full mb-2 sm:mb-3 text-sm"
                onClick={() => setContactModalOpen(true)}
              >
                Contact Seller
              </Button>
              <Button variant="outline" className="w-full text-sm">
                Save Business
              </Button>
            </div>
          </Card>

          {/* Seller Info */}
          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">Seller Information</h3>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-primary to-indigo-700 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">John Sharma</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Verified Seller</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-1">4.9 (24 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>john.sharma@email.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{business.location}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Similar Businesses */}
          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">Similar Businesses</h3>
              <div className="space-y-3 sm:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop"
                      alt="Similar business"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm line-clamp-1">Similar Business {index + 1}</h4>
                      <p className="text-primary font-bold text-xs sm:text-sm">₹1,50,000</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Mumbai, Maharashtra</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Contact Seller"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Your message will be sent directly to {business.title}'s seller
          </p>
          <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Message
              </label>
              <textarea
                className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                rows="4"
                placeholder="I'm interested in your business and would like to learn more about..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                placeholder="you@email.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Phone (Optional)
              </label>
              <input
                type="tel"
                className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                placeholder="+91 98765 43210"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
              />
            </div>
            <div className="flex gap-2 sm:gap-3 pt-2">
              <Button
                variant="primary"
                className="flex-1 text-sm"
                type="submit"
              >
                Send Message
              </Button>
              <Button
                variant="secondary"
                className="flex-1 text-sm"
                type="button"
                onClick={() => setContactModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default BusinessDetail