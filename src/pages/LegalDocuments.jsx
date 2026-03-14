// pages/LegalDocuments.js
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const LegalDocuments = () => {
  const documents = [
    {
      title: 'Terms of Service',
      description: 'The rules and guidelines for using BizMarket platform',
      lastUpdated: 'December 1, 2023',
      version: 'v3.2',
      sections: 12,
      icon: '📄'
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      lastUpdated: 'December 1, 2023',
      version: 'v2.5',
      sections: 8,
      icon: '🔒'
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies and tracking technologies we use',
      lastUpdated: 'December 1, 2023',
      version: 'v1.8',
      sections: 5,
      icon: '🍪'
    },
    {
      title: 'User Agreement',
      description: 'Contract between you and BizMarket for platform usage',
      lastUpdated: 'November 15, 2023',
      version: 'v4.1',
      sections: 15,
      icon: '🤝'
    },
    {
      title: 'Business Listing Agreement',
      description: 'Terms for listing businesses on our platform',
      lastUpdated: 'November 10, 2023',
      version: 'v2.3',
      sections: 10,
      icon: '📋'
    },
    {
      title: 'Transaction Agreement',
      description: 'Terms governing business transactions through BizMarket',
      lastUpdated: 'November 5, 2023',
      version: 'v3.0',
      sections: 18,
      icon: '💼'
    },
    {
      title: 'Escrow Service Agreement',
      description: 'Terms for using our secure escrow services',
      lastUpdated: 'October 25, 2023',
      version: 'v1.5',
      sections: 7,
      icon: '💰'
    },
    {
      title: 'Dispute Resolution Policy',
      description: 'Process for resolving disputes between users',
      lastUpdated: 'October 20, 2023',
      version: 'v2.1',
      sections: 6,
      icon: '⚖️'
    }
  ]

  const templates = [
    {
      title: 'Non-Disclosure Agreement',
      description: 'Template for protecting confidential information',
      category: 'Legal',
      downloads: '1,245'
    },
    {
      title: 'Letter of Intent',
      description: 'Template for expressing interest in a business',
      category: 'Transaction',
      downloads: '892'
    },
    {
      title: 'Asset Purchase Agreement',
      description: 'Template for business asset purchases',
      category: 'Transaction',
      downloads: '567'
    },
    {
      title: 'Stock Purchase Agreement',
      description: 'Template for stock-based business purchases',
      category: 'Transaction',
      downloads: '423'
    }
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
          Legal Documents
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Important legal agreements, policies, and templates for your business transactions
        </p>
      </div>

      {/* Main Documents */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Platform Policies & Agreements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white text-xl">
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{doc.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Version {doc.version}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{doc.sections} sections</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">Updated {doc.lastUpdated}</span>
                <Button variant="outline" size="sm">
                  View Document
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legal Templates */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Templates</h2>
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                      {template.category}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{template.title}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{template.downloads} downloads</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    Preview
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Need custom legal documents?</p>
            <Button variant="primary">
              Contact Legal Support
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto">
            ⚠️
          </div>
          <h3 className="text-2xl font-bold mb-4">Important Disclaimer</h3>
          <p className="text-blue-100 mb-6">
            These documents are provided for informational purposes only and do not constitute legal advice. 
            We recommend consulting with a qualified attorney before signing any legal documents or making 
            significant business decisions. BizMarket is not a law firm and does not provide legal services.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Find Legal Professionals
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LegalDocuments