import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaMapMarkerAlt, FaUsers, FaCalendarAlt, 
  FaLock, FaPray, FaStar, FaHeart,
  FaArrowRight, FaUserPlus, FaSignInAlt,
  FaShieldAlt, FaBookOpen, FaPeace
} from "react-icons/fa";
import { t } from "i18next";


const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 safe-area transition-colors duration-300">
      
      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 text-9xl">🙏</div>
        <div className="absolute top-1/3 right-1/4 text-8xl">🙏</div>
        <div className="absolute bottom-1/4 left-1/3 text-7xl">☮️</div>
        <div className="absolute bottom-1/3 right-1/3 text-9xl">🪷</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo & Heading */}
        <div className="mb-8">
          <div className="text-7xl mb-4 animate-pulse">🙏</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
            {t("Spiritual Journey Tracker")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Document your spiritual visits, cherish family pilgrimages, and preserve Spiritual memories with divine blessings
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate("/login")}
            className="group bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaSignInAlt />
            <span>Begin Your Journey</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="group bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaUserPlus />
            <span>Create Spiritual Account</span>
            <FaHeart className="text-pink-300 animate-pulse" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 flex items-center justify-center gap-3">
            <FaStar className="text-amber-500" />
            Divine Features
            <FaStar className="text-amber-500" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl inline-block mb-4">
                <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spiritual Place Log</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Record visits to temples, ashrams, pilgrimage sites, and other Spiritual places
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl inline-block mb-4">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Family Pilgrimages</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Document family spiritual journeys with all members and their relationships
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl inline-block mb-4">
                <FaCalendarAlt className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Divine Timeline</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track dates, spiritual purposes, and special moments from your Spiritual visits
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl inline-block mb-4">
                <FaLock className="text-green-600 dark:text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spiritual Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your spiritual records are protected with divine security and complete privacy
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl inline-block mb-4">
                <FaShieldAlt className="text-red-600 dark:text-red-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Blessed Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced protection ensures your Spiritual memories remain safe and secure
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cyan-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl inline-block mb-4">
                <FaBookOpen className="text-cyan-600 dark:text-cyan-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Divine Journal</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a beautiful spiritual journal of all your blessed journeys and experiences
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-linear-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 mb-12 border border-amber-200 dark:border-amber-800/30">
          <div className="text-5xl mb-6">🪷</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Blessed by Spiritual Seekers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                "This app helped me preserve memories of our family pilgrimage to the Himalayas. Divine!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-r from-amber-400 to-orange-400 rounded-full"></div>
                <span className="font-semibold text-gray-800 dark:text-white">Priya S.</span>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                "A beautiful way to track spiritual growth. Every visit tells a story of devotion."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                <span className="font-semibold text-gray-800 dark:text-white">Raj M.</span>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                "Finally, a spiritual app that understands the importance of Spiritual journeys."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-r from-green-400 to-emerald-400 rounded-full"></div>
                <span className="font-semibold text-gray-800 dark:text-white">Anita K.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Begin Your Spiritual Documentation?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Join thousands of spiritual seekers who are preserving their Spiritual journeys with divine care.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-bounce"
          >
            Start Your Spiritual Journey Today
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-16 pt-8 border-t border-amber-200 dark:border-gray-700">
          <div className="text-4xl mb-4">🪷🙏☮️</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            May peace, blessings, and divine grace accompany all your spiritual journeys
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;