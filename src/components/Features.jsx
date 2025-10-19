import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Calculator, 
  Brain, 
  Leaf, 
  TrendingUp, 
  Users, 
  Lightbulb,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const features = [
    {
      icon: Calculator,
      title: "Carbon Footprint Calculator",
      description: "AI-powered calculator that tracks your daily carbon emissions and provides personalized reduction strategies.",
      details: [
        "Real-time emission tracking",
        "Personalized recommendations",
        "Progress monitoring",
        "Goal setting & achievements"
      ],
      color: "eco-green"
    },
    {
      icon: Brain,
      title: "Eco-Guidance Chatbot",
      description: "Intelligent AI assistant that provides instant answers to sustainability questions and eco-friendly alternatives.",
      details: [
        "24/7 AI assistance",
        "Personalized eco-tips",
        "Product recommendations",
        "Sustainable lifestyle guidance"
      ],
      color: "sky-blue"
    },
    {
      icon: TrendingUp,
      title: "Sustainability Analytics",
      description: "Advanced analytics dashboard showing your environmental impact trends and improvement metrics.",
      details: [
        "Impact visualization",
        "Trend analysis",
        "Comparative insights",
        "Achievement tracking"
      ],
      color: "earth-brown"
    },
    {
      icon: Users,
      title: "Community Challenges",
      description: "Join global sustainability challenges and compete with friends to make the biggest environmental impact.",
      details: [
        "Global leaderboards",
        "Team challenges",
        "Social sharing",
        "Rewards & recognition"
      ],
      color: "eco-green"
    },
    {
      icon: Lightbulb,
      title: "Smart Eco-Tips",
      description: "AI-generated daily tips and actionable advice to help you live more sustainably every day.",
      details: [
        "Daily personalized tips",
        "Seasonal recommendations",
        "Local initiatives",
        "Expert insights"
      ],
      color: "sky-blue"
    },
    {
      icon: Sparkles,
      title: "Impact Prediction",
      description: "Predict the environmental impact of your choices using advanced AI modeling and data analysis.",
      details: [
        "Future impact modeling",
        "Scenario planning",
        "Risk assessment",
        "Optimization suggestions"
      ],
      color: "earth-brown"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section id="features" className="py-20 bg-white/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-gradient">AI-Powered</span>
            <br />
            <span className="text-gray-800">Sustainability Tools</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our comprehensive suite of AI-driven tools designed to help you 
            make informed environmental decisions and track your sustainability journey.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isActive = activeFeature === index
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`card p-8 cursor-pointer transition-all duration-300 ${
                  isActive ? 'ring-2 ring-eco-green-500 scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto ${
                  feature.color === 'eco-green' ? 'bg-eco-green-100' :
                  feature.color === 'sky-blue' ? 'bg-sky-blue-100' :
                  'bg-earth-brown-100'
                }`}>
                  <IconComponent className={`w-8 h-8 ${
                    feature.color === 'eco-green' ? 'text-eco-green-600' :
                    feature.color === 'sky-blue' ? 'text-sky-blue-600' :
                    'text-earth-brown-600'
                  }`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-eco-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`mt-6 w-full ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive ? 'Currently Active' : 'Learn More'}
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Interactive Demo Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-gradient-to-r from-eco-green-50 to-sky-blue-50 rounded-2xl p-8 md:p-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Try Our <span className="text-gradient">AI Calculator</span>
            </h3>
            <p className="text-gray-600 text-lg">
              Get a quick estimate of your carbon footprint
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Commute (miles)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    placeholder="Enter miles"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energy Usage (kWh/month)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    placeholder="Enter kWh"
                  />
                </div>
              </div>
              
              <motion.button
                className="btn-primary w-full mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate My Impact
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
