export const categories = [
  { id: 1, name: 'Retail', count: 42, icon: '🛍️' },
  { id: 2, name: 'Online Business', count: 28, icon: '🌐' },
  { id: 3, name: 'Franchise', count: 19, icon: '🏢' },
  { id: 4, name: 'Restaurant', count: 35, icon: '🍽️' },
  { id: 5, name: 'Manufacturing', count: 17, icon: '🏭' },
  { id: 6, name: 'Service', count: 31, icon: '💼' },
  { id: 7, name: 'Technology', count: 23, icon: '💻' },
  { id: 8, name: 'Healthcare', count: 15, icon: '🏥' },
]

export const businesses = [
  {
    id: 1,
    title: 'Premium Coffee Shop - Bandra',
    category: 'Restaurant',
    price: 2500000, // ₹25 Lakhs
    revenue: 1200000, // ₹12 Lakhs
    profit: 450000, // ₹4.5 Lakhs
    location: 'Mumbai, Maharashtra',
    status: 'Running',
    type: 'Sale',
    description: 'Established coffee shop in prime Bandra location. Fully equipped with modern espresso machines and loyal customer base.',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      'https://images.unsplash.com/photo-1445116572660-06009961b8c1?w=800',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
    ],
    established: 2018,
    employees: 6,
    reason: 'Owner relocation',
    leaseDetails: '5-year lease available',
    featured: true,
    ownerId: '1',
  },
  {
    id: 2,
    title: 'E-commerce Fashion Store',
    category: 'Online Business',
    price: 1500000, // ₹15 Lakhs
    revenue: 3000000, // ₹30 Lakhs
    profit: 900000, // ₹9 Lakhs
    location: 'Remote',
    status: 'Running',
    type: 'Sale',
    description: 'Profitable online fashion store with established brand and 50K+ social media followers.',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ],
    established: 2020,
    employees: 3,
    reason: 'Focus shift to other ventures',
    featured: true,
    ownerId: '2',
    plan: 'premium',
  },
  {
    id: 3,
    title: 'Fitness Center Franchise',
    category: 'Franchise',
    price: 3500000, // ₹35 Lakhs
    revenue: 5000000, // ₹50 Lakhs
    profit: 1500000, // ₹15 Lakhs
    location: 'Bangalore, Karnataka',
    status: 'Running',
    type: 'Lease',
    description: 'Well-established fitness franchise with 2000+ members and modern equipment.',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    ],
    established: 2015,
    employees: 12,
    reason: 'Retirement',
    leaseDetails: '10-year lease remaining',
    ownerId: '3',
  },
  {
    id: 4,
    title: 'Tech Startup - SaaS Platform',
    category: 'Technology',
    price: 7500000, // ₹75 Lakhs
    revenue: 2500000, // ₹25 Lakhs
    profit: 800000, // ₹8 Lakhs
    location: 'Hyderabad, Telangana',
    status: 'Running',
    type: 'Takeover',
    description: 'B2B SaaS platform with enterprise clients and recurring revenue model.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
    established: 2019,
    employees: 8,
    reason: 'Seeking strategic partner',
    featured: true,
    ownerId: '4',
    plan: 'professional',
  },
  {
    id: 5,
    title: 'Boutique Hotel',
    category: 'Service',
    price: 12000000, // ₹1.2 Crore
    revenue: 8000000, // ₹80 Lakhs
    profit: 2500000, // ₹25 Lakhs
    location: 'Goa',
    status: 'Running',
    type: 'Sale',
    description: 'Luxury boutique hotel with 25 rooms, restaurant, and spa facilities.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    ],
    established: 2016,
    employees: 25,
    reason: 'Strategic exit',
    ownerId: '5',
  },
  {
    id: 6,
    title: 'Organic Grocery Store',
    category: 'Retail',
    price: 4500000, // ₹45 Lakhs
    revenue: 6000000, // ₹60 Lakhs
    profit: 1200000, // ₹12 Lakhs
    location: 'Pune, Maharashtra',
    status: 'Running',
    type: 'Sale',
    description: 'Established organic grocery in high-traffic area with loyal customer base.',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    ],
    established: 2017,
    employees: 8,
    reason: 'Health reasons',
    ownerId: '6',
  },
]

export const cities = [
  'Mumbai, Maharashtra', 
  'Delhi', 
  'Bangalore, Karnataka', 
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu', 
  'Kolkata, West Bengal', 
  'Pune, Maharashtra', 
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh'
]

export const businessTypes = ['Sale', 'Lease', 'Takeover', 'Partnership']
export const businessStatus = ['Running', 'Closed', 'Dormant']

// Helper function to get categories with dynamic counts
export const getCategoriesWithCounts = (businessesList) => {
  const categoryCounts = {}
  businessesList.forEach(business => {
    categoryCounts[business.category] = (categoryCounts[business.category] || 0) + 1
  })

  return categories.map(category => ({
    ...category,
    count: categoryCounts[category.name] || 0
  }))
}

// Helper function to add a new business
export const addBusiness = (newBusiness) => {
  const businessesList = [...businesses, newBusiness]
  return businessesList
}

// Helper function to get recently viewed businesses
export const getRecentlyViewed = (user) => {
  if (!user) return []
  const viewed = JSON.parse(localStorage.getItem(`recentlyViewed_${user.id}`)) || []
  return viewed
}

// Helper function to add to recently viewed
export const addToRecentlyViewed = (user, business) => {
  if (!user) return
  const viewed = JSON.parse(localStorage.getItem(`recentlyViewed_${user.id}`)) || []
  const updated = [business, ...viewed.filter(b => b.id !== business.id)].slice(0, 10)
  localStorage.setItem(`recentlyViewed_${user.id}`, JSON.stringify(updated))
}

// Helper function to get saved businesses
export const getSavedBusinesses = (user) => {
  if (!user) return []
  const saved = JSON.parse(localStorage.getItem(`saved_${user.id}`)) || []
  return saved
}

// Helper function to save/unsave a business
export const toggleSaveBusiness = (user, business) => {
  if (!user) return false
  const saved = JSON.parse(localStorage.getItem(`saved_${user.id}`)) || []
  const isSaved = saved.some(b => b.id === business.id)
  
  if (isSaved) {
    // Remove from saved
    const updated = saved.filter(b => b.id !== business.id)
    localStorage.setItem(`saved_${user.id}`, JSON.stringify(updated))
    return false
  } else {
    // Add to saved
    const updated = [...saved, business]
    localStorage.setItem(`saved_${user.id}`, JSON.stringify(updated))
    return true
  }
}

// Helper function to get all businesses (combines mock data with localStorage)
export const getAllBusinesses = () => {
  const storedBusinesses = JSON.parse(localStorage.getItem('businesses')) || []
  const allBusinesses = [...businesses, ...storedBusinesses]
  return allBusinesses
}

// Helper function to get business by ID
export const getBusinessById = (id) => {
  const allBusinesses = getAllBusinesses()
  return allBusinesses.find(b => b.id === id) || null
}

// Helper function to convert USD to INR (approximate conversion)
export const convertToINR = (usdAmount) => {
  return Math.round(usdAmount * 83) // Approximate conversion rate
}

// Default export with all functions
export default {
  categories,
  businesses,
  cities,
  businessTypes,
  businessStatus,
  getCategoriesWithCounts,
  addBusiness,
  getRecentlyViewed,
  addToRecentlyViewed,
  getSavedBusinesses,
  toggleSaveBusiness,
  getAllBusinesses,
  getBusinessById,
  convertToINR,
}