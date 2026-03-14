import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import BusinessCard from '../components/business/BusinessCard'
import { businesses as mockBusinesses } from '../data/mockData'

const BuyerDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('saved')
  const [user, setUser] = useState(null)
  const [savedBusinesses, setSavedBusinesses] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [searchAlerts, setSearchAlerts] = useState([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      
      // Load saved businesses from localStorage
      const saved = JSON.parse(localStorage.getItem(`saved_${parsedUser.id}`)) || []
      setSavedBusinesses(saved)
      
      // Load recently viewed from localStorage
      const viewed = JSON.parse(localStorage.getItem(`recentlyViewed_${parsedUser.id}`)) || []
      setRecentlyViewed(viewed)
      
      // Load search alerts
      const alerts = JSON.parse(localStorage.getItem(`alerts_${parsedUser.id}`)) || [
        {
          id: 1,
          name: 'Restaurants in NYC',
          criteria: 'Category: Restaurant, Location: New York',
          matches: 5,
          frequency: 'daily',
        },
        {
          id: 2,
          name: 'Tech Startups',
          criteria: 'Category: Technology, Price: Under $500k',
          matches: 3,
          frequency: 'weekly',
        },
      ]
      setSearchAlerts(alerts)
    } else {
      // Redirect to login if not logged in
      navigate('/login')
    }
  }, [navigate])

  const handleRemoveSaved = (businessId) => {
    const updated = savedBusinesses.filter(b => b.id !== businessId)
    setSavedBusinesses(updated)
    localStorage.setItem(`saved_${user.id}`, JSON.stringify(updated))
  }

  const handleCreateAlert = () => {
    const newAlert = {
      id: searchAlerts.length + 1,
      name: `Custom Alert ${searchAlerts.length + 1}`,
      criteria: 'Custom criteria...',
      matches: 0,
      frequency: 'daily',
    }
    const updated = [...searchAlerts, newAlert]
    setSearchAlerts(updated)
    localStorage.setItem(`alerts_${user.id}`, JSON.stringify(updated))
  }

  const stats = [
    { label: 'Saved Businesses', value: savedBusinesses.length.toString(), icon: '❤️' },
    { label: 'Total Views', value: recentlyViewed.length.toString(), icon: '👁️' },
    { label: 'Active Alerts', value: searchAlerts.length.toString(), icon: '🔔' },
    { label: 'Sent Inquiries', value: '3', icon: '💬' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.avatar || 'B'}
              </div>
              <div>
                <h3 className="font-bold text-dark">{user?.name || 'Buyer'}</h3>
                <p className="text-gray-600 text-sm">Verified Investor</p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-primary text-sm font-medium mt-1"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'saved', label: 'Saved Businesses', icon: '❤️', count: savedBusinesses.length },
                { id: 'viewed', label: 'Recently Viewed', icon: '👁️', count: recentlyViewed.length },
                { id: 'inquiries', label: 'My Inquiries', icon: '💬', count: 3 },
                { id: 'alerts', label: 'Search Alerts', icon: '🔔', count: searchAlerts.length },
                { id: 'preferences', label: 'Preferences', icon: '⚙️' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary'
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

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4">
                <h4 className="font-semibold text-dark">Investment Profile</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Budget:</span> $100k - $500k
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Preferred:</span> Tech & Retail
                  </p>
                  <button className="text-primary text-sm font-medium">
                    Update Preferences
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">Buyer Dashboard</h1>
            <p className="text-gray-600">Track your saved businesses and investment opportunities</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover={false}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                    <span className="text-3xl font-bold text-dark">{stat.value}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Active Tab Content */}
          {activeTab === 'saved' && (
            <Card>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-dark">Saved Businesses</h2>
                  <span className="text-gray-600">{savedBusinesses.length} businesses saved</span>
                </div>

                {savedBusinesses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedBusinesses.map((business) => (
                      <div key={business.id} className="relative">
                        <BusinessCard business={business} />
                        <button
                          onClick={() => handleRemoveSaved(business.id)}
                          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No saved businesses yet</h3>
                    <p className="text-gray-500 mb-6">Start browsing and save businesses you're interested in</p>
                    <Button variant="primary" onClick={() => navigate('/listings')}>
                      Browse Businesses
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === 'viewed' && (
            <Card>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-dark">Recently Viewed</h2>
                  <Button variant="outline" onClick={() => localStorage.removeItem(`recentlyViewed_${user.id}`)}>
                    Clear History
                  </Button>
                </div>

                {recentlyViewed.length > 0 ? (
                  <div className="space-y-4">
                    {recentlyViewed.slice(0, 10).map((business, index) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/business/${business.id}`)}
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={business.images?.[0] || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400'}
                            alt={business.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-dark mb-1">{business.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>${business.price?.toLocaleString() || '0'}</span>
                            <span>•</span>
                            <span>{business.location}</span>
                            <span>•</span>
                            <span>{business.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Viewed {index + 1} day ago</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Again
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👁️</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No recently viewed</h3>
                    <p className="text-gray-500 mb-6">Start browsing businesses to build your history</p>
                    <Button variant="primary" onClick={() => navigate('/listings')}>
                      Start Browsing
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === 'alerts' && (
            <Card>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-dark">Search Alerts</h2>
                  <Button variant="primary" onClick={handleCreateAlert}>
                    + Create New Alert
                  </Button>
                </div>

                <div className="space-y-4">
                  {searchAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-dark mb-1">{alert.name}</h4>
                          <p className="text-sm text-gray-600">{alert.criteria}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {alert.frequency}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {alert.matches} new matches
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Last sent: Today at 9:00 AM</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="secondary" size="sm">
                            View Matches
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard