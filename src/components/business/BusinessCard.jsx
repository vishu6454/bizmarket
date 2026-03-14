import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const BusinessCard = ({ business }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link to={`/business/${business.id}`}>
      <Card className="group h-full hover:shadow-lg transition-all duration-300  bg-white dark:bg-gray-800" >
        <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg sm:rounded-t-xl bg-white dark:bg-gray-800">
          <img
            src={business.images[0] || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop'}
            alt={business.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {business.featured && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white dark:bg-gray-800">
              <Badge variant="accent" className="text-xs">Featured</Badge>
            </div>
          )}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 space-y-1 bg-white dark:bg-gray-800">
            <Badge variant="primary" className="text-xs">{business.type}</Badge>
            <Badge variant={business.status === 'Running' ? 'success' : 'secondary'} className="text-xs">
              {business.status}
            </Badge>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between mb-2 sm:mb-3 bg-white dark:bg-gray-800">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1 bg-white dark:bg-gray-800">
              {business.title}
            </h3>
            <span className="text-lg sm:text-xl font-bold text-primary bg-white dark:bg-gray-800">
              {formatCurrency(business.price)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 bg-white dark:bg-gray-800">
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

          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3 bg-white dark:bg-gray-800 ">
            <div className="space-y-0.5 sm:space-y-1 bg-white dark:bg-gray-800 ">
              <p className="text-xs text-gray-500 dark:text-gray-400">Annual Revenue</p>
              <p className="font-semibold text-green-600 dark:text-green-500 text-sm">
                {formatCurrency(business.revenue)}
              </p>
            </div>
            <div className="space-y-0.5 sm:space-y-1 bg-white dark:bg-gray-800 ">
              <p className="text-xs text-gray-500 dark:text-gray-400">Annual Profit</p>
              <p className="font-semibold text-green-600 dark:text-green-500 text-sm">
                {formatCurrency(business.profit)}
              </p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2 sm:mb-3">
            {business.description}
          </p>

          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Est. {business.established}
            </span>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-primary font-semibold flex items-center gap-1 text-xs sm:text-sm"
            >
              View Details
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BusinessCard