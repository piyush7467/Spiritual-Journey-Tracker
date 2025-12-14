import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { 
  Loader2, User, Phone, MapPin, Mail, 
  Edit, Save, Upload, Shield, Heart,
  BookOpen, Home, UserCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { setUser, logout } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import pic from '../assets/user.jpg';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    mantras: user?.mantras || "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        profilePic: file,
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = user?.accessToken || localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("mantras", form.mantras);
      if (form.profilePic) {
        formData.append("file", form.profilePic);
      }

      const res = await axios.put(
        "https://spiritual-journey-tracker-backend.vercel.app/api/v1/user/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser({ user: res.data.user }));
        toast.success("Profile updated successfully 🙏");
        setOpen(false);
        setImagePreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      dispatch(logout());
      navigate("/login");
      toast.info("Signed out successfully");
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "DV";
  };

  const getMantraBadgeColor = (mantra) => {
    switch (mantra) {
      case "Pratham Nam": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Satnam": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Sarname": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pb-24 safe-area">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <UserCircle className="text-amber-600" />
              Your Spiritual Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Manage your account and spiritual preferences
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300"
          >
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <Card className="border-amber-200 dark:border-gray-700 shadow-xl overflow-hidden mb-6">
          <div className="bg-linear-to-r from-amber-400 to-orange-400 dark:from-amber-600 dark:to-orange-600 h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage 
                  src={imagePreview || user?.profilePic || pic} 
                  alt={user?.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-amber-100 text-amber-800 text-xl">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <CardContent className="pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user?.name || "Devotee"}
                  </h2>
                  <Badge className={`${getMantraBadgeColor(user?.mantras)} font-medium`}>
                    {user?.mantras || "Select Mantra"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{user?.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      <Edit size={20} />
                      Edit Spiritual Profile
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 border-4 border-amber-100">
                        <AvatarImage 
                          src={imagePreview || user?.profilePic || pic} 
                          alt="Preview"
                        />
                        <AvatarFallback className="bg-amber-100 text-amber-800">
                          {getInitials(form.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <Label htmlFor="profilePic" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors">
                            <Upload size={16} />
                            Change Photo
                          </div>
                          <Input 
                            id="profilePic" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          JPG, PNG or GIF (Max 5MB)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User size={14} />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone size={14} />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin size={14} />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mantras" className="flex items-center gap-2">
                        <BookOpen size={14} />
                        Spiritual Mantra
                      </Label>
                      <select
                        id="mantras"
                        name="mantras"
                        value={form.mantras}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">Select your mantra</option>
                        <option value="Pratham Nam">Pratham Nam</option>
                        <option value="Satnam">Satnam</option>
                        <option value="Sarname">Sarname</option>
                      </select>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your chosen spiritual mantra for all visits
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        setImagePreview(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={loading || !form.name.trim()}
                      className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="border-amber-200 dark:border-gray-700">
            <CardHeader className="bg-amber-50 dark:bg-gray-800/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail size={18} />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label className="text-gray-500 dark:text-gray-400 text-sm">Email Address</Label>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 dark:text-gray-400 text-sm">Phone Number</Label>
                <p className="font-medium">{user?.phone || "Not provided"}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 dark:text-gray-400 text-sm">Address</Label>
                <p className="font-medium">{user?.address || "Not provided"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Spiritual Information */}
          <Card className="border-purple-200 dark:border-purple-900/30">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart size={18} className="text-purple-600 dark:text-purple-400" />
                Spiritual Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label className="text-gray-500 dark:text-gray-400 text-sm">Chosen Mantra</Label>
                <Badge className={`${getMantraBadgeColor(user?.mantras)} text-base py-1`}>
                  {user?.mantras || "Not selected"}
                </Badge>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  This mantra will be used for all your spiritual visits
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 dark:text-gray-400 text-sm">Account Status</Label>
                <div className="flex items-center gap-2">
                  <Shield className="text-green-600" size={16} />
                  <span className="font-medium text-green-600">Active</span>
                  <Badge variant="outline" className="ml-2">
                    Devotee
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <Card className="mt-6 border-red-200 dark:border-red-900/30">
          <CardHeader className="bg-red-50 dark:bg-red-900/20">
            <CardTitle className="text-lg">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/forgot-password")}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/place")}
                className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300"
              >
                View My Visits
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="ml-auto"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Spiritual Footer */}
        <div className="text-center mt-10">
          <div className="text-3xl mb-2">🪷🙏🪷</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            May your spiritual journey be blessed with peace and enlightenment
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Sat Saheb - May Truth Prevail
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;