import React from 'react';

const Character: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Characters
          </h1>
          <p className="text-gray-300">
            Interact with AI learning companions to enhance your educational journey.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-white">AI Tutor</h3>
              <p className="text-sm text-gray-300">Your personal learning assistant</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Specialty:</span> General Learning
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-medium">Availability:</span> 24/7
              </div>
            </div>
            <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Start Chat
            </button>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">👩‍🏫</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Language Coach</h3>
              <p className="text-sm text-gray-300">Expert in language learning</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Specialty:</span> Language Skills
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-medium">Availability:</span> 24/7
              </div>
            </div>
            <button className="w-full mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Start Chat
            </button>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Study Buddy</h3>
              <p className="text-sm text-gray-300">Your motivational companion</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Specialty:</span> Motivation & Tips
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-medium">Availability:</span> 24/7
              </div>
            </div>
            <button className="w-full mt-4 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Conversations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium text-white">Chat with AI Tutor</p>
                <p className="text-xs text-gray-300">Yesterday, 2:30 PM</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium text-white">Language practice session</p>
                <p className="text-xs text-gray-300">2 days ago, 10:15 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Character Features</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Personalized learning paths
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Real-time feedback
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Adaptive difficulty
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Progress tracking
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Interactive AI characters with voice chat, personalized avatars, and advanced conversation features will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Character;