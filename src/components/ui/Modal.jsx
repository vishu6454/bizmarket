import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 p-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <h2 className="mb-4 text-lg font-bold">{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
