import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Profile
          </h1>
          <p className="text-gray-300">
            Manage your account settings and learning preferences.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {user?.displayName || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {user?.email || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Language</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {user?.currentLanguage || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    Level {user?.level || 1}
                  </div>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Learning Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{user?.xp || 0}</div>
                  <div className="text-sm text-gray-300">Total XP</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">{user?.streak || 0}</div>
                  <div className="text-sm text-gray-300">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded">
                  <div className="text-2xl font-bold text-purple-600">{user?.languages?.length || 0}</div>
                  <div className="text-sm text-gray-300">Languages</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <div className="p-3 bg-gray-50 rounded border min-h-[80px]">
                    {user?.bio || 'No bio added yet'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {user?.location || 'Not specified'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently joined'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl text-gray-500">👤</span>
                  )}
                </div>
                <button className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  Change Password
                </button>
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  Notification Settings
                </button>
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  Privacy Settings
                </button>
                <button className="w-full p-2 text-left text-sm text-gray-300 hover:bg-gray-50 rounded">
                  Export Data
                </button>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Lessons Completed</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Articles Read</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Notes Created</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Chat Sessions</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Profile customization, achievement badges, learning analytics, and social features will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;