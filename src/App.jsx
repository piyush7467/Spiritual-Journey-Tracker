import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/verification/VerifyEmail";
import Verify from "./pages/auth/verification/Verify";
import ForgotPassword from "./pages/auth/verification/ForgotPassword";
import VerifyOTP from "./pages/auth/verification/VerifyOTP";
import ChangePassword from "./pages/auth/verification/ChangePassword";
import Chant from "./pages/Chant";
import About from "./pages/About";
import PlaceForm from "./pages/PlaceList.jsx";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";
import ContactPage from "./pages/Contact";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // ✅ Router context applies to Navbar + Footer
    children: [
      { index: true, element: <Home /> },
      { path: "chant", element: <Chant /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactPage /> },
      { path: "place", element: <PlaceForm /> },
      { path: "add-place", element: <AddPlace /> },
      { path: "update-place/:id", element: <EditPlace /> },
      { path: "/dashboard", element: <Profile /> },

      // Auth routes 
      { path: "/signup", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/verify", element: <VerifyEmail /> },
      { path: "/verify/:token", element: <Verify /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp/:email", element: <VerifyOTP /> },
      { path: "/change-password/:email", element: <ChangePassword /> },
    ],
  },

  // Auth routes (no navbar/footer)
  // { path: "/signup", element: <Register /> },
  // { path: "/login", element: <Login /> },
  // { path: "/verify", element: <VerifyEmail /> },
  // { path: "/verify/:token", element: <Verify /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
  // { path: "/verify-otp/:email", element: <VerifyOTP /> },
  // { path: "/change-password/:email", element: <ChangePassword /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
