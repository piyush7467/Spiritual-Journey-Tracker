import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaPlus, FaEdit, FaTrash, FaUsers,
  FaCalendarAlt, FaMapMarkerAlt, FaEye,
  FaEyeSlash, FaSpinner, FaPray,
  FaFilePdf, FaDownload, FaHome, FaHeart,
  FaUserCircle, FaSignOutAlt, FaBell,
  FaFilter, FaSearch, FaTimes, FaCalendarDay,
  FaUser, FaBook, FaQuoteLeft, FaStar
} from "react-icons/fa";
import PdfGenerator from "@/components/PdfGenerator";

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedMembers, setExpandedMembers] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [visitTypeFilter, setVisitTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = user?.accessToken || localStorage.getItem("accessToken");
    const fetchPlaces = async () => {
      try {
        const res = await axios.get("http://localhost:8020/api/v1/place/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const visits = res.data?.visits ?? [];
        console.log("Fetched places:", visits); // Debug log
        setPlaces(visits);
        setFilteredPlaces(visits);
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("Failed to load Spiritual places");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [user]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...places];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(place =>
        place.place?.toLowerCase().includes(term) ||
        (place.customPurpose || place.purpose || "").toLowerCase().includes(term) ||
        place.visitType?.toLowerCase().includes(term) ||
        place.mantras?.toLowerCase().includes(term) ||
        place.familyMembers?.some(member =>
          member.name?.toLowerCase().includes(term) ||
          member.mantras?.toLowerCase().includes(term)
        )
      );
    }

    // Apply visit type filter
    if (visitTypeFilter !== "all") {
      result = result.filter(place => place.visitType === visitTypeFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastYear = new Date(today);
      lastYear.setFullYear(lastYear.getFullYear() - 1);

      result = result.filter(place => {
        if (!place.date) return false;
        const visitDate = new Date(place.date);

        switch (dateFilter) {
          case "today":
            return visitDate >= today;
          case "yesterday":
            return visitDate >= yesterday && visitDate < today;
          case "week":
            return visitDate >= lastWeek;
          case "month":
            return visitDate >= lastMonth;
          case "year":
            return visitDate >= lastYear;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);

      switch (sortBy) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "name-asc":
          return (a.place || "").localeCompare(b.place || "");
        case "name-desc":
          return (b.place || "").localeCompare(a.place || "");
        default:
          return 0;
      }
    });

    setFilteredPlaces(result);
  }, [places, searchTerm, visitTypeFilter, dateFilter, sortBy]);

  const deletePlace = async (id) => {
    if (window.confirm("🙏 Are you sure you want to delete this Spiritual visit?")) {
      try {
        const token = user?.accessToken || localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:8020/api/v1/place/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces((prev) => prev.filter((item) => item._id !== id));
        alert("✅ Spiritual visit deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete visit. Please try again.");
      }
    }
  };

  const toggleMembers = (id) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = () => {
    if (window.confirm("🙏 Are you sure you want to sign out?")) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setVisitTypeFilter("all");
    setDateFilter("all");
    setSortBy("newest");
  };

  // Get unique visit types for filter
  const uniqueVisitTypes = useMemo(() => {
    const types = new Set(places.map(place => place.visitType).filter(Boolean));
    return Array.from(types);
  }, [places]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🙏</div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">Loading Spiritual Journeys...</h2>
          <div className="flex justify-center">
            <FaSpinner className="animate-spin text-amber-600 dark:text-amber-400 text-3xl" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Collecting blessings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 safe-area">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-amber-100 dark:border-gray-700">
          <div className="text-5xl text-center mb-6">🙏</div>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 text-center mb-3">Connection with Divine Lost</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const pdfData = filteredPlaces.map((place) => ({
    Place: place.place,
    Date: place.date ? new Date(place.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'N/A',
    Name: user?.name || "Divine Seeker",
    Mantra: place.mantras || 'Not specified',
    Purpose: place.customPurpose || place.purpose || 'N/A',
    "Visit Type": place.visitType || 'N/A',
    FamilyMembers: place.familyMembers || []
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pb-24 safe-area transition-colors duration-300">
      {/* Fixed Spiritual Header */}
      <div className="sticky top-0 z-20 bg-linear-to-r from-amber-400/10 via-orange-400/10 to-amber-400/10 dark:from-amber-700/10 dark:via-orange-700/10 dark:to-amber-700/10 backdrop-blur-lg rounded-3xl p-4 mb-6 -mx-2 shadow-lg border border-white/30 dark:border-gray-700/30">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 rounded-xl shadow">
              <FaPray className="text-amber-700 dark:text-amber-300 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Spiritual Visits</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <FaHeart className="text-red-400" size={10} />
                {filteredPlaces.length} blessed {filteredPlaces.length === 1 ? 'journey' : 'journeys'}
                {filteredPlaces.length !== places.length && ` (filtered from ${places.length})`}
              </p>
            </div>
          </div>

          {/* User Welcome Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800 dark:text-white">Welcome,</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {user?.name || "Divine Seeker"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/profile")}
                className="p-2 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 rounded-full hover:shadow-md transition-all duration-300"
                title="Your Profile"
              >
                <FaUserCircle className="text-amber-700 dark:text-amber-300 text-lg" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-linear-to-br from-red-100 to-pink-100 dark:from-red-800 dark:to-pink-800 rounded-full hover:shadow-md transition-all duration-300"
                title="Sign Out"
              >
                <FaSignOutAlt className="text-red-600 dark:text-red-300 text-lg" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full sm:w-auto">
            <PdfGenerator
              data={pdfData}
              fileName={`Spiritual_visits_${new Date().toISOString().split('T')[0]}.pdf`}
              title="Spiritual Visits Report"
            />
            <button
              onClick={() => navigate("/add-place")}
              className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium"
            >
              <FaPlus />
              <span>Add Visit</span>
            </button>
          </div>

        </div>

        <div className="sm:hidden flex items-center gap-2 w-full sm:w-auto mt-4">
          <PdfGenerator
            data={pdfData}
            fileName={`Spiritual_visits_${new Date().toISOString().split('T')[0]}.pdf`}
            title="Spiritual Visits Report"
            compact
          />
          <button
            onClick={() => navigate("/add-place")}
            className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
          >
            <FaPlus />
            <span>Add Visit</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search places, purposes, or mantras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-amber-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-800/20 dark:to-orange-800/20 border border-amber-200 dark:border-amber-800/30 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <FaFilter className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </span>
              {Object.values({ searchTerm, visitTypeFilter, dateFilter, sortBy }).some(val => val !== "" && val !== "all" && val !== "newest") && (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Clear Filters Button */}
            {(searchTerm || visitTypeFilter !== "all" || dateFilter !== "all" || sortBy !== "newest") && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800/30 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <FaTimes className="text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Clear</span>
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-amber-200 dark:border-gray-700 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Visit Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Visit Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setVisitTypeFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${visitTypeFilter === "all"
                        ? "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow"
                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40"
                        }`}
                    >
                      All
                    </button>
                    {uniqueVisitTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setVisitTypeFilter(type)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${visitTypeFilter === type
                          ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-amber-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-amber-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="mantra">By Mantra</option>
                  </select>
                </div>

                {/* Stats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statistics
                  </label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Total: {places.length} visits</p>
                    <p>Showing: {filteredPlaces.length} visits</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-amber-200 dark:bg-amber-800/30 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(filteredPlaces.length / Math.max(places.length, 1)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {Math.round((filteredPlaces.length / Math.max(places.length, 1)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {filteredPlaces.length === 0 ? (
          <div className="bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl border border-amber-100 dark:border-gray-700">
            <div className="text-7xl mb-6">🙏</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {places.length === 0 ? "No Spiritual Visits Yet" : "No Matching Visits Found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {places.length === 0
                ? "Begin documenting your spiritual journeys and blessings received at Spiritual places."
                : "Try adjusting your filters or search term to find what you're looking for."
              }
            </p>
            {searchTerm || visitTypeFilter !== "all" || dateFilter !== "all" ? (
              <button
                onClick={clearFilters}
                className="bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mr-3"
              >
                Clear Filters
              </button>
            ) : null}
            <button
              onClick={() => navigate("/add-place")}
              className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {places.length === 0 ? "Document First Journey" : "Add New Visit"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPlaces.map((item) => (
              <div
                key={item._id}
                className="bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-500"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-amber-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl shadow">
                        <FaMapMarkerAlt className="text-amber-700 dark:text-amber-300 text-2xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
                          {item.place || "Unnamed Place"}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${item.visitType === "family"
                            ? "bg-linear-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                            }`}>
                            {item.visitType || "individual"}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <FaCalendarAlt size={10} />
                            {item.date ? new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : "No date"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Visit Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    {/* Name Section */}
                    <div className="p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Your Name</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 pl-4">
                        {user?.name || "Divine Seeker"}
                      </p>
                    </div>

                    {/* Mantra Section */}
                    <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBook className="text-purple-600 dark:text-purple-400 text-sm" />
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">Spiritual Mantra</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 pl-4">
                        {item.mantras ? (
                          <span className="inline-flex items-center gap-1">
                            {item.mantras}
                            {item.mantras.includes("Nam") && "🙏"}
                            {item.mantras.includes("Satnam") && "🌟"}
                            {item.mantras.includes("Om") && "🕉️"}
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 italic">Not specified</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Purpose Section */}
                  <div className="mb-5 p-4 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <FaStar className="text-amber-600 dark:text-amber-400 text-sm" />
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Spiritual Purpose</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-4">
                      {item.customPurpose || item.purpose || "Not specified"}
                    </p>
                  </div>

                  {/* Family Members Section */}
                  {item.visitType === "family" && item.familyMembers?.length > 0 && (
                    <div className="mb-5">
                      <button
                        onClick={() => toggleMembers(item._id)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <FaUsers className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <span className="font-medium">Family Members</span>
                            <p className="text-xs opacity-75">{item.familyMembers.length} blessed souls</p>
                          </div>
                        </div>
                        {expandedMembers[item._id] ?
                          <FaEyeSlash className="text-blue-600 dark:text-blue-400" /> :
                          <FaEye className="text-blue-600 dark:text-blue-400" />
                        }
                      </button>

                      {expandedMembers[item._id] && (
                        <div className="mt-3 p-4 bg-linear-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                          <div className="space-y-3">
                            {item.familyMembers.map((member, index) => (
                              <div
                                key={member._id || index}
                                className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-white/50 dark:border-gray-700/50"
                              >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                                      <p className="font-medium text-gray-800 dark:text-white">
                                        {member.name || "Unnamed"}
                                      </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                        {member.relationship || "Not specified"}
                                      </span>
                                      {member.age && (
                                        <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                                          Age: {member.age}
                                        </span>
                                      )}
                                      {member.mantras && (
                                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                                          Mantra: {member.mantras}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => navigate(`/update-place/${item._id}`)}
                      className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deletePlace(item._id)}
                      className="flex-1 bg-linear-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => navigate("/add-place")}
        className="fixed bottom-6 right-4 z-30 sm:hidden w-16 h-16 bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300"
        aria-label="Add new Spiritual visit"
      >
        <FaPlus size={24} />
      </button>

      {/* Spiritual Footer */}
      <div className="max-w-2xl mx-auto mt-10 text-center px-2">
        <div className="text-3xl mb-2">🪷🙏🕊️</div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          May peace and blessings accompany all your spiritual journeys
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {filteredPlaces.length > 0 && `Showing ${filteredPlaces.length} of ${places.length} blessed visits`}
        </div>
      </div>
    </div>
  );
};

export default PlaceList;