import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BusinessCard from '../components/business/BusinessCard'
import Button from '../components/ui/Button'
import { categories, getAllBusinesses } from '../data/mockData'


const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [premiumAds, setPremiumAds] = useState([])
  
  const allBusinesses = getAllBusinesses()
  const featuredBusinesses = allBusinesses.filter(b => b.featured).slice(0, 4)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      const viewed = JSON.parse(localStorage.getItem(`recentlyViewed_${parsedUser.id}`)) || []
      setRecentlyViewed(viewed.slice(0, 3))
    }

    // Load premium ads (businesses from users with premium plans)
    const ads = allBusinesses
      .filter(business => {
        const businessOwner = JSON.parse(localStorage.getItem(`user_${business.ownerId}`))
        return businessOwner?.plan === 'premium' || businessOwner?.plan === 'professional'
      })
      .slice(0, 2)
    setPremiumAds(ads)
  }, [])

  // Calculate category counts from actual businesses
  const categoryCounts = categories.map(category => {
    const count = allBusinesses.filter(b => b.category === category.name).length
    return { ...category, count }
  })

  const handleAdClick = (businessId) => {
    navigate(`/business/${businessId}`)
  }

  return (
    <div className="space-y-8 sm:space-y-12 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-primary via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            >
              Buy & Sell Businesses{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-amber-400 to-orange-400">
                Made Simple
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg mb-6 sm:mb-8 text-blue-100 max-w-2xl mx-auto"
            >
              Connect with verified buyers and sellers. Your trusted marketplace for business opportunities across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link to="/listings">
                <Button 
                  variant="accent"
                  className="bg-white text-primary hover:bg-gray-100 text-sm sm:text-base"
                >
                  Browse Businesses
                </Button>
              </Link>
              <Link to="/seller-dashboard">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm sm:text-base">
                  Sell Your Business
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Browse by Category</h2>
          <p className="text-gray-600 dark:text-gray-300">Explore businesses by industry and sector</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categoryCounts.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/listings', { state: { category: category.name } })}
              className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">{category.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.count} listings</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Premium Ads */}
      {premiumAds.length > 0 && (
        <section>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Featured Premium Listings</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Premium businesses from verified sellers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {premiumAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAdClick(ad.id)}
                className="bg-linear-to-r from-primary/20 to-indigo-700/20 dark:from-primary/30 dark:to-indigo-700/30 rounded-xl sm:rounded-2xl overflow-hidden border border-primary/30 hover:border-primary cursor-pointer transition-all group"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                      <span className="text-sm sm:text-base">⭐</span>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">PREMIUM LISTING</div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-1">{ad.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-primary">₹{ad.price?.toLocaleString('en-IN')}</div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {ad.location}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Businesses */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Featured Businesses</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Verified premium listings from trusted sellers</p>
          </div>
          <Link to="/listings">
            <Button variant="outline" className="text-xs sm:text-sm">
              View All Businesses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <BusinessCard business={business} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Viewed (Only for logged in users) */}
      {user && recentlyViewed.length > 0 && (
        <section>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Recently Viewed</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Continue exploring businesses you checked</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentlyViewed.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/business/${business.id}`)}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img
                    src={business.images?.[0] || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop'}
                    alt={business.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                      ₹{business.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">{business.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="truncate">{business.location}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-primary">View Again →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Promotional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-xl sm:rounded-2xl bg-linear-to-br from-primary to-indigo-700 text-white p-4 sm:p-6"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Premium Seller Package</h3>
              <p className="text-blue-100 text-sm sm:text-base mb-3 sm:mb-4">
                Get featured placement, professional photography, and priority support to sell faster.
              </p>
              <Link to="/pricing">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-xs sm:text-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-600 to-teal-700 text-white p-4 sm:p-6"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Free Business Valuation</h3>
              <p className="text-emerald-100 text-sm sm:text-base mb-3 sm:mb-4">
                Get an expert valuation of your business with zero obligation.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-xs sm:text-sm">
                Get Valuation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="rounded-xl sm:rounded-2xl bg-linear-to-r from-gray-900 to-gray-800 text-white text-center py-8 sm:py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-lg">
            Join thousands of successful entrepreneurs today
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/seller-dashboard">
              <Button variant="accent" className="bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base">
                List Your Business
              </Button>
            </Link>
            <Link to="/listings">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm sm:text-base">
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home