import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  MessageSquare,
  User,
  Star,
  Heart
} from 'lucide-react'

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      // Simulate form submission with loading state
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store form data in localStorage for demo purposes
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
      submissions.push({
        ...data,
        submittedAt: new Date().toISOString(),
        id: Date.now()
      })
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
      
      setIsSubmitted(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      // In a real app, you'd show an error message
    }
  }

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Scientist",
      message: "NaturalInk has revolutionized how I track my environmental impact. The AI insights are incredibly accurate and helpful.",
      rating: 5,
      avatar: "👩‍🔬"
    },
    {
      name: "Michael Chen",
      role: "Climate Activist",
      message: "The community features are amazing! I've connected with like-minded individuals and joined several impactful projects.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Emma Wilson",
      role: "Sustainability Blogger",
      message: "The educational resources are top-notch. I've learned so much about sustainable living through their AI-generated content.",
      rating: 5,
      avatar: "👩‍💻"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-eco-green-50 to-sky-blue-50">
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
            <span className="text-gradient">Get in Touch</span>
            <br />
            <span className="text-gray-800">We'd Love to Hear from You</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Have questions about sustainability? Need help with our AI tools? 
            Want to suggest a feature? We're here to help and always eager to hear your feedback.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-eco-green-600" />
                Send us a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-eco-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">
                    Thank you for your message. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Your first name"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters'
                        }
                      })}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Information & Testimonials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-eco-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-eco-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">hello@naturalink.com</p>
                    <p className="text-gray-600">support@naturalink.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-sky-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-earth-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-earth-brown-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Office</h4>
                    <p className="text-gray-600">123 Green Street</p>
                    <p className="text-gray-600">San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              variants={itemVariants}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-eco-green-600" />
                What Our Users Say
              </h3>
              
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-eco-green-200 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.message}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
