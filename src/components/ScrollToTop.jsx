import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 bg-eco-green-600 hover:bg-eco-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  )
}

export default ScrollToTop
