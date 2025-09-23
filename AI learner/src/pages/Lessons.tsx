import React from 'react';

const Lessons: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Lessons
          </h1>
          <p className="text-gray-300">
            Explore our comprehensive lessons to enhance your learning.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Beginner Lessons</h3>
            <p className="text-gray-300">Start your learning journey with foundational concepts.</p>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Intermediate Lessons</h3>
            <p className="text-gray-300">Build upon your knowledge with advanced topics.</p>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Lessons</h3>
            <p className="text-gray-300">Master complex concepts and techniques.</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Interactive lessons, quizzes, and personalized learning paths will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lessons;