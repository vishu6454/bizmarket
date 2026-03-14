// components/layout/NotFound.js
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-8xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 mb-10 max-w-xl mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to finding great business opportunities.
        </motion.p>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="relative w-64 h-64 mx-auto">
            <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
              🏢
            </div>
            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
              🔍
            </div>
            <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-4xl animate-pulse">
              💼
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/">
            <Button variant="primary" className="w-full sm:w-auto">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Button>
          </Link>
          <Link to="/listings">
            <Button variant="outline" className="w-full sm:w-auto">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Businesses
            </Button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-200 pt-8"
        >
          <p className="text-gray-600 mb-4">Here are some helpful links instead:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/listings" className="text-blue-600 hover:text-blue-800 font-medium">
              All Listings
            </Link>
            <Link to="/seller-dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Seller Dashboard
            </Link>
            <Link to="/buyer-dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Buyer Dashboard
            </Link>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign In
            </Link>
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign Up
            </Link>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl"
        >
          <p className="text-gray-700 mb-2">
            Can't find what you're looking for?
          </p>
          <p className="text-gray-700">
            Contact our support team at{' '}
            <a href="mailto:support@bizmarket.com" className="text-blue-600 font-semibold hover:underline">
              support@bizmarket.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound