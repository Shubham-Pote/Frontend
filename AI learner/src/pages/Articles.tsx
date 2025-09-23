import React from 'react';

const Articles: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Articles
          </h1>
          <p className="text-gray-300">
            Read insightful articles to deepen your knowledge and understanding.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Latest Articles</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with the most recent articles and insights.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-300">Article titles will appear here</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-300">Article titles will appear here</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Popular Articles</h3>
            <p className="text-gray-300 mb-4">
              Discover the most popular articles from our community.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-300">Popular article titles will appear here</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-300">Popular article titles will appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            A comprehensive article library with search, categories, and bookmarking features will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Articles;