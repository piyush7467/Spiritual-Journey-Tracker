import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { toggleTheme } from "@/redux/themeSlice";
import {
  FaHome,
  FaPray,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBookOpen,
  FaCog,
} from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import logo from "../assets/logo.jpg";
import GoogleTranslate from "./GoogleTranslate";
import SettingsModal from "./SettingsModal";
import pic from '../assets/user.jpg'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);


  // Close mobile menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Logout handler
  const logoutHandler = useCallback(async () => {
    setIsLoggingOut(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (accessToken) {
        await axios.post(
          "http://localhost:8020/api/v1/user/logout",
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
            timeout: 5000,
          }
        );
      }
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      // Still logout locally even if API fails
    } finally {
      dispatch(logout());
      localStorage.removeItem("accessToken");
      closeMenu();
      navigate("/");
      setIsLoggingOut(false);
      toast.success("🙏 Logged out successfully. May peace be with you.");
    }
  }, [dispatch, navigate, closeMenu]);

  // Navigation items for cleaner code
  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/chant", icon: FaPray, label: "Chant" },
    { to: "/place", icon: FaMapMarkerAlt, label: "Visits" },
    { to: "/about", icon: FaInfoCircle, label: "About" },
    { to: "/contact", icon: MdContactPhone, label: "Contact Us" },
  ];

  return (
    <>

      {/* ✅ Google Translate – ALWAYS MOUNTED */}
      <div className="fixed top-17 right-18 z-9999 md:hidden">
        <GoogleTranslate />
      </div>

      <nav
        className="sticky top-0 z-50 bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-amber-900/10 backdrop-blur-xl border-b border-amber-200/30 dark:border-gray-700/30 shadow-lg"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-linear-to-r from-amber-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-xl">
                  <img
                    src={logo}
                    alt="Spiritual Journey Tracker Logo"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl bg-linear-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Spiritual Journey
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tracker</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {/* Navigation Links */}
              <div className="flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group"
                    aria-current={
                      window.location.pathname === item.to ? "page" : undefined
                    }
                  >
                    <div className="p-2 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg group-hover:scale-110 transition-transform">
                      <item.icon className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-3 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl hover:scale-110 transition-all duration-300"
                aria-label={
                  theme === "light" ? "Switch to dark mode" : "Switch to light mode"
                }
              >
                {theme === "light" ? (
                  <FaMoon className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </button>

              {/* Google Translate - Desktop */}
              {/* <div className="hidden md:block">
                <GoogleTranslate />
              </div> */}

              {/* User Section */}
              {user ? (
                <div className="flex items-center gap-4">
                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                          <Avatar className="relative border-2 border-amber-300 dark:border-amber-600">
                            <AvatarImage
                              src={user?.profilePic || pic}
                              alt={user?.name || "Bhagat"}
                            />
                            <AvatarFallback className="bg-linear-to-br from-amber-400 to-orange-400 text-white">
                              {user.name?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="hidden lg:block">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {user.name || "Divine Seeker"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email?.split("@")[0] || "Spiritual Account"}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-amber-200 dark:border-gray-700 shadow-2xl rounded-2xl mt-2"
                      align="end"
                    >
                      <DropdownMenuLabel className="text-gray-800 dark:text-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                            <FaUserCircle className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="font-semibold">{user.name || "Divine Seeker"}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {user?.email || "Spiritual@journey.com"}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-amber-200/50 dark:bg-gray-700" />

                      <DropdownMenuItem className="px-4 py-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 cursor-pointer">
                        <Link to="/dashboard" className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                            <FaUser className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              Spiritual Profile
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              View your details
                            </p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="px-4 py-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 cursor-pointer">
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                            <FaBookOpen className="text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              Journey Log
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              All your Spiritual visits
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => setOpenSettings(true)} className="px-4 py-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 cursor-pointer">
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                            <FaCog className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              Settings
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Customize your experience
                            </p>
                          </div>
                        </div>
                        <SettingsModal
                          open={openSettings}
                          onClose={() => setOpenSettings(false)}
                        />

                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-amber-200/50 dark:bg-gray-700" />

                      <DropdownMenuItem
                        onClick={logoutHandler}
                        disabled={isLoggingOut}
                        className="px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg">
                            <FaSignOutAlt className="text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {isLoggingOut ? "Logging out..." : "Sign Out"}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Peace be with you
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <FaPray />
                    Begin Journey
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Google Translate - Mobile */}
              {/* <div className="">
                <GoogleTranslate />
              </div> */}

              <button
                className="p-3 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl hover:scale-110 transition-all duration-300"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <FaTimes className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <FaBars className="text-amber-600 dark:text-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200 dark:border-gray-700 animate-fadeIn overflow-hidden">
              <div className="p-4 space-y-1">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                    aria-current={
                      window.location.pathname === item.to ? "page" : undefined
                    }
                  >
                    <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                      <item.icon className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {item.label}
                    </span>
                  </Link>
                ))}

                {/* Theme Toggle Mobile */}
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors w-full"
                >
                  <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                    {theme === "light" ? (
                      <FaMoon className="text-amber-600 dark:text-amber-400" />
                    ) : (
                      <FaSun className="text-yellow-400" />
                    )}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </span>
                </button>

                {/* User Section Mobile */}
                {user ? (
                  <>
                    <div className="border-t border-amber-200 dark:border-gray-700 pt-3 mt-3">
                      <div className="flex items-center gap-3 p-3">
                        <Avatar className="border-2 border-amber-300 dark:border-amber-600">
                          <AvatarImage
                            src={user?.profilePic || pic}
                            alt={user?.name || "User"}
                          />
                          <AvatarFallback className="bg-linear-to-br from-amber-400 to-orange-400 text-white">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {user?.name || "Bhagat"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user?.email || "Spiritual@journey.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                    >
                      <div className="p-2 bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                        <FaUser className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        Profile
                      </span>
                    </Link>

                    <button
                      onClick={logoutHandler}
                      disabled={isLoggingOut}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors w-full"
                    >
                      <div className="p-2 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg">
                        <FaSignOutAlt className="text-red-600 dark:text-red-400" />
                      </div>
                      <span className="font-medium">
                        {isLoggingOut ? "Logging out..." : "Sign Out"}
                      </span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={closeMenu} className="block mt-4">
                    <button className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <FaPray />
                      Begin Spiritual Journey
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

    </>
  );
};

export default Navbar;