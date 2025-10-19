import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Leaf, 
  Calculator, 
  Lightbulb, 
  TrendingUp,
  MessageCircle
} from 'lucide-react'

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI sustainability assistant. I can help you with carbon footprint calculations, eco-friendly tips, and environmental guidance. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Calculate my carbon footprint",
        "Give me eco-friendly tips",
        "Tell me about sustainability",
        "Help with energy saving"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: Calculator, label: "Carbon Calculator", action: "calculate" },
    { icon: Lightbulb, label: "Eco Tips", action: "tips" },
    { icon: TrendingUp, label: "Impact Analysis", action: "analysis" },
    { icon: Leaf, label: "Sustainability Guide", action: "guide" }
  ]

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Smart response generation based on keywords
    if (message.includes('carbon') || message.includes('footprint')) {
      return {
        text: "I'd love to help you calculate your carbon footprint! Here are some key areas to consider:\n\n• Transportation (car, flights, public transport)\n• Energy usage (electricity, heating)\n• Diet and food choices\n• Shopping and consumption habits\n\nWould you like me to guide you through calculating any of these areas?",
        suggestions: ["Transportation impact", "Energy usage", "Diet choices", "Shopping habits"]
      }
    }
    
    if (message.includes('energy') || message.includes('electricity')) {
      return {
        text: "Energy conservation is crucial for reducing your carbon footprint! Here are some effective tips:\n\n• Switch to LED bulbs (saves 80% energy)\n• Unplug unused electronics\n• Use programmable thermostats\n• Wash clothes in cold water\n• Air dry when possible\n\nDid you know the average home can save 20-30% on energy bills with these changes?",
        suggestions: ["More energy tips", "Calculate energy impact", "Smart home solutions", "Renewable energy"]
      }
    }
    
    if (message.includes('transport') || message.includes('car') || message.includes('commute')) {
      return {
        text: "Transportation is often the biggest contributor to personal carbon footprints! Here are eco-friendly alternatives:\n\n• Carpooling reduces emissions by 50%\n• Public transport is 45% more efficient than driving\n• Cycling produces zero emissions\n• Electric vehicles are 70% cleaner than gas cars\n• Walking for short trips is the most sustainable option\n\nWhat's your current commute situation?",
        suggestions: ["Public transport options", "Electric vehicles", "Cycling tips", "Carpooling benefits"]
      }
    }
    
    if (message.includes('diet') || message.includes('food') || message.includes('meat')) {
      return {
        text: "Your food choices have a huge environmental impact! Here's what you should know:\n\n• Plant-based diets can reduce food emissions by 70%\n• Local, seasonal foods have lower transport emissions\n• Reducing food waste saves 8% of global emissions\n• Organic farming improves soil health\n• Meat production accounts for 14.5% of global emissions\n\nInterested in learning about sustainable eating?",
        suggestions: ["Plant-based recipes", "Local food sources", "Reducing food waste", "Sustainable farming"]
      }
    }
    
    if (message.includes('waste') || message.includes('plastic') || message.includes('recycle')) {
      return {
        text: "Waste reduction is essential for a sustainable future! Here are practical steps:\n\n• Follow the 3 R's: Reduce, Reuse, Recycle\n• Avoid single-use plastics\n• Compost organic waste\n• Buy in bulk to reduce packaging\n• Repair instead of replacing\n• Choose products with minimal packaging\n\nEvery small action makes a difference!",
        suggestions: ["Zero waste lifestyle", "Composting guide", "Plastic alternatives", "Recycling tips"]
      }
    }
    
    if (message.includes('tip') || message.includes('advice') || message.includes('help')) {
      return {
        text: "I'm here to help you live more sustainably! Here are some quick wins:\n\n• Start with one change at a time\n• Set realistic goals\n• Track your progress\n• Join community challenges\n• Share your journey with others\n\nWhat area of sustainability interests you most?",
        suggestions: ["Energy saving", "Waste reduction", "Sustainable transport", "Green living"]
      }
    }
    
    // Default responses for common queries
    const responses = {
      calculate: {
        text: "Great! Let's calculate your carbon footprint. I'll need some information:",
        suggestions: [
          "How many miles do you drive per week?",
          "What's your monthly electricity usage?",
          "How often do you fly per year?",
          "What's your diet type?"
        ]
      },
      tips: {
        text: "Here are some eco-friendly tips for you:",
        suggestions: [
          "Use LED light bulbs - they use 75% less energy",
          "Reduce meat consumption by 1 day per week",
          "Use reusable water bottles and bags",
          "Turn off lights when leaving rooms"
        ]
      },
      analysis: {
        text: "I can help analyze your environmental impact. Based on your current habits:",
        suggestions: [
          "Your energy usage is 15% above average",
          "Consider switching to renewable energy",
          "Your transportation carbon footprint is moderate",
          "Great job on recycling habits!"
        ]
      },
      guide: {
        text: "Let me guide you through sustainable living:",
        suggestions: [
          "Start with energy conservation",
          "Reduce single-use plastics",
          "Choose sustainable transportation",
          "Support eco-friendly businesses"
        ]
      }
    }

    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('calculate') || lowerMessage.includes('carbon')) {
      return responses.calculate
    } else if (lowerMessage.includes('tip') || lowerMessage.includes('eco')) {
      return responses.tips
    } else if (lowerMessage.includes('analysis') || lowerMessage.includes('impact')) {
      return responses.analysis
    } else if (lowerMessage.includes('guide') || lowerMessage.includes('sustainable')) {
      return responses.guide
    } else {
      return {
        text: "I understand you're interested in sustainability! Here are some ways I can help:",
        suggestions: [
          "Calculate your carbon footprint",
          "Get personalized eco-tips",
          "Learn about renewable energy",
          "Find local environmental projects"
        ]
      }
    }
  }

  const handleSendMessage = async (message) => {
    if (!message.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action.label)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-eco-green-600 to-sky-blue-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Sustainability Assistant</h3>
                <p className="text-sm opacity-90">Always here to help</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-eco-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-eco-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p>{message.text}</p>
                    </div>
                    {message.suggestions && (
                      <div className="mt-2 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-eco-green-50 hover:border-eco-green-300 transition-colors text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 mb-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center space-x-2 px-3 py-2 bg-eco-green-50 text-eco-green-700 rounded-lg hover:bg-eco-green-100 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{action.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Ask me about sustainability..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              />
              <motion.button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-eco-green-600 hover:bg-eco-green-700 text-white p-3 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Chatbot
