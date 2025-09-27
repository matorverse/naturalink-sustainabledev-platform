import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag,
  Search,
  Filter,
  TrendingUp,
  Lightbulb,
  Globe,
  Leaf
} from 'lucide-react'

const BlogResources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'tips', name: 'Eco Tips', icon: Lightbulb },
    { id: 'science', name: 'Climate Science', icon: Globe },
    { id: 'lifestyle', name: 'Sustainable Living', icon: Leaf },
    { id: 'news', name: 'Environmental News', icon: TrendingUp }
  ]

  const articles = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
      excerpt: "Discover practical, everyday actions you can take right now to make a significant impact on your environmental footprint.",
      content: "Climate change is one of the most pressing issues of our time, but the good news is that individual actions can make a real difference...",
      category: 'tips',
      author: "Dr. Sarah Green",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "🌱",
      tags: ["Carbon Footprint", "Climate Action", "Tips"],
      featured: true,
      views: 12500
    },
    {
      id: 2,
      title: "The Science Behind Renewable Energy: Solar vs Wind",
      excerpt: "A comprehensive analysis of renewable energy sources, their efficiency, and environmental impact.",
      content: "As the world transitions to cleaner energy sources, understanding the science behind renewable technologies becomes crucial...",
      category: 'science',
      author: "Prof. Michael Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      image: "⚡",
      tags: ["Renewable Energy", "Science", "Technology"],
      featured: true,
      views: 8900
    },
    {
      id: 3,
      title: "Zero Waste Living: A Complete Beginner's Guide",
      excerpt: "Learn how to transition to a zero-waste lifestyle with practical tips and step-by-step guidance.",
      content: "Zero waste living isn't about perfection—it's about making conscious choices that reduce our environmental impact...",
      category: 'lifestyle',
      author: "Emma Wilson",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "♻️",
      tags: ["Zero Waste", "Lifestyle", "Sustainability"],
      featured: false,
      views: 6700
    },
    {
      id: 4,
      title: "Global Climate Summit 2024: Key Takeaways",
      excerpt: "Breaking down the most important outcomes and commitments from this year's international climate conference.",
      content: "The 2024 Global Climate Summit brought together world leaders, scientists, and activists to address urgent climate challenges...",
      category: 'news',
      author: "Climate News Team",
      date: "2024-01-08",
      readTime: "7 min read",
      image: "🌍",
      tags: ["Climate Summit", "Global News", "Policy"],
      featured: false,
      views: 15200
    },
    {
      id: 5,
      title: "AI-Powered Sustainability: How Technology is Saving the Planet",
      excerpt: "Explore how artificial intelligence is revolutionizing environmental protection and sustainability efforts.",
      content: "From predicting climate patterns to optimizing energy usage, AI is becoming an indispensable tool in our fight against climate change...",
      category: 'science',
      author: "Dr. Alex Rodriguez",
      date: "2024-01-05",
      readTime: "9 min read",
      image: "🤖",
      tags: ["AI", "Technology", "Innovation"],
      featured: true,
      views: 9800
    },
    {
      id: 6,
      title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
      excerpt: "Transform your closet into a sustainable fashion statement with these expert tips and brand recommendations.",
      content: "Fashion is one of the most polluting industries globally, but you can make a difference through conscious choices...",
      category: 'lifestyle',
      author: "Lisa Martinez",
      date: "2024-01-03",
      readTime: "6 min read",
      image: "👗",
      tags: ["Fashion", "Sustainability", "Lifestyle"],
      featured: false,
      views: 5400
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredArticles = articles.filter(article => article.featured)

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="resources" className="py-20 bg-white">
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
            <span className="text-gradient">Educational</span>
            <br />
            <span className="text-gray-800">Resources & Blog</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Stay informed with our latest articles, research insights, and AI-generated content 
            about sustainability, climate science, and environmental awareness.
          </motion.p>

          {/* Search and Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-eco-green-600 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-eco-green-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold mb-8 flex items-center"
          >
            <TrendingUp className="w-6 h-6 mr-3 text-eco-green-600" />
            Featured Articles
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.slice(0, 2).map((article) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className="card p-8 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-4 right-4 bg-eco-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>

                <div className="text-5xl mb-4">{article.image}</div>
                
                <h3 className="text-2xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-eco-green-600 font-medium">{article.views.toLocaleString()} views</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-eco-green-100 text-eco-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="btn-primary flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* All Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold mb-8 flex items-center"
          >
            <BookOpen className="w-6 h-6 mr-3 text-eco-green-600" />
            Latest Articles
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className="card p-6 relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{article.image}</div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-eco-green-600 font-medium">{article.views.toLocaleString()}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-eco-green-100 text-eco-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="w-full btn-secondary text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read Article
                </motion.button>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 bg-gradient-to-r from-eco-green-50 to-sky-blue-50 rounded-2xl p-8 md:p-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Stay <span className="text-gradient">Updated</span>
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly sustainability tips, latest research, 
              and exclusive content delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              />
              <motion.button
                className="btn-primary px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogResources
