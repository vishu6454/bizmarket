import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const PaymentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  useEffect(() => {
    if (!location.state) {
      navigate('/pricing')
    } else {
      setPaymentData(location.state)
    }
  }, [location, navigate])

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      
      // Update user's plan in localStorage
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        user.plan = paymentData.plan.toLowerCase()
        user.planExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        localStorage.setItem('user', JSON.stringify(user))
      }
      
      alert(`Payment successful! You are now subscribed to ${paymentData.plan} plan.`)
      navigate('/')
    }, 2000)
  }

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', description: 'Pay using any UPI app' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks' },
    { id: 'wallet', name: 'Wallet', icon: '💰', description: 'Paytm, PhonePe, Google Pay' },
  ]

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-gray-600 dark:text-gray-400">Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600 dark:text-gray-400">Review your order and select payment method</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{paymentData.plan} Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {paymentData.billingCycle === 'monthly' ? 'Monthly subscription' : 'Annual subscription (Save 20%)'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">₹{paymentData.price}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {paymentData.billingCycle === 'monthly' ? 'per month' : 'per month, billed annually'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Plan Features:</h4>
                  {paymentData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Payment Method</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary'
                    }`}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{method.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{method.description}</div>
                  </button>
                ))}
              </div>

              {/* Payment Details Form */}
              <div className="mt-6 space-y-4">
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="username@upi"
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Bank
                    </label>
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white">
                      <option value="">Choose your bank</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="p-4 sm:p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Plan Price</span>
                  <span className="font-medium">₹{paymentData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                  <span className="font-medium">₹{(paymentData.price * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{(paymentData.price * 1.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-3"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${(paymentData.price * 1.18).toFixed(2)}`
                )}
              </Button>

              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                By completing your purchase, you agree to our{' '}
                <a href="/legal" className="text-primary hover:underline">Terms of Service</a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage