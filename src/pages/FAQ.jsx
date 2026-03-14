import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/ui/Button'

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openItems, setOpenItems] = useState({})

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'buying', name: 'Buying', icon: '👔' },
    { id: 'selling', name: 'Selling', icon: '💰' },
    { id: 'accounts', name: 'Accounts', icon: '👤' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'safety', name: 'Safety', icon: '🔒' }
  ]

  const faqs = {
    general: [
      {
        question: 'What is BizMarket?',
        answer: 'BizMarket is India\'s premier online marketplace connecting business buyers and sellers. We provide a secure platform for listing, discovering, and transacting business opportunities with professional support throughout the process.'
      },
      {
        question: 'How does BizMarket work?',
        answer: 'Sellers list their businesses with detailed information, financials, and documentation. Buyers browse listings, use filters to find opportunities, connect with sellers through our secure messaging system, conduct due diligence, and complete transactions with our support.'
      },
      {
        question: 'Is BizMarket free to use?',
        answer: 'Basic browsing is free for buyers. Sellers can list businesses with our Basic plan, and we offer premium features for both buyers and sellers through our Professional and Enterprise plans. See our Pricing page for details.'
      },
      {
        question: 'How do I get started?',
        answer: 'Create a free account, complete your profile, and choose your path: browse businesses as a buyer or list your business as a seller. Our platform will guide you through the process step by step.'
      }
    ],
    buying: [
      {
        question: 'How do I find businesses to buy?',
        answer: 'Use our advanced search filters to narrow down opportunities by price, location, industry, revenue, and other criteria. Save your searches and set up alerts for new listings that match your criteria.'
      },
      {
        question: 'What due diligence should I perform?',
        answer: 'Review all provided documentation, verify financials, check legal compliance, understand market position, assess employee relations, and consider growth opportunities. We recommend working with professionals for thorough due diligence.'
      },
      {
        question: 'How do I contact sellers?',
        answer: 'Use our secure messaging system to ask questions, request additional information, and schedule meetings. All communications are encrypted and monitored for quality assurance.'
      },
      {
        question: 'What financing options are available?',
        answer: 'Options include bank loans, NBFC financing, seller financing, investor funding, and personal funds. Our platform provides resources and connections to financing partners.'
      }
    ],
    selling: [
      {
        question: 'How do I list my business?',
        answer: 'Create a seller account, complete your business profile, upload documentation, set your asking price, and publish your listing. Our team reviews listings for quality and may feature exceptional opportunities.'
      },
      {
        question: 'What information should I include?',
        answer: 'Include business description, financial statements (3+ years), owner benefits, growth opportunities, reason for selling, employee information, assets included, and high-quality photos/videos.'
      },
      {
        question: 'How is my business valued?',
        answer: 'Value is based on financial performance, market conditions, assets, growth potential, and industry multiples. We provide free valuation tools and offer professional valuation services.'
      },
      {
        question: 'How long does it take to sell?',
        answer: 'The average time to sale is 45-90 days, depending on price, industry, preparation, and market conditions. Featured listings and premium plans typically sell faster.'
      }
    ],
    accounts: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign Up" in the top right, choose your account type (buyer or seller), provide your information, verify your email/mobile, and complete your profile. The process takes about 5 minutes.'
      },
      {
        question: 'Is account verification required?',
        answer: 'Basic verification is required for all accounts. Enhanced verification (for premium features) requires additional documentation. This ensures platform security and trust.'
      },
      {
        question: 'Can I have both buyer and seller accounts?',
        answer: 'Yes, you can use the same account for both buying and selling. Your dashboard will show relevant features based on your activities.'
      },
      {
        question: 'How do I update my account information?',
        answer: 'Go to your Profile Settings to update personal information, preferences, notification settings, and account security options.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including UPI, Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Digital Wallets (Paytm, PhonePe, Google Pay).'
      },
      {
        question: 'How do transaction fees work?',
        answer: 'We charge a success fee only when a transaction is completed. The fee varies by plan and transaction size. See our Pricing page for detailed fee structure.'
      },
      {
        question: 'Is there an escrow service?',
        answer: 'Yes, we offer secure escrow services for transactions. Funds are held in escrow until all conditions are met, protecting both buyers and sellers.'
      },
      {
        question: 'When do sellers get paid?',
        answer: 'Sellers receive payment after the transaction closes and all conditions are satisfied. With escrow, payment is typically released within 2-3 business days.'
      }
    ],
    safety: [
      {
        question: 'How do you verify businesses?',
        answer: 'We verify business ownership, financial documentation, legal status, GST registration, and other key information. Premium verification includes in-depth checks by our team.'
      },
      {
        question: 'What security measures are in place?',
        answer: 'We use bank-level encryption, secure servers, regular security audits, fraud detection systems, and secure payment processing to protect all users.'
      },
      {
        question: 'How are communications protected?',
        answer: 'All messages are encrypted end-to-end. We monitor communications for suspicious activity and provide reporting tools for any concerns.'
      },
      {
        question: 'What if I encounter a problem?',
        answer: 'Contact our support team immediately. We have dispute resolution processes, mediation services, and can involve legal assistance if needed.'
      }
    ]
  }

  const toggleItem = (category, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }))
  }

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-4">
      {/* Hero Section */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4"
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          Find answers to common questions about buying, selling, and using BizMarket
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full px-4 sm:px-6 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
          />
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-4 sm:right-6 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
              activeCategory === category.id
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-xl sm:text-2xl mb-1 sm:mb-2">{category.icon}</span>
            <span className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        <AnimatePresence>
          {faqs[activeCategory].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(activeCategory, index)}
                className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white pr-6 sm:pr-8">{faq.question}</h3>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform shrink-0 ${
                    openItems[`${activeCategory}-${index}`] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {openItems[`${activeCategory}-${index}`] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Still Have Questions */}
      <div className="bg-linear-to-r from-primary to-indigo-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 text-sm sm:text-base mb-4 sm:mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/support">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-sm sm:text-base">
                Contact Support
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="accent" className="bg-white text-primary hover:bg-gray-100 text-sm sm:text-base">
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ