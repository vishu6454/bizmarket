// pages/Blog.js
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const Blog = () => {
  const featuredPost = {
    title: 'The Ultimate Guide to Buying Your First Business',
    excerpt: 'Learn the step-by-step process of acquiring your first business, from finding opportunities to closing the deal.',
    author: 'Sarah Johnson',
    date: 'Dec 15, 2023',
    readTime: '8 min read',
    category: 'Buying Guide',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
    featured: true
  }

  const posts = [
    {
      title: '10 Red Flags When Evaluating a Business',
      excerpt: 'Learn to identify warning signs before making an investment decision.',
      author: 'Michael Chen',
      date: 'Dec 10, 2023',
      readTime: '5 min read',
      category: 'Due Diligence',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop'
    },
    {
      title: 'How to Value a Service Business',
      excerpt: 'Discover the key metrics and valuation methods for service-based businesses.',
      author: 'David Wilson',
      date: 'Dec 5, 2023',
      readTime: '6 min read',
      category: 'Valuation',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
    },
    {
      title: 'Exit Strategies for Small Business Owners',
      excerpt: 'Planning your exit? Explore different strategies for maximizing your business sale.',
      author: 'Emily Roberts',
      date: 'Nov 28, 2023',
      readTime: '7 min read',
      category: 'Selling',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop'
    },
    {
      title: 'Financing Options for Business Acquisition',
      excerpt: 'A comprehensive guide to SBA loans, seller financing, and other funding options.',
      author: 'James Miller',
      date: 'Nov 20, 2023',
      readTime: '9 min read',
      category: 'Financing',
      image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop'
    },
    {
      title: 'The Importance of Due Diligence',
      excerpt: 'Why thorough due diligence is critical and what to look for during the process.',
      author: 'Lisa Thompson',
      date: 'Nov 15, 2023',
      readTime: '6 min read',
      category: 'Due Diligence',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop'
    },
    {
      title: 'Building a Business Purchase Team',
      excerpt: 'The essential professionals you need on your side when buying a business.',
      author: 'Robert Garcia',
      date: 'Nov 10, 2023',
      readTime: '5 min read',
      category: 'Buying Guide',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop'
    }
  ]

  const categories = ['All', 'Buying Guide', 'Selling', 'Valuation', 'Due Diligence', 'Financing', 'Success Stories']

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          BizMarket Blog
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert insights, guides, and success stories for business buyers and sellers
        </p>
      </div>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12 hover:shadow-md transition-shadow"
      >
        <div className="md:flex">
          <div className="md:w-2/5">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-3/5 p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {featuredPost.category}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
            <p className="text-gray-600 text-lg mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                  {featuredPost.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{featuredPost.author}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <Button variant="primary">Read Article</Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-gray-600">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{post.author}</div>
                    <div className="text-xs text-gray-600">{post.date}</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter for the latest insights and opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white"
            />
            <Button variant="accent" className="bg-white text-blue-700 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Blog