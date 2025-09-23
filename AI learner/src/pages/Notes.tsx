import React from 'react';

const Notes: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Notes
          </h1>
          <p className="text-gray-300">
            Create, organize, and manage your personal learning notes.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Notes</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-300">Your recent notes will appear here</p>
                </div>
                <div className="p-4 bg-gray-50 rounded border-l-4 border-green-500">
                  <p className="text-sm text-gray-300">Click to add your first note</p>
                </div>
                <div className="p-4 bg-gray-50 rounded border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-300">Notes help you remember important concepts</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Create New Note</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-gray-500">Note editor will be available here</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded text-blue-800 text-sm">General (0)</div>
                <div className="p-2 bg-green-50 rounded text-green-800 text-sm">Lessons (0)</div>
                <div className="p-2 bg-yellow-50 rounded text-yellow-800 text-sm">Ideas (0)</div>
                <div className="p-2 bg-purple-50 rounded text-purple-800 text-sm">To Review (0)</div>
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  + Add New Note
                </button>
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  📁 Organize Notes
                </button>
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  🔍 Search Notes
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Rich text editor, tags, search functionality, and note sharing features will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;