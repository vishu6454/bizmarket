import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BusinessCard from '../components/business/BusinessCard'
import FilterSidebar from '../components/business/FilterSidebar'
import { getAllBusinesses, getCategoriesWithCounts } from '../data/mockData'

const BusinessListing = () => {
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [allBusinesses, setAllBusinesses] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    type: '',
    status: '',
    search: '',
  })
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [maxHeight, setMaxHeight] = useState('auto')

  useEffect(() => {
    const businesses = getAllBusinesses()
    setAllBusinesses(businesses)
    setFilteredBusinesses(businesses)
    setCategories(getCategoriesWithCounts(businesses))
    
    // Calculate max height based on filter sidebar height
    const calculateMaxHeight = () => {
      if (window.innerWidth >= 1024) {
        const filterSection = document.getElementById('filter-section')
        if (filterSection) {
          setMaxHeight(`${filterSection.offsetHeight}px`)
        }
      } else {
        setMaxHeight('auto')
      }
    }
    
    calculateMaxHeight()
    window.addEventListener('resize', calculateMaxHeight)
    
    return () => window.removeEventListener('resize', calculateMaxHeight)
  }, [])

  useEffect(() => {
    let results = allBusinesses

    if (filters.category) {
      results = results.filter(b => b.category === filters.category)
    }
    if (filters.minPrice) {
      results = results.filter(b => b.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      results = results.filter(b => b.price <= Number(filters.maxPrice))
    }
    if (filters.location) {
      results = results.filter(b => b.location.includes(filters.location))
    }
    if (filters.type) {
      results = results.filter(b => b.type === filters.type)
    }
    if (filters.status) {
      results = results.filter(b => b.status === filters.status)
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(b =>
        b.title.toLowerCase().includes(searchLower) ||
        b.description.toLowerCase().includes(searchLower) ||
        b.location.toLowerCase().includes(searchLower)
      )
    }

    setFilteredBusinesses(results)
  }, [filters, allBusinesses])

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      type: '',
      status: '',
      search: '',
    })
  }

  const updateBusinesses = () => {
    const businesses = getAllBusinesses()
    setAllBusinesses(businesses)
    setCategories(getCategoriesWithCounts(businesses))
  }

  return (
    <div className="py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-white">Filters & Search</span>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <FilterSidebar 
                    filters={filters} 
                    setFilters={setFilters} 
                    onClear={clearFilters}
                    categories={categories}
                    onClose={() => setMobileFilterOpen(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:w-1/4" id="filter-section">
          <div className="sticky top-24">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              onClear={clearFilters}
              categories={categories}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Search and Results Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Business Listings</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {filteredBusinesses.length} businesses found
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full sm:w-48 lg:w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
              {Object.entries(filters).map(([key, value]) => {
                if (value && key !== 'search' && key !== 'minPrice' && key !== 'maxPrice') {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {value}
                      <button
                        onClick={() => setFilters({ ...filters, [key]: '' })}
                        className="hover:text-primary/80"
                      >
                        ×
                      </button>
                    </span>
                  )
                }
                return null
              })}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  ₹{filters.minPrice || '0'} - ₹{filters.maxPrice || '∞'}
                  <button
                    onClick={() => setFilters({ ...filters, minPrice: '', maxPrice: '' })}
                    className="hover:text-primary/80"
                  >
                    ×
                  </button>
                </span>
              )}
              {(Object.values(filters).some(v => v)) && (
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium ml-1"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Business Grid */}
          <AnimatePresence>
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" style={{ maxHeight: maxHeight, overflowY: 'auto' }}>
                {filteredBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BusinessCard business={business} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-16"
              >
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No businesses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-primary to-indigo-700 text-white rounded-lg font-medium hover:shadow-lg transition-shadow text-sm sm:text-base"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default BusinessListing