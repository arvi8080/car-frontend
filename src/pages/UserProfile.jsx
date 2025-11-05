import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const UserProfile = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for demonstration - in real app, this would come from API
  useEffect(() => {
    // Simulate favorite cars
    setFavoriteCars([
      { id: 1, name: 'BMW X5', image: assets.car_image1, price: '$89/day' },
      { id: 2, name: 'Audi Q7', image: assets.car_image2, price: '$95/day' },
    ]);

    // Simulate recent activity
    setRecentActivity([
      { id: 1, type: 'booking', description: 'Booked BMW X5 for 3 days', date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'review', description: 'Left review for Toyota Camry', date: '2024-01-10', status: 'completed' },
      { id: 3, type: 'payment', description: 'Payment processed for $267', date: '2024-01-08', status: 'completed' },
    ]);
  }, []);

  const stats = [
    { label: 'Total Bookings', value: '12', color: 'text-blue-600' },
    { label: 'Total Spent', value: '$2,450', color: 'text-green-600' },
    { label: 'Active Rentals', value: '1', color: 'text-purple-600' },
    { label: 'Reviews Given', value: '8', color: 'text-yellow-600' },
  ];

  const achievements = [
    { title: 'First Booking', description: 'Completed your first rental', icon: '🎉', unlocked: true },
    { title: 'Frequent Renter', description: 'Booked 10+ times', icon: '🏆', unlocked: true },
    { title: 'Review Master', description: 'Left 5+ reviews', icon: '📝', unlocked: true },
    { title: 'Loyal Customer', description: 'Member for 1 year', icon: '👑', unlocked: false },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h3>
              <p className="text-blue-100">Ready for your next adventure? Check out our latest car collection.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >

                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === 'booking' && '🚗'}
                        {activity.type === 'review' && '⭐'}
                        {activity.type === 'payment' && '💳'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'favorites':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Favorite Cars ❤️</h3>
              {favoriteCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/car-details/${car.id}`)}
                    >
                      <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <h4 className="font-semibold text-gray-900">{car.name}</h4>
                      <p className="text-blue-600 font-medium">{car.price}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🚗</div>
                  <p className="text-gray-600">No favorite cars yet. Start exploring!</p>
                  <button
                    onClick={() => navigate('/cars')}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Browse Cars
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'achievements':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Achievements 🏆</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="mt-2">
                        <span className="inline-block bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                          Unlocked
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title title="My Profile" subTitle="Your personalized dashboard" align="left" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg">{user?.name || 'User'}</h4>
              <p className="text-sm text-gray-600 mb-4">{user?.email || 'user@example.com'}</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  My Bookings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Logout
                </button>
              </div>
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-900">Navigation</h3>
              <div className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'favorites', label: 'Favorites', icon: '❤️' },
                  { id: 'achievements', label: 'Achievements', icon: '🏆' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
