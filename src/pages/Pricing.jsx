import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const Pricing = () => {
  const navigate = useNavigate()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      name: 'Basic',
      price: { monthly: 999, annual: 799 },
      description: 'For individual buyers and small sellers',
      features: [
        'Browse all businesses',
        'Save up to 50 listings',
        'Basic search filters',
        'Email support',
        '3 business inquiries/month',
        'Basic analytics'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 1999, annual: 1599 },
      description: 'For serious investors and growing sellers',
      features: [
        'Everything in Basic',
        'Unlimited saved listings',
        'Advanced search filters',
        'Priority support',
        'Unlimited inquiries',
        'Advanced analytics',
        'Featured listing (1/month)',
        'Document storage'
      ],
      cta: 'Try Free for 14 Days',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 3999, annual: 3199 },
      description: 'For brokers and large investors',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom analytics dashboard',
        'API access',
        'White-label solutions',
        'Team collaboration tools',
        'Featured listings (unlimited)',
        'Premium verification'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    navigate('/payment', {
      state: {
        plan: plan.name,
        price: plan.price[billingCycle],
        billingCycle: billingCycle,
        features: plan.features
      }
    })
  }

  const addons = [
    { name: 'Featured Listing', price: 499, description: 'Get priority placement in search results' },
    { name: 'Business Valuation', price: 1999, description: 'Professional valuation report' },
    { name: 'Legal Document Review', price: 2999, description: 'Expert review of legal documents' },
    { name: 'Due Diligence Package', price: 4999, description: 'Comprehensive due diligence assistance' }
  ]

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-4">
      {/* Hero Section */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          Choose the plan that's right for you. All plans include core features.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Annual <span className="text-green-600 ml-1">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
              plan.popular
                ? 'border-primary shadow-lg relative'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-linear-to-r from-primary to-indigo-700 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{plan.description}</p>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">₹{plan.price[billingCycle]}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-green-600 text-xs sm:text-sm mt-1">Billed annually: ₹{plan.price.annual * 12}/year</p>
                )}
              </div>
              
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full mb-4 sm:mb-6"
                size="sm"
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.cta}
              </Button>
              
              <div className="space-y-2 sm:space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Addons */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Additional Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {addons.map((addon, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 sm:mb-2">{addon.name}</h3>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">₹{addon.price}</div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{addon.description}</p>
              <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={() => alert(`Added ${addon.name} to cart`)}>
                Add Service
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {[
            {
              question: 'Can I change plans later?',
              answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
            },
            {
              question: 'Is there a free trial?',
              answer: 'Yes, the Professional plan comes with a 14-day free trial. No credit card required.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, UPI, Net Banking, and PayPal.'
            },
            {
              question: 'Do you offer discounts for brokers?',
              answer: 'Yes, we offer special enterprise pricing for brokers and volume users. Contact sales for details.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing