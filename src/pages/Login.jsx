import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    rememberMe: false,
    loginMethod: 'email', // 'email' or 'mobile'
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (formData.loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required'
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Mobile number must be 10 digits'
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock user data
      const user = {
        id: '1',
        name: 'John Doe',
        email: formData.email || `user${formData.mobile}@example.com`,
        mobile: formData.mobile,
        role: 'buyer',
        avatar: 'JD',
        avatarUrl: null,
        token: 'mock-jwt-token-12345',
      }
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', user.token)
      
      // Store recently viewed in user's data
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
      localStorage.setItem(`recentlyViewed_${user.id}`, JSON.stringify(recentlyViewed))
      
      setIsLoading(false)
      
      // Redirect to home page
      navigate('/')
      
      // Show success message
      alert('Login successful! Welcome back!')
    }, 1500)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      const user = {
        id: 'google_123',
        name: 'Google User',
        email: 'googleuser@example.com',
        role: 'buyer',
        avatar: 'GU',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop',
        token: 'google-mock-token-123',
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', user.token)
      
      setIsLoading(false)
      navigate('/')
      alert('Google login successful!')
    }, 1000)
  }

  const handleMobileLogin = () => {
    if (!formData.mobile) {
      setErrors({ mobile: 'Mobile number is required' })
      return
    }
    
    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrors({ mobile: 'Mobile number must be 10 digits' })
      return
    }
    
    setIsLoading(true)
    
    // Simulate OTP sending
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000)
      localStorage.setItem('mobile_otp', otp.toString())
      localStorage.setItem('mobile_number', formData.mobile)
      
      setIsLoading(false)
      alert(`OTP sent to ${formData.mobile}: ${otp}\n(In production, this would be sent via SMS)`)
      // In real app, navigate to OTP verification page
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-4 sm:p-6 md:p-8">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-primary to-indigo-700 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">B</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Sign in to your account to continue</p>
          </div>

          {/* Social Login */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium text-sm sm:text-base">Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Login Method Toggle */}
          <div className="flex mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setFormData({...formData, loginMethod: 'email'})}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                formData.loginMethod === 'email'
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, loginMethod: 'mobile'})}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                formData.loginMethod === 'mobile'
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Mobile
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.loginMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                  <button
                    type="button"
                    onClick={handleMobileLogin}
                    disabled={isLoading}
                    className="px-3 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
                {errors.mobile && (
                  <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>
                )}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in to account'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:text-primary/80">
              Sign up for free
            </Link>
          </p>
        </Card>

        {/* Terms */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-4">
          By continuing, you agree to our{' '}
          <Link to="/legal" className="text-primary hover:underline">Terms of Service</Link>{' '}
          and{' '}
          <Link to="/legal" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  )
}

export default Login