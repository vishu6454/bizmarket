import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const RecentlyViewed = ({ businesses }) => {
  if (!businesses || businesses.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Recently Viewed</h3>
        <Link to="/buyer-dashboard" className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </Link>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {businesses.slice(0, 5).map((business, index) => (
          <motion.div
            key={business.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
              <img
                src={business.images?.[0] || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400'}
                alt={business.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate">{business.title}</h4>
              <p className="text-primary font-bold text-xs sm:text-sm">₹{business.price?.toLocaleString('en-IN') || '0'}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{business.location}</p>
            </div>
            <Link to={`/business/${business.id}`}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed