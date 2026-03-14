import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const SignUp = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    phone: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.userType) {
      newErrors.userType = 'Please select account type'
    }
    
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }
    
    return newErrors
  }

  const handleNext = () => {
    if (step === 1) {
      const validationErrors = validateStep1()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 2) {
      const validationErrors = validateStep2()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
      
      setIsLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        const user = {
          id: '2',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          role: formData.userType,
          avatar: formData.firstName.charAt(0) + formData.lastName.charAt(0),
          phone: formData.phone,
          token: 'mock-jwt-token-67890',
        }
        
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', user.token)
        
        setIsLoading(false)
        
        // Redirect based on user type
        if (formData.userType === 'seller') {
          navigate('/seller-dashboard')
          alert('Account created successfully! Welcome to your seller dashboard.')
        } else {
          navigate('/')
          alert('Account created successfully! Start browsing businesses.')
        }
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`h-1 w-16 ${
                step >= 2 ? 'bg-primary' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl mb-4">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <h1 className="text-3xl font-bold text-dark">
              {step === 1 ? 'Create Your Account' : 'Set Your Password'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 1 
                ? 'Join thousands of entrepreneurs and investors' 
                : 'Create a secure password for your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I want to *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'buyer', label: 'Buy Businesses', icon: '👔', description: 'Browse and invest in businesses' },
                      { value: 'seller', label: 'Sell My Business', icon: '💰', description: 'List and sell your business' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.userType === type.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type.value}
                          checked={formData.userType === type.value}
                          onChange={handleChange}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <div className="ml-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{type.icon}</span>
                            <span className="font-semibold">{type.label}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.userType && (
                    <p className="mt-1 text-sm text-red-600">{errors.userType}</p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="primary"
                  className="w-full"
                  onClick={handleNext}
                >
                  Continue to Password
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                        One uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>
                        One lowercase letter
                      </li>
                      <li className={/\d/.test(formData.password) ? 'text-green-600' : ''}>
                        One number
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary font-medium hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary font-medium hover:underline">
                        Privacy Policy
                      </Link>
                      . I understand that my data will be processed in accordance with these documents.
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-primary/80">
              Sign in here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}

export default SignUp