import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const styles = {
    primary:
      'bg-primary text-white hover:bg-blue-700',
    outline:
      'border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20',
    danger:
      'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
