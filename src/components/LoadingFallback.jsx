import React from 'react'

const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-50 via-white to-sky-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-eco-green-200 border-t-eco-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading NaturalInk</h2>
        <p className="text-gray-600">Preparing your sustainability journey...</p>
      </div>
    </div>
  )
}

export default LoadingFallback
