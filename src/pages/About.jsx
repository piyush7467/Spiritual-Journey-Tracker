import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart, FaUsers, FaGlobe, FaMedal,
  FaLightbulb, FaShieldAlt, FaHandsHelping,
  FaLeaf, FaBalanceScale, FaInfinity,
  FaArrowLeft, FaStar, FaPray
} from "react-icons/fa";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pb-12 safe-area transition-colors duration-300">

      {/* Divine Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 left-10 text-8xl">🙏</div>
        <div className="absolute top-1/4 right-10 text-9xl">☸️</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl">✡️</div>
        <div className="absolute bottom-20 right-1/3 text-8xl">🙏</div>
        <div className="absolute top-1/2 left-1/2 text-10xl">✝️</div>
        <div className="absolute top-20 right-1/2 text-6xl">☯️</div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <FaArrowLeft className="text-amber-600 dark:text-amber-400 text-lg" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <div className="text-8xl mb-6 animate-float">🪷</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
            About Spiritual Journey Tracker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A divine platform created with love and devotion to help spiritual seekers preserve their Spiritual memories
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-10 shadow-2xl border border-amber-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
              <FaHeart className="text-red-500 dark:text-red-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Divine Mission</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            We believe that every Satlok Ashram journey is a sacred story worth preserving. Our mission is to provide a beautiful and secure space where devotees can document their Satlok Ashram visits, seva, bhandara, and satsang experiences—creating a lifelong spiritual diary.
          </p>
          <div className="p-4 bg-linear-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
            <p className="text-gray-700 dark:text-gray-300 italic">
             “To serve as a digital sanctuary for Satlok Ashram memories, where every visit becomes a cherished chapter in your spiritual journey.”
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
            <FaStar className="text-amber-500" />
            Our Divine Values
            <FaStar className="text-amber-500" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl inline-block mb-4">
                <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spiritual Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your spiritual memories are yours alone. We protect them with divine security and utmost respect.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100 dark:border-green-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl inline-block mb-4">
                <FaHandsHelping className="text-green-600 dark:text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Universal Love</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We serve all spiritual paths with equal love and respect, embracing diversity in divine journeys.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl inline-block mb-4">
                <FaLeaf className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Mindful Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every feature is crafted with mindfulness, creating a peaceful and intuitive spiritual experience.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-amber-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl inline-block mb-4">
                <FaUsers className="text-amber-600 dark:text-amber-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Community First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built by spiritual seekers, for spiritual seekers. Your feedback shapes our divine evolution.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-100 dark:border-red-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl inline-block mb-4">
                <FaBalanceScale className="text-red-600 dark:text-red-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spiritual Balance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We balance modern technology with timeless spiritual wisdom for a harmonious experience.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cyan-100 dark:border-cyan-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="p-3 bg-linear-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl inline-block mb-4">
                <FaInfinity className="text-cyan-600 dark:text-cyan-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Eternal Growth</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We grow with you on your spiritual path, continuously evolving to serve your journey better.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-10 shadow-2xl border border-amber-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
              <FaPray className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Spiritual Beginning</h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Spiritual Journey Tracker was born from a personal spiritual need. Our founder, during a visit to Satlok Ashram, Shamli, Uttar Pradesh, realized how quickly the details of divine experiences fade from memory.
            </p>
            <p>
              After realizing how easily memories of Satlok Ashram journeys—our seva, bhandara, and sacred moments—can fade with time, the vision for this platform emerged: a beautiful and secure place to store and preserve Satlok Ashram spiritual journeys for generations to come.
            </p>
            <p>
              What began as our personal way of recording Satlok Ashram experiences has grown into a platform serving thousands of spiritual seekers worldwide, united in preserving memories of seva, bhandara, and their spiritual journeys.
            </p>
          </div>

          <div className="mt-6 p-4 bg-linear-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold text-purple-600 dark:text-purple-400">10,000+</span> Satlok Ashram spiritual journeys preserved
              <span className="mx-4">•</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">10+</span> Satlok Ashram locations covered
            </p>
          </div>

          {/* <div className="mt-6 p-4 bg-linear-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              <span className="font-bold text-purple-600 dark:text-purple-400">10,000+</span> Spiritual journeys documented
              <span className="mx-4">•</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">50+</span> countries served
              <span className="mx-4">•</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">10+</span> Satlok Ashram recorded daily
            </p>
          </div> */}
        </div>

        {/* Team/Community Section */}
        <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-10 shadow-2xl border border-amber-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Our Divine Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Sevadar</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Serving Satlok Ashram through seva
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Satsang Followers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Following the path of true knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">D</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Devotees</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Preserving Satlok Ashram journey memories
              </p>
            </div>
          </div>

          <p className="text-center text-gray-700 dark:text-gray-300">
            We are blessed to serve a growing community devoted to recording and preserving
            Satlok Ashram journeys, seva, bhandara, and satsang experiences.
          </p>
        </div>




        {/* <div className="bg-linear-to-br from-white to-amber-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-10 shadow-2xl border border-amber-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Divine Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Pilgrims</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Traveling to Spiritual lands</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Y</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Yogis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Seeking inner peace</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">D</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Devotees</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Following spiritual paths</p>
            </div>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300">
            We are blessed to serve a diverse community of spiritual seekers from all traditions and backgrounds.
          </p>
        </div> */}

        {/* Final Message */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🙏🕊️🪷</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Join Our Spiritual Family
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Whether you're documenting your first temple visit or preserving decades of spiritual journeys, we're here to honor your path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Begin Your Journey
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Return Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-amber-200 dark:border-gray-700">
          
          <p className="text-lg font-medium bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            The Spiritual Journey Tracker Team
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            🙏🙏🙏Sat Saheb🙏🙏🙏
          </p>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;