import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Users, Calendar, Target, Star, CheckCircle, Leaf } from 'lucide-react'

const CommunityChallenges = ({ onClose }) => {
  const [challenges, setChallenges] = useState([])
  const [userProgress, setUserProgress] = useState({})
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('challengeProgress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }

    // Initialize challenges
    const initialChallenges = [
      {
        id: 1,
        title: "7-Day Plastic-Free Challenge",
        description: "Avoid single-use plastics for a week and document your journey",
        category: "Waste Reduction",
        difficulty: "Medium",
        duration: 7,
        participants: 1247,
        points: 50,
        tasks: [
          "Use reusable water bottle",
          "Bring your own shopping bags",
          "Avoid plastic straws",
          "Use glass containers for food storage",
          "Choose products with minimal packaging",
          "Participate in local cleanup",
          "Share your experience"
        ],
        icon: "♻️",
        color: "eco-green"
      },
      {
        id: 2,
        title: "30-Day Carbon Reduction",
        description: "Reduce your carbon footprint through daily sustainable actions",
        category: "Climate Action",
        difficulty: "Hard",
        duration: 30,
        participants: 892,
        points: 150,
        tasks: [
          "Walk or bike to work 3 days a week",
          "Reduce meat consumption by 50%",
          "Unplug unused electronics",
          "Use public transportation",
          "Switch to LED bulbs",
          "Plant 5 trees or plants",
          "Compost organic waste"
        ],
        icon: "🌱",
        color: "sky-blue"
      },
      {
        id: 3,
        title: "Zero Waste Kitchen",
        description: "Transform your kitchen into a zero-waste environment",
        category: "Lifestyle",
        difficulty: "Hard",
        duration: 21,
        participants: 634,
        points: 100,
        tasks: [
          "Buy in bulk with reusable containers",
          "Make homemade cleaning products",
          "Start composting",
          "Preserve food to reduce waste",
          "Use cloth napkins and towels",
          "Repurpose glass jars",
          "Plan meals to minimize waste"
        ],
        icon: "🍽️",
        color: "earth-brown"
      },
      {
        id: 4,
        title: "Energy Conservation Week",
        description: "Reduce energy consumption in your home for one week",
        category: "Energy",
        difficulty: "Easy",
        duration: 7,
        participants: 2156,
        points: 75,
        tasks: [
          "Turn off lights when not needed",
          "Use natural light during day",
          "Lower thermostat by 2°F",
          "Wash clothes in cold water",
          "Air dry clothes instead of dryer",
          "Unplug chargers when not in use",
          "Use energy-efficient appliances"
        ],
        icon: "⚡",
        color: "eco-green"
      }
    ]
    setChallenges(initialChallenges)
  }, [])

  const joinChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId)
    if (challenge) {
      const newProgress = {
        ...userProgress,
        [challengeId]: {
          joinedAt: new Date().toISOString(),
          completedTasks: [],
          isCompleted: false
        }
      }
      setUserProgress(newProgress)
      localStorage.setItem('challengeProgress', JSON.stringify(newProgress))
    }
  }

  const completeTask = (challengeId, taskIndex) => {
    const currentProgress = userProgress[challengeId] || { completedTasks: [] }
    const newCompletedTasks = currentProgress.completedTasks.includes(taskIndex)
      ? currentProgress.completedTasks.filter(t => t !== taskIndex)
      : [...currentProgress.completedTasks, taskIndex]

    const challenge = challenges.find(c => c.id === challengeId)
    const isCompleted = newCompletedTasks.length === challenge.tasks.length

    const newProgress = {
      ...userProgress,
      [challengeId]: {
        ...currentProgress,
        completedTasks: newCompletedTasks,
        isCompleted
      }
    }

    setUserProgress(newProgress)
    localStorage.setItem('challengeProgress', JSON.stringify(newProgress))
  }

  const getProgressPercentage = (challengeId) => {
    const progress = userProgress[challengeId]
    if (!progress) return 0
    const challenge = challenges.find(c => c.id === challengeId)
    return Math.round((progress.completedTasks.length / challenge.tasks.length) * 100)
  }

  const getTotalPoints = () => {
    return Object.values(userProgress)
      .filter(p => p.isCompleted)
      .reduce((total, progress) => {
        const challenge = challenges.find(c => c.id === Object.keys(userProgress).find(id => userProgress[id] === progress))
        return total + (challenge?.points || 0)
      }, 0)
  }

  const renderChallengeCard = (challenge) => {
    const progress = userProgress[challenge.id]
    const progressPercentage = getProgressPercentage(challenge.id)
    const isJoined = !!progress
    const isCompleted = progress?.isCompleted

    return (
      <motion.div
        key={challenge.id}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
      >
        <div className={`p-6 bg-gradient-to-r ${
          challenge.color === 'eco-green' ? 'from-eco-green-50 to-eco-green-100' :
          challenge.color === 'sky-blue' ? 'from-sky-blue-50 to-sky-blue-100' :
          'from-earth-brown-50 to-earth-brown-100'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{challenge.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                <p className="text-sm text-gray-600">{challenge.category}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-eco-green-600">{challenge.points}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{challenge.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {challenge.duration} days
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {challenge.participants.toLocaleString()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
          </div>

          {isJoined && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-eco-green-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-eco-green-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            {!isJoined ? (
              <button
                onClick={() => joinChallenge(challenge.id)}
                className="flex-1 btn-primary text-sm py-2"
              >
                Join Challenge
              </button>
            ) : isCompleted ? (
              <button
                onClick={() => setSelectedChallenge(challenge)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Completed!
              </button>
            ) : (
              <button
                onClick={() => setSelectedChallenge(challenge)}
                className="flex-1 btn-secondary text-sm py-2"
              >
                Continue
              </button>
            )}
            <button
              onClick={() => setSelectedChallenge(challenge)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderChallengeDetail = () => {
    if (!selectedChallenge) return null

    const progress = userProgress[selectedChallenge.id]
    const progressPercentage = getProgressPercentage(selectedChallenge.id)

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{selectedChallenge.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedChallenge.title}</h2>
                <p className="text-sm text-gray-600">{selectedChallenge.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedChallenge(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedChallenge.duration} days</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedChallenge.participants.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedChallenge.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{selectedChallenge.difficulty}</div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                </div>
              </div>

              {progress && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-medium text-eco-green-600">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-eco-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h3>
              <div className="space-y-3">
                {selectedChallenge.tasks.map((task, index) => {
                  const isCompleted = progress?.completedTasks.includes(index)
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => completeTask(selectedChallenge.id, index)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isCompleted 
                            ? 'bg-green-600 border-green-600 text-white' 
                            : 'border-gray-300 hover:border-eco-green-600'
                        }`}
                      >
                        {isCompleted && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <span className={`flex-1 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {task}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-eco-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Community Challenges</h2>
            <div className="flex items-center space-x-2 bg-eco-green-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-eco-green-600" />
              <span className="text-sm font-medium text-eco-green-800">{getTotalPoints()} pts</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(renderChallengeCard)}
          </div>
        </div>
      </motion.div>

      {renderChallengeDetail()}
    </div>
  )
}

export default CommunityChallenges
