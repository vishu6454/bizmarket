// pages/SellerDashboard.js
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getAllBusinesses } from '../data/mockData'

const SellerDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('listings')
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      loadListings(parsedUser.id)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const loadListings = (userId) => {
    const userListings = JSON.parse(localStorage.getItem(`listings_${userId}`)) || []
    const allBusinesses = getAllBusinesses()
    
    // Filter businesses that belong to this user
    const userBusinesses = allBusinesses.filter(b => 
      userListings.some(l => l.id === b.id) || b.ownerId === userId
    )
    
    setListings(userBusinesses.map(business => ({
      ...business,
      status: business.status || 'Active',
      views: business.views || Math.floor(Math.random() * 1000),
      inquiries: business.inquiries || Math.floor(Math.random() * 20),
      lastUpdated: business.lastUpdated || 'Today'
    })))
  }

  useEffect(() => {
    const totalListings = listings.length
    const activeListings = listings.filter(l => l.status === 'Active').length
    const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0)
    const totalInquiries = listings.reduce((sum, l) => sum + (l.inquiries || 0), 0)
    
    setStats({
      totalListings,
      activeListings,
      totalViews: totalViews.toLocaleString(),
      totalInquiries,
    })
  }, [listings])

  const handleAddListing = () => {
    navigate('/list-business')
  }

  const handleQuickAdd = () => {
    const newBusiness = {
      id: Date.now(),
      title: 'New Business Listing',
      category: 'Service',
      price: 100000,
      revenue: 200000,
      profit: 50000,
      location: 'New York, NY',
      status: 'Running',
      type: 'Sale',
      description: 'Add your business description here',
      images: ['https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop'],
      established: 2020,
      featured: false,
      ownerId: user?.id,
      createdAt: new Date().toISOString(),
      lastUpdated: 'Just now'
    }

    // Add to user's listings
    const userListings = JSON.parse(localStorage.getItem(`listings_${user.id}`)) || []
    userListings.push(newBusiness)
    localStorage.setItem(`listings_${user.id}`, JSON.stringify(userListings))

    // Add to global businesses
    const allBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
    allBusinesses.push(newBusiness)
    localStorage.setItem('businesses', JSON.stringify(allBusinesses))

    // Reload listings
    loadListings(user.id)
  }

  const handleDeleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      // Remove from user's listings
      const userListings = JSON.parse(localStorage.getItem(`listings_${user.id}`)) || []
      const updatedUserListings = userListings.filter(listing => listing.id !== id)
      localStorage.setItem(`listings_${user.id}`, JSON.stringify(updatedUserListings))

      // Remove from global businesses
      const allBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
      const updatedBusinesses = allBusinesses.filter(business => business.id !== id)
      localStorage.setItem('businesses', JSON.stringify(updatedBusinesses))

      // Update state
      setListings(prev => prev.filter(listing => listing.id !== id))
    }
  }

  const handleStatusChange = (id, newStatus) => {
    // Update in user's listings
    const userListings = JSON.parse(localStorage.getItem(`listings_${user.id}`)) || []
    const updatedUserListings = userListings.map(listing => 
      listing.id === id ? { ...listing, status: newStatus, lastUpdated: 'Today' } : listing
    )
    localStorage.setItem(`listings_${user.id}`, JSON.stringify(updatedUserListings))

    // Update in global businesses
    const allBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
    const updatedBusinesses = allBusinesses.map(business => 
      business.id === id ? { ...business, status: newStatus, lastUpdated: 'Today' } : business
    )
    localStorage.setItem('businesses', JSON.stringify(updatedBusinesses))

    // Update state
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, status: newStatus, lastUpdated: 'Today' } : listing
    ))
  }

  const statsData = [
    { label: 'Total Listings', value: stats.totalListings.toString(), change: '+2', icon: '📋' },
    { label: 'Active Listings', value: stats.activeListings.toString(), change: '+1', icon: '✅' },
    { label: 'Total Views', value: stats.totalViews, change: '+24%', icon: '👁️' },
    { label: 'Total Inquiries', value: stats.totalInquiries.toString(), change: '+12%', icon: '💬' },
  ]

  return (
    <div className="py-8">
      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddListing}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-linear-to-r from-blue-600 to-indigo-700 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{user?.name || 'Seller'}</h3>
                <p className="text-gray-600 text-sm">Professional Seller</p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-blue-600 text-sm font-medium mt-1 hover:text-blue-800"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'listings', label: 'My Listings', icon: '📋', count: stats.totalListings },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
                { id: 'inquiries', label: 'Inquiries', icon: '💬', count: stats.totalInquiries },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
              <Button variant="primary" className="w-full" onClick={handleAddListing}>
                + List New Business
              </Button>
              <Button variant="outline" className="w-full" onClick={handleQuickAdd}>
                Quick Add
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your business listings and track performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false} className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeTab === 'listings' && (
            <Card>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Business Listings</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleQuickAdd}>
                      Quick Add
                    </Button>
                    <Button variant="primary" onClick={handleAddListing}>
                      + Add New Listing
                    </Button>
                  </div>
                </div>

                {listings.length > 0 ? (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={listing.images?.[0] || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&auto=format&fit=crop'}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{listing.title}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                              <span className="font-semibold text-blue-600">${listing.price?.toLocaleString() || '0'}</span>
                              <span>•</span>
                              <span>{listing.views?.toLocaleString() || '0'} views</span>
                              <span>•</span>
                              <span>{listing.inquiries || '0'} inquiries</span>
                              <span>•</span>
                              <span>Updated: {listing.lastUpdated || 'Today'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={listing.status}
                            onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Draft" className="text-gray-800">Draft</option>
                            <option value="Active" className="text-green-800">Active</option>
                            <option value="Pending" className="text-amber-800">Pending</option>
                            <option value="Sold" className="text-blue-800">Sold</option>
                          </select>
                          <div className="flex gap-1">
                            <button
                              onClick={() => navigate(`/business/${listing.id}`)}
                              className="p-2 text-gray-400 hover:text-blue-600"
                              title="Preview"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => navigate(`/edit-business/${listing.id}`)}
                              className="p-2 text-gray-400 hover:text-blue-600"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteListing(listing.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-6">Start by creating your first business listing</p>
                    <Button variant="primary" onClick={handleAddListing}>
                      + Create Your First Listing
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard