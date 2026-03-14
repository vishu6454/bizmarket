import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Profile = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    bio: '',
    location: '',
    investmentRange: '',
    preferredCategories: [],
    avatarUrl: null,
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        mobile: parsedUser.mobile || '',
        bio: parsedUser.bio || 'Entrepreneur and investor with 10+ years of experience.',
        location: parsedUser.location || 'Mumbai, Maharashtra',
        investmentRange: parsedUser.investmentRange || '₹10L - ₹50L',
        preferredCategories: parsedUser.preferredCategories || ['Technology', 'Retail'],
        avatarUrl: parsedUser.avatarUrl || null,
      })
      setAvatarPreview(parsedUser.avatarUrl)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result
        setAvatarPreview(imageUrl)
        setFormData(prev => ({ ...prev, avatarUrl: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        ...formData,
        avatarUrl: avatarPreview,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsEditing(false)
      setIsSaving(false)
      
      // Refresh the page to update avatar in header
      window.location.reload()
    }, 1000)
  }

  const categories = [
    'Technology', 'Retail', 'Restaurant', 'Service',
    'Manufacturing', 'Healthcare', 'Franchise', 'Online Business'
  ]

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-4">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Profile Sidebar */}
        <div className="lg:w-1/3">
          <Card className="p-4 sm:p-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative inline-block mb-3 sm:mb-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-linear-to-br from-primary to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0) || 'U'
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-1 right-1 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-1 sm:mb-2">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-2 sm:mb-3">{user?.email}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Verified Account
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base">{formData.location}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm sm:text-base">{formData.investmentRange}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm sm:text-base">Member since {new Date().getFullYear() - 2}</span>
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
            <h3 className="font-bold text-dark dark:text-white mb-3 sm:mb-4 text-lg">Account Stats</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { label: 'Businesses Viewed', value: '42', icon: '👁️' },
                { label: 'Saved Listings', value: '8', icon: '❤️' },
                { label: 'Sent Inquiries', value: '12', icon: '💬' },
                { label: 'Profile Views', value: '156', icon: '👤' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl">{stat.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-dark dark:text-white text-sm sm:text-base">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="lg:w-2/3">
          <Card className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white">Profile Settings</h2>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false)
                        // Reset form data
                        const storedUser = localStorage.getItem('user')
                        if (storedUser) {
                          const parsedUser = JSON.parse(storedUser)
                          setFormData({
                            name: parsedUser.name || '',
                            email: parsedUser.email || '',
                            mobile: parsedUser.mobile || '',
                            bio: parsedUser.bio || '',
                            location: parsedUser.location || '',
                            investmentRange: parsedUser.investmentRange || '',
                            preferredCategories: parsedUser.preferredCategories || [],
                            avatarUrl: parsedUser.avatarUrl || null,
                          })
                          setAvatarPreview(parsedUser.avatarUrl)
                        }
                      }}
                      className="text-sm"
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      className="text-sm"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                    className="text-sm"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">About You</h3>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white resize-none disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                />
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">Investment Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Investment Range
                    </label>
                    <select
                      name="investmentRange"
                      value={formData.investmentRange}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
                    >
                      <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                      <option value="₹10L - ₹50L">₹10L - ₹50L</option>
                      <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                      <option value="₹1Cr - ₹5Cr">₹1Cr - ₹5Cr</option>
                      <option value="₹5Cr+">₹5Cr+</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Business Categories
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredCategories.includes(category)}
                          onChange={() => {
                            if (!isEditing) return
                            const updated = formData.preferredCategories.includes(category)
                              ? formData.preferredCategories.filter(c => c !== category)
                              : [...formData.preferredCategories, category]
                            setFormData({ ...formData, preferredCategories: updated })
                          }}
                          disabled={!isEditing}
                          className="text-primary focus:ring-primary disabled:opacity-50 w-4 h-4"
                        />
                        <span className={`text-sm ${!isEditing ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">Account Settings</h3>
                <div className="space-y-2 sm:space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-dark dark:text-white text-sm sm:text-base">Change Password</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Update your password regularly</p>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-dark dark:text-white text-sm sm:text-base">Notification Preferences</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Manage email and push notifications</p>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-red-200 dark:border-red-900 rounded-lg hover:border-red-300 dark:hover:border-red-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 text-sm sm:text-base">Delete Account</h4>
                        <p className="text-xs sm:text-sm text-red-500 dark:text-red-400">Permanently delete your account and data</p>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile