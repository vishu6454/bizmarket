import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const defaultImages = [
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop'
  ]

  const displayImages = images.length > 0 ? images : defaultImages

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg sm:rounded-2xl overflow-hidden cursor-zoom-in bg-gray-100 dark:bg-gray-700"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={displayImages[selectedImage]}
            alt={`Business image ${selectedImage + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
            {selectedImage + 1} / {displayImages.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-2">
          {displayImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 ${
                selectedImage === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <img
                src={displayImages[selectedImage]}
                alt="Lightbox view"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 p-1"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(index)
                    }}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      selectedImage === index
                        ? 'bg-white'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery