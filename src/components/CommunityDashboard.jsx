import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Globe, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Heart,
  Star,
  Clock,
  Filter,
  Search
} from 'lucide-react'

const CommunityDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'local', name: 'Local Initiatives', icon: MapPin },
    { id: 'global', name: 'Global Campaigns', icon: TrendingUp },
    { id: 'education', name: 'Education', icon: Users },
    { id: 'conservation', name: 'Conservation', icon: Heart }
  ]

  const projects = [
    {
      id: 1,
      title: "Urban Tree Planting Initiative",
      description: "Join our city-wide effort to plant 10,000 trees in urban areas to improve air quality and combat climate change.",
      category: 'local',
      location: "New York, USA",
      participants: 1250,
      goal: 10000,
      progress: 65,
      deadline: "2024-06-15",
      image: "🌳",
      tags: ["Trees", "Urban", "Climate"],
      featured: true
    },
    {
      id: 2,
      title: "Ocean Cleanup Challenge",
      description: "Global campaign to remove plastic waste from oceans. Track your cleanup efforts and contribute to our worldwide goal.",
      category: 'global',
      location: "Worldwide",
      participants: 8900,
      goal: 500000,
      progress: 42,
      deadline: "2024-12-31",
      image: "🌊",
      tags: ["Ocean", "Plastic", "Global"],
      featured: true
    },
    {
      id: 3,
      title: "Renewable Energy Education",
      description: "Educational program teaching communities about renewable energy solutions and sustainable living practices.",
      category: 'education',
      location: "California, USA",
      participants: 450,
      goal: 1000,
      progress: 45,
      deadline: "2024-08-20",
      image: "⚡",
      tags: ["Education", "Renewable", "Community"],
      featured: false
    },
    {
      id: 4,
      title: "Wildlife Conservation Network",
      description: "Connect with conservationists worldwide to protect endangered species and their habitats.",
      category: 'conservation',
      location: "Global",
      participants: 3200,
      goal: 5000,
      progress: 64,
      deadline: "2024-09-30",
      image: "🦋",
      tags: ["Wildlife", "Conservation", "Global"],
      featured: false
    },
    {
      id: 5,
      title: "Zero Waste Neighborhood",
      description: "Local initiative to create the first zero-waste neighborhood in your city through community collaboration.",
      category: 'local',
      location: "Portland, USA",
      participants: 780,
      goal: 2000,
      progress: 39,
      deadline: "2024-11-15",
      image: "♻️",
      tags: ["Zero Waste", "Community", "Local"],
      featured: false
    },
    {
      id: 6,
      title: "Climate Action Youth Summit",
      description: "Annual youth summit bringing together young climate activists to share ideas and create action plans.",
      category: 'education',
      location: "Berlin, Germany",
      participants: 1200,
      goal: 1500,
      progress: 80,
      deadline: "2024-07-10",
      image: "🌍",
      tags: ["Youth", "Climate", "Summit"],
      featured: true
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-eco-green-50 to-sky-blue-50">
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
            <span className="text-gradient">Community</span>
            <br />
            <span className="text-gray-800">Projects Dashboard</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Join thousands of environmental enthusiasts in making a real difference. 
            Discover, track, and participate in impactful sustainability projects worldwide.
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
                placeholder="Search projects..."
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`card p-6 relative overflow-hidden ${
                project.featured ? 'ring-2 ring-eco-green-500' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 bg-eco-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </div>
              )}

              <div className="text-4xl mb-4">{project.image}</div>
              
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

              {/* Project Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-eco-green-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.participants.toLocaleString()} joined
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {getDaysUntilDeadline(project.deadline)} days left
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Goal: {project.goal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-eco-green-100 text-eco-green-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                className="w-full btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Project
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8"
          >
            Global Impact <span className="text-gradient">Statistics</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Active Members", icon: Users },
              { number: "2.5M", label: "Trees Planted", icon: Globe },
              { number: "15K+", label: "Projects Completed", icon: TrendingUp },
              { number: "1.2M", label: "CO₂ Tons Reduced", icon: Heart }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-eco-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunityDashboard
