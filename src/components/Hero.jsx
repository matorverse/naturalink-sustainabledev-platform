import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, TreePine, Recycle } from 'lucide-react'

const Hero = ({ onOpenChatbot }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-eco-green-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-sky-blue-200/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-earth-brown-200/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-eco-green-300/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Tagline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">Empowering</span>
            <br />
            <span className="text-gray-800">Sustainable Futures</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed px-4"
          >
            Join the AI-powered revolution in environmental awareness. 
            Track your carbon footprint, discover eco-friendly solutions, 
            and connect with a global community committed to sustainability.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4"
          >
            <motion.button
              onClick={onOpenChatbot}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-8 md:space-x-12"
          >
            <motion.div
              className="flex flex-col items-center space-y-2"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-eco-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-eco-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Carbon Tracking</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-2"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center">
                <TreePine className="w-8 h-8 text-sky-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">AI Guidance</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-2"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-earth-brown-100 rounded-full flex items-center justify-center">
                <Recycle className="w-8 h-8 text-earth-brown-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Community</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
