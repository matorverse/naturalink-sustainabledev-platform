import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Leaf, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'

const CarbonCalculator = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Transportation
    dailyCommute: '',
    commuteType: 'car',
    weeklyFlights: '',
    
    // Energy
    monthlyElectricity: '',
    monthlyGas: '',
    heatingType: 'natural-gas',
    
    // Lifestyle
    dietType: 'omnivore',
    weeklyMeatSaved: '',
    monthlyShopping: '',
    
    // Personal Info
    householdSize: '1'
  })
  
  const [results, setResults] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    let totalEmissions = 0
    const breakdown = {}

    // Transportation calculations (kg CO2 per year)
    if (formData.dailyCommute) {
      const dailyKm = parseFloat(formData.dailyCommute)
      const commuteEmissions = {
        car: 0.192, // kg CO2 per km
        bus: 0.089,
        train: 0.041,
        bike: 0,
        walk: 0
      }
      const annualCommute = dailyKm * 260 * commuteEmissions[formData.commuteType] // 260 working days
      breakdown.transportation = Math.round(annualCommute)
      totalEmissions += annualCommute
    }

    if (formData.weeklyFlights) {
      const weeklyFlights = parseFloat(formData.weeklyFlights)
      const flightEmissions = weeklyFlights * 52 * 255 // 255 kg CO2 per short flight
      breakdown.flights = Math.round(flightEmissions)
      totalEmissions += flightEmissions
    }

    // Energy calculations
    if (formData.monthlyElectricity) {
      const monthlyKwh = parseFloat(formData.monthlyElectricity)
      const electricityEmissions = monthlyKwh * 12 * 0.5 // 0.5 kg CO2 per kWh
      breakdown.electricity = Math.round(electricityEmissions)
      totalEmissions += electricityEmissions
    }

    if (formData.monthlyGas) {
      const monthlyTherms = parseFloat(formData.monthlyGas)
      const gasEmissions = monthlyTherms * 12 * 5.3 // 5.3 kg CO2 per therm
      breakdown.gas = Math.round(gasEmissions)
      totalEmissions += gasEmissions
    }

    // Lifestyle calculations
    const dietEmissions = {
      omnivore: 2200, // kg CO2 per year
      vegetarian: 1400,
      vegan: 1100
    }
    breakdown.diet = Math.round(dietEmissions[formData.dietType] / parseInt(formData.householdSize))
    totalEmissions += breakdown.diet

    if (formData.monthlyShopping) {
      const monthlySpending = parseFloat(formData.monthlyShopping)
      const shoppingEmissions = monthlySpending * 12 * 0.8 // 0.8 kg CO2 per $1 spent
      breakdown.shopping = Math.round(shoppingEmissions)
      totalEmissions += shoppingEmissions
    }

    const treesToPlant = Math.ceil(totalEmissions / 22) // 1 tree absorbs ~22 kg CO2 per year
    const averageUS = 16000 // Average US citizen footprint
    const percentage = Math.round((totalEmissions / averageUS) * 100)

    setResults({
      total: Math.round(totalEmissions),
      breakdown,
      treesToPlant,
      percentage,
      recommendation: totalEmissions < averageUS ? 'excellent' : totalEmissions < averageUS * 1.2 ? 'good' : 'needs-improvement'
    })
    setStep(4)
  }

  const getRecommendations = () => {
    if (!results) return []
    
    const recs = []
    if (results.breakdown.transportation > 2000) {
      recs.push({
        icon: '🚗',
        title: 'Reduce Car Usage',
        description: 'Try carpooling, public transport, or cycling to work'
      })
    }
    if (results.breakdown.electricity > 1500) {
      recs.push({
        icon: '💡',
        title: 'Save Energy',
        description: 'Switch to LED bulbs and unplug unused electronics'
      })
    }
    if (results.breakdown.diet > 1800) {
      recs.push({
        icon: '🥗',
        title: 'Eat More Plant-Based',
        description: 'Reduce meat consumption and eat locally sourced food'
      })
    }
    return recs
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Transportation</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Commute Distance (miles)
              </label>
              <input
                type="number"
                value={formData.dailyCommute}
                onChange={(e) => handleInputChange('dailyCommute', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                placeholder="Enter miles"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commute Method
              </label>
              <select
                value={formData.commuteType}
                onChange={(e) => handleInputChange('commuteType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="bike">Bicycle</option>
                <option value="walk">Walking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Flights (short-haul)
              </label>
              <input
                type="number"
                value={formData.weeklyFlights}
                onChange={(e) => handleInputChange('weeklyFlights', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                placeholder="Enter number of flights"
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Energy Usage</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Electricity Usage (kWh)
              </label>
              <input
                type="number"
                value={formData.monthlyElectricity}
                onChange={(e) => handleInputChange('monthlyElectricity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                placeholder="Enter kWh"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Gas Usage (therms)
              </label>
              <input
                type="number"
                value={formData.monthlyGas}
                onChange={(e) => handleInputChange('monthlyGas', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                placeholder="Enter therms"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Household Size
              </label>
              <select
                value={formData.householdSize}
                onChange={(e) => handleInputChange('householdSize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5+">5+ people</option>
              </select>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Lifestyle</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diet Type
              </label>
              <select
                value={formData.dietType}
                onChange={(e) => handleInputChange('dietType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              >
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Shopping Budget ($)
              </label>
              <input
                type="number"
                value={formData.monthlyShopping}
                onChange={(e) => handleInputChange('monthlyShopping', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-10 h-10 text-eco-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Carbon Footprint</h3>
              <div className="text-4xl font-bold text-eco-green-600 mb-2">
                {results?.total.toLocaleString()} kg CO₂/year
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                results?.recommendation === 'excellent' ? 'bg-green-100 text-green-800' :
                results?.recommendation === 'good' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {results?.recommendation === 'excellent' ? <CheckCircle className="w-4 h-4 mr-1" /> :
                 results?.recommendation === 'good' ? <AlertCircle className="w-4 h-4 mr-1" /> :
                 <AlertCircle className="w-4 h-4 mr-1" />}
                {results?.recommendation === 'excellent' ? 'Excellent!' :
                 results?.recommendation === 'good' ? 'Good, but can improve' :
                 'Needs improvement'}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Breakdown by Category</h4>
              <div className="space-y-2">
                {Object.entries(results?.breakdown || {}).map(([category, value]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{category}:</span>
                    <span className="font-medium">{value.toLocaleString()} kg CO₂</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-eco-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Impact</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Trees needed to offset:</span>
                <span className="font-bold text-eco-green-600">{results?.treesToPlant} trees</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">vs US Average:</span>
                <span className="font-bold text-eco-green-600">{results?.percentage}%</span>
              </div>
            </div>

            {getRecommendations().length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
                <div className="space-y-3">
                  {getRecommendations().map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                      <span className="text-2xl">{rec.icon}</span>
                      <div>
                        <h5 className="font-medium text-gray-800">{rec.title}</h5>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6 text-eco-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Carbon Footprint Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-3 h-3 rounded-full ${
                  stepNum <= step ? 'bg-eco-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-3">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="btn-primary px-6 py-2"
              >
                Next
              </button>
            ) : step === 3 ? (
              <button
                onClick={calculateFootprint}
                className="btn-primary px-6 py-2"
              >
                Calculate
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-primary px-6 py-2"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CarbonCalculator
