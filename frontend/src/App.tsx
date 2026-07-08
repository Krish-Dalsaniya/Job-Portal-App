import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import { authService } from "./api/authService";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getUser();
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
          <Route path="/application/:id" element={<ProtectedRoute><Application /></ProtectedRoute>} />
          <Route path="/applications/me" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
          <Route path="/job/post" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/job/me" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
