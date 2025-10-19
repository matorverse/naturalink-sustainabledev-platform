import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import CommunityDashboard from './components/CommunityDashboard'
import BlogResources from './components/BlogResources'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-sky-blue-50">
        <Header />
        
        <main className="relative">
          <Hero onOpenChatbot={() => setIsChatbotOpen(true)} />
          <Features />
          <CommunityDashboard />
          <BlogResources />
          <ContactForm />
        </main>

        <Footer />

        {/* AI Chatbot */}
        <AnimatePresence>
          {isChatbotOpen && (
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          )}
        </AnimatePresence>

        {/* Floating Chatbot Button */}
        <motion.button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 bg-eco-green-600 hover:bg-eco-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollToTop && (
            <ScrollToTop />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}

export default App
