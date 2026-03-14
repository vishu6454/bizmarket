import { categories, cities, businessTypes, businessStatus } from '../../data/mockData'

const FilterSidebar = ({ filters, setFilters, onClear, categories: dynamicCategories, onClose }) => {
  const activeCategories = dynamicCategories || categories

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear All
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              × Close
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Category */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Category</h4>
          <div className="space-y-1 max-h-48 sm:max-h-60 overflow-y-auto pr-2">
            {activeCategories.map((category) => (
              <label key={category.id} className="flex items-center justify-between gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.name}
                    onChange={() => {
                      setFilters({ ...filters, category: category.name })
                      if (onClose) onClose()
                    }}
                    className="text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{category.name}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Price Range</h4>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Min Price</label>
              <div className="relative">
                <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Max Price</label>
              <div className="relative">
                <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  placeholder="10,000,000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Location</h4>
          <select
            value={filters.location}
            onChange={(e) => {
              setFilters({ ...filters, location: e.target.value })
              if (onClose) onClose()
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Locations</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Business Type */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Business Type</h4>
          <div className="space-y-1">
            {businessTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === type}
                  onChange={() => {
                    setFilters({ ...filters, type })
                    if (onClose) onClose()
                  }}
                  className="text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Business Status</h4>
          <div className="space-y-1">
            {businessStatus.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="status"
                  checked={filters.status === status}
                  onChange={() => {
                    setFilters({ ...filters, status })
                    if (onClose) onClose()
                  }}
                  className="text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar