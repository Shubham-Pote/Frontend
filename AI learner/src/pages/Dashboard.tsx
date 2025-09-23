import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Dashboard
          </h1>
          <p className="text-gray-300">
            {user ? `Hello, ${user.displayName}! This is your learning dashboard.` : 'Welcome to your learning dashboard.'}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Quick Stats</h2>
            <p className="text-gray-300">Your learning progress will appear here.</p>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Recent Lessons</h2>
            <p className="text-gray-300">Your recent lessons will appear here.</p>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">Achievements</h2>
            <p className="text-gray-300">Your achievements will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;