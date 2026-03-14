import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: code, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateEmail = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    return newErrors
  }

  const validateCode = () => {
    const newErrors = {}
    if (!formData.resetCode) {
      newErrors.resetCode = 'Reset code is required'
    } else if (formData.resetCode.length !== 6) {
      newErrors.resetCode = 'Code must be 6 digits'
    }
    return newErrors
  }

  const validatePassword = () => {
    const newErrors = {}
    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    const validationErrors = validateEmail()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
      setMessage(`Reset code sent to ${formData.email}. Check your inbox.`)
      // In real app, this would come from backend
      const mockCode = '123456'
      localStorage.setItem('resetCode', mockCode)
      localStorage.setItem('resetEmail', formData.email)
    }, 1500)
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    const validationErrors = validateCode()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Check if code matches stored code
    const storedCode = localStorage.getItem('resetCode')
    if (formData.resetCode !== storedCode) {
      setErrors({ resetCode: 'Invalid reset code' })
      return
    }

    setStep(3)
    setMessage('Code verified! Now set your new password.')
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const validationErrors = validatePassword()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setMessage('Password reset successfully! Redirecting to login...')
      // Clear reset data
      localStorage.removeItem('resetCode')
      localStorage.removeItem('resetEmail')
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }, 1500)
  }

  const steps = [
    { number: 1, title: 'Enter Email', description: 'Enter your email address' },
    { number: 2, title: 'Verify Code', description: 'Enter the verification code' },
    { number: 3, title: 'New Password', description: 'Set your new password' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= s.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s.number}
                </div>
                <span className={`text-xs font-medium ${
                  step >= s.number ? 'text-primary' : 'text-gray-500'
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-dark">
              {step === 1 && 'Reset Your Password'}
              {step === 2 && 'Enter Verification Code'}
              {step === 3 && 'Set New Password'}
            </h1>
            <p className="text-gray-600 mt-2">
              {step === 1 && "Enter your email and we'll send you a reset code"}
              {step === 2 && 'Enter the 6-digit code sent to your email'}
              {step === 3 && 'Create a new password for your account'}
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{message}</span>
              </div>
            </motion.div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSendCode}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
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

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Code...
                  </span>
                ) : (
                  'Send Reset Code'
                )}
              </Button>
            </motion.form>
          )}

          {/* Step 2: Code */}
          {step === 2 && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyCode}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  name="resetCode"
                  value={formData.resetCode}
                  onChange={handleChange}
                  maxLength="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest ${
                    errors.resetCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="000000"
                />
                {errors.resetCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.resetCode}</p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Resend code
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  Verify Code
                </Button>
              </div>
            </motion.form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleResetPassword}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
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

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Resetting Password...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </motion.form>
          )}

          {/* Back to Login */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-primary font-medium hover:text-primary/80"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ForgotPassword