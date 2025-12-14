import React from "react";
import { Link } from "react-router-dom";
import { 
  FaHeart, FaPray, FaEnvelope, FaPhone, 
  FaMapMarkerAlt, FaInstagram, FaFacebook, 
  FaTwitter, FaYoutube, FaGithub, FaLinkedin,
  FaShieldAlt, FaLock, FaStar, FaHandsHelping,
  FaLeaf, FaBookOpen, FaHome
} from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-amber-200 dark:border-gray-800 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-r from-amber-400 to-orange-400 rounded-full blur opacity-30"></div>
                <div className="relative p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-xl">
                  <div className="text-2xl">🪷</div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-2xl bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Spiritual Journey
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Divine Tracker</p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A divine platform dedicated to preserving spiritual journeys, Spiritual memories, and blessed pilgrimages for seekers worldwide.
            </p>
            
            <div className="flex items-center gap-3 pt-4">
              <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                <FaHeart className="text-red-500 dark:text-red-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created with divine love and blessings
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaStar className="text-amber-500" />
              Divine Navigation
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <FaHome className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/chant" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <FaPray className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span>Chant</span>
                </Link>
                
                <Link 
                  to="/place" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span>Visits</span>
                </Link>
              </div>
              
              <div className="space-y-3">
                <Link 
                  to="/about" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <FaBookOpen className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span>About</span>
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <FaHandsHelping className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                >
                  <div className="p-1.5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md group-hover:scale-110 transition-transform">
                    <MdContactPhone className="text-amber-600 dark:text-amber-400 text-sm" />
                  </div>
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaLock className="text-green-500" />
              Divine Contact
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg mt-1">
                  <FaEnvelope className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">piyushshakya7467@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg mt-1">
                  <FaPhone className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Support</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">6398667467</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg mt-1">
                  <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Spiritual Center</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Satlok Ashram, Mundka, Delhi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Security */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaShieldAlt className="text-purple-500" />
              Connect Securely
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                  <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-sm" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your spiritual data is protected with divine encryption
                </p>
              </div>
              
              {/* Social Links */}
              <div className="pt-4">
                <p className="font-medium text-gray-800 dark:text-white mb-3">Divine Social</p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.facebook.com/spiritualleaderSaintRampalJI" 
                    className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-110 transition-transform duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-blue-600 dark:text-blue-400" />
                  </a>
                  <a 
                    href="https://www.instagram.com/spiritualleadersaintrampalji/" 
                    className="p-2 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:scale-110 transition-transform duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-purple-600 dark:text-purple-400" />
                  </a>
                  <a 
                    href="https://x.com/SaintRampalJiM" 
                    className="p-2 bg-linear-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-110 transition-transform duration-300"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-cyan-600 dark:text-cyan-400" />
                  </a>
                  <a 
                    href="https://www.youtube.com/santrampaljimaharajji" 
                    className="p-2 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl hover:scale-110 transition-transform duration-300"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="text-red-600 dark:text-red-400" />
                  </a>
                  
                  {/* <a 
                    href="#" 
                    className="p-2 bg-linear-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:scale-110 transition-transform duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-blue-700 dark:text-blue-300" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-amber-200 dark:border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <FaLeaf className="text-green-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with divine intention and mindful coding
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Spiritual Journey Tracker. All blessings reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Spiritual Bottom Bar */}
      <div className="bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-amber-900/10 border-t border-amber-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🕉️</span>
                <span className="text-lg">☸️</span>
                <span className="text-lg">✡️</span>
                <span className="text-lg">☪️</span>
                <span className="text-lg">✝️</span>
                <span className="text-lg">☯️</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Serving all spiritual paths with equal love
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                System Status: <span className="text-green-600 dark:text-green-400">All Divine</span>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium bg-linear-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                🙏🙏🙏 Sat Saheb 🙏🙏🙏
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;