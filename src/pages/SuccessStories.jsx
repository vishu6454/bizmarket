// pages/SuccessStories.js
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Former Tech Employee, Now Restaurant Owner',
      business: 'Downtown Bistro',
      location: 'Austin, TX',
      story: 'After 10 years in tech, I wanted to pursue my passion for food. Found the perfect bistro on BizMarket and transitioned smoothly within 3 months.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop',
      stats: { revenue: '+40%', timeline: '3 months' }
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Investor Turned Business Owner',
      business: 'E-commerce Store',
      location: 'Remote',
      story: 'Invested in an online business through BizMarket. With proper due diligence and support, grew revenue by 150% in the first year.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      stats: { revenue: '+150%', timeline: '1 year' }
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'First-Time Business Buyer',
      business: 'Coffee Shop Chain',
      location: 'Miami, FL',
      story: 'Always dreamed of owning a coffee shop. Found a turnkey operation on BizMarket and received excellent support throughout the process.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop',
      stats: { revenue: '+60%', timeline: '8 months' }
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Serial Entrepreneur',
      business: 'Manufacturing Unit',
      location: 'Chicago, IL',
      story: 'Sold my third manufacturing business through BizMarket. The platform connected me with serious buyers and handled negotiations professionally.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      stats: { salePrice: '$2.5M', timeline: '4 months' }
    }
  ]

  const stats = [
    { value: '500+', label: 'Businesses Sold' },
    { value: '$150M+', label: 'Total Value' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '45 days', label: 'Avg. Time to Sale' }
  ]

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Success Stories
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real entrepreneurs. Real businesses. Real success.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
          >
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{story.name}</h3>
                  <p className="text-gray-600">{story.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{story.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">{story.business}</h4>
                </div>
                <p className="text-gray-700">{story.story}</p>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-50 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                  <div className="font-bold text-blue-700">{story.stats.revenue}</div>
                </div>
                <div className="bg-green-50 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-600">Timeline</div>
                  <div className="font-bold text-green-700">{story.stats.timeline}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Your Success Story</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of entrepreneurs who have achieved their dreams through BizMarket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              List Your Business
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Browse Opportunities
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessStories