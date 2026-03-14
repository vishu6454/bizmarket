import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { categories, cities, businessTypes, businessStatus } from '../data/mockData'

const ListBusiness = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    category: '',
    description: '',
    location: '',
    established: new Date().getFullYear(),
    employees: 1,
    
    // Step 2: Financials
    price: '',
    revenue: '',
    profit: '',
    type: 'Sale',
    status: 'Running',
    
    // Step 3: Details
    reason: '',
    leaseDetails: '',
    facilities: [],
    financingOptions: [],
    
    // Step 4: Contact
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    showContactInfo: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleMultiSelect = (name, value) => {
    const current = formData[name]
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    setFormData({
      ...formData,
      [name]: updated,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    setImages([...images, ...newImages].slice(0, 10)) // Limit to 10 images
  }

  const handleRemoveImage = (id) => {
    setImages(images.filter(img => img.id !== id))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Create business object
    const newBusiness = {
      id: Date.now(),
      ...formData,
      images: images.map(img => img.preview),
      featured: false,
      createdAt: new Date().toISOString(),
      views: 0,
      inquiries: 0,
      // Convert strings to numbers
      price: Number(formData.price),
      revenue: Number(formData.revenue),
      profit: Number(formData.profit),
      employees: Number(formData.employees),
      established: Number(formData.established),
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem('user'))
    
    if (user) {
      // Add to user's listings
      const userListings = JSON.parse(localStorage.getItem(`listings_${user.id}`)) || []
      userListings.push({
        ...newBusiness,
        status: 'Active',
        lastUpdated: new Date().toISOString().split('T')[0],
      })
      localStorage.setItem(`listings_${user.id}`, JSON.stringify(userListings))
      
      // Add to global businesses list
      const allBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
      allBusinesses.push(newBusiness)
      localStorage.setItem('businesses', JSON.stringify(allBusinesses))
    } else {
      // Add to localStorage for demo
      const allBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
      allBusinesses.push(newBusiness)
      localStorage.setItem('businesses', JSON.stringify(allBusinesses))
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Business listed successfully!')
      navigate('/seller-dashboard')
    }, 2000)
  }

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Tell us about your business' },
    { number: 2, title: 'Financials', description: 'Set price and financial details' },
    { number: 3, title: 'Details', description: 'Add more information' },
    { number: 4, title: 'Photos & Contact', description: 'Upload images and contact info' },
  ]

  const facilities = [
    'Parking Available',
    'Public Transport Access',
    'Warehouse Space',
    'Office Space',
    'Retail Space',
    'Kitchen Facilities',
    'Outdoor Seating',
    'Delivery Service',
    'Online Presence',
    'POS System',
    'Security System',
  ]

  const financingOptions = [
    'Seller Financing Available',
    'Bank Financing Available',
    'SBA Loan Eligible',
    'Owner Will Carry',
    'All Cash Preferred',
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s.number}
                </div>
                <div className="hidden md:block">
                  <p className={`font-medium ${
                    step >= s.number ? 'text-primary' : 'text-gray-500'
                  }`}>
                    Step {s.number}
                  </p>
                  <h3 className="font-bold text-dark">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block h-0.5 w-16 ${
                    step > s.number ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          {/* Mobile Step Title */}
          <div className="md:hidden mt-6 text-center">
            <h3 className="text-xl font-bold text-dark">{steps[step - 1].title}</h3>
            <p className="text-gray-600">{steps[step - 1].description}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-8">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Downtown Coffee Shop"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="">Select Location</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Describe your business, including history, operations, unique selling points, and growth opportunities..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established *
                      </label>
                      <input
                        type="number"
                        name="established"
                        value={formData.established}
                        onChange={handleChange}
                        min="1900"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees
                      </label>
                      <input
                        type="number"
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Financials */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asking Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="250000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Revenue *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="revenue"
                          value={formData.revenue}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="120000"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Profit *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="profit"
                          value={formData.profit}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="45000"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        {businessTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        {businessStatus.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Selling *
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Explain why you're selling the business..."
                      required
                    />
                  </div>

                  {formData.type === 'Lease' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lease Details
                      </label>
                      <input
                        type="text"
                        name="leaseDetails"
                        value={formData.leaseDetails}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., 5-year lease remaining"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Facilities & Amenities
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {facilities.map(facility => (
                        <label key={facility} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.facilities.includes(facility)}
                            onChange={() => handleMultiSelect('facilities', facility)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{facility}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Financing Options
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {financingOptions.map(option => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.financingOptions.includes(option)}
                            onChange={() => handleMultiSelect('financingOptions', option)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Photos & Contact */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Business Photos *
                      <span className="text-gray-500 text-sm ml-2">(Upload up to 10 images)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600 mb-2">Drag & drop images or click to browse</p>
                        <p className="text-gray-500 text-sm mb-4">Recommended: High-quality photos of interior, exterior, and operations</p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current.click()}
                        >
                          Browse Files
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Image Previews */}
                    {images.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-3">
                          Uploaded Images ({images.length}/10)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {images.map((img) => (
                            <div key={img.id} className="relative group">
                              <img
                                src={img.preview}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => handleRemoveImage(img.id)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <p className="text-xs text-gray-500 truncate mt-1">{img.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-dark">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="showContactInfo"
                        checked={formData.showContactInfo}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Show contact information publicly on listing
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8 pt-8 border-t border-gray-200">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  variant="primary"
                  className={step > 1 ? 'flex-1' : 'w-full'}
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {step === 4 ? 'Listing Business...' : 'Saving...'}
                    </span>
                  ) : (
                    step === 4 ? 'List Business' : 'Continue'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Tips */}
        <div>
          <Card className="sticky top-24">
            <div className="p-6">
              <h3 className="font-bold text-dark mb-4">Listing Tips</h3>
              
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Be specific</span> with your business name to attract the right buyers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Choose the right category</span> to reach your target audience
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Write a detailed description</span> highlighting key strengths and opportunities
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price competitively</span> based on industry multiples and recent sales
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Be accurate</span> with financial information. Buyers will verify during due diligence
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Select appropriate status</span> to set clear expectations for buyers
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Honesty builds trust</span> when explaining your reason for selling
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Highlight facilities</span> that add value to the business
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Financing options</span> can make your business more accessible to buyers
                    </p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">High-quality photos</span> increase interest by 40%
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-600">
                      Show <span className="font-medium">interior, exterior, equipment, and happy customers</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-600">
                      Provide <span className="font-medium">accurate contact information</span> for serious inquiries
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help? <a href="#" className="text-primary font-medium hover:underline">Contact our support team</a>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ListBusiness