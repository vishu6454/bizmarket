import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const SupportCenter = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('contact')
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'support' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      responseTime: 'Within 24 hours',
      icon: '✉️',
      details: 'support@bizmarket.in',
      action: () => window.location.href = 'mailto:support@bizmarket.in?subject=Support%20Request'
    },
    {
      title: 'Phone Support',
      description: 'Speak with our team',
      responseTime: 'Mon-Fri, 9am-6pm IST',
      icon: '📞',
      details: '+91 98765 43210',
      action: () => window.location.href = 'tel:+919876543210'
    },
    {
      title: 'Live Chat',
      description: 'Instant messaging support',
      responseTime: 'Within 5 minutes',
      icon: '💬',
      details: 'Available on website',
      action: () => setIsLiveChatOpen(true)
    },
    {
      title: 'Schedule a Call',
      description: 'Book a consultation',
      responseTime: 'By appointment',
      icon: '📅',
      details: '30-60 minute sessions',
      action: () => navigate('/support?tab=contact')
    }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    // Add user message
    setChatMessages(prev => [...prev, { id: Date.now(), text: newMessage, sender: 'user' }])
    setNewMessage('')
    
    // Simulate support response
    setTimeout(() => {
      const responses = [
        'I understand your concern. Let me check that for you.',
        'Thanks for providing that information. One moment please.',
        'I\'ll help you resolve this issue right away.',
        'Let me connect you with a specialist for this matter.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages(prev => [...prev, { id: Date.now(), text: randomResponse, sender: 'support' }])
    }, 1000)
  }

  const supportTopics = [
    {
      category: 'Account & Profile',
      issues: [
        'Creating an account',
        'Verifying your profile',
        'Updating information',
        'Account security'
      ]
    },
    {
      category: 'Buying a Business',
      issues: [
        'Searching for businesses',
        'Making an offer',
        'Due diligence',
        'Financing options'
      ]
    },
    {
      category: 'Selling a Business',
      issues: [
        'Listing your business',
        'Setting the right price',
        'Negotiating offers',
        'Closing the sale'
      ]
    },
    {
      category: 'Payments & Fees',
      issues: [
        'Transaction fees',
        'Payment methods',
        'Escrow services',
        'Refund requests'
      ]
    }
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
          Support Center
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
          We're here to help you succeed. Get support for any questions or issues.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 overflow-x-auto">
        {[
          { id: 'contact', label: 'Contact Support' },
          { id: 'topics', label: 'Support Topics' },
          { id: 'resources', label: 'Resources' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 sm:px-6 py-2 sm:py-3 font-medium border-b-2 transition-colors text-sm sm:text-base ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contact Support Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={method.action}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-primary to-indigo-700 rounded-lg sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl mb-3 sm:mb-4 mx-auto">
                  {method.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 sm:mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{method.description}</p>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-2 sm:mb-3">{method.responseTime}</div>
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{method.details}</div>
                <Button variant="outline" className="w-full mt-3 sm:mt-4 text-xs sm:text-sm">
                  Choose This Method
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Send us a Message</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Subject
                </label>
                <select className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white">
                  <option>Select a topic</option>
                  <option>Account Issues</option>
                  <option>Buying Questions</option>
                  <option>Selling Questions</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="Describe your issue or question in detail..."
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
                />
                <label className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  I agree to receive follow-up communications regarding my inquiry
                </label>
              </div>
              
              <Button variant="primary" className="w-full text-sm sm:text-base" onClick={() => alert('Message sent! We\'ll get back to you soon.')}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Live Chat Modal */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Live Chat Support</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Online</p>
              </div>
              <button
                onClick={() => setIsLiveChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  className="px-4"
                >
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Support Topics Tab */}
      {activeTab === 'topics' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {supportTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
              >
                <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-3 sm:mb-4">{topic.category}</h3>
                <div className="space-y-2 sm:space-y-3">
                  {topic.issues.map((issue, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      onClick={(e) => {
                        e.preventDefault()
                        alert(`Redirecting to ${issue} support page`)
                      }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base group-hover:text-primary">{issue}</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Support */}
          <div className="bg-linear-to-r from-red-600 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-2xl sm:text-4xl">🚨</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Urgent Support Needed?</h3>
                  <p className="text-red-100 text-sm sm:text-base">
                    For immediate assistance with critical issues affecting your transaction
                  </p>
                </div>
              </div>
              <Button variant="accent" className="bg-white text-red-700 hover:bg-gray-100 text-sm sm:text-base" onClick={() => window.location.href = 'tel:+919876543210'}>
                Emergency Support
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                title: 'Help Center Articles',
                description: 'Detailed guides and tutorials',
                count: '150+ articles',
                icon: '📚',
                action: () => alert('Opening Help Center')
              },
              {
                title: 'Video Tutorials',
                description: 'Step-by-step video guides',
                count: '45 videos',
                icon: '🎥',
                action: () => alert('Opening Video Tutorials')
              },
              {
                title: 'Webinars & Workshops',
                description: 'Live and recorded sessions',
                count: 'Monthly events',
                icon: '🎤',
                action: () => alert('Viewing Upcoming Webinars')
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-primary to-indigo-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl mb-3 sm:mb-4">
                  {resource.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 sm:mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{resource.description}</p>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-3 sm:mb-4">{resource.count}</div>
                <Button variant="outline" className="w-full mt-2 sm:mt-4 text-xs sm:text-sm" onClick={resource.action}>
                  Browse Resources
                </Button>
              </div>
            ))}
          </div>

          {/* Status Page */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">System Status</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Current platform status and updates</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-700 dark:text-green-400 text-sm sm:text-base">All Systems Operational</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {[
                { service: 'Platform', status: 'Operational', uptime: '99.9%' },
                { service: 'Payments', status: 'Operational', uptime: '99.8%' },
                { service: 'Messaging', status: 'Operational', uptime: '99.7%' }
              ].map((item, index) => (
                <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{item.service}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-green-700 dark:text-green-400">{item.status}</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Uptime: {item.uptime}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Hours */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
              <div className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Email Support</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">24/7</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
              <div className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Phone Support</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Mon-Fri, 9am-6pm IST</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
              <div className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Live Chat</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Mon-Sun, 8am-10pm IST</div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Our average response time is under 2 hours for urgent matters and within 24 hours for general inquiries.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupportCenter