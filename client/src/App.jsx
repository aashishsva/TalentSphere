import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import { api } from "./services/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedJobs from "./components/FeaturedJobs";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedJobs from "./pages/SavedJobs";
import RecruiterDashboard from "./pages/RecuiterDashboard";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();

  // 🔥 MOST IMPORTANT FIX
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/users/me");

        dispatch(
          loginSuccess({
            user: res.data.user,
            token,
          }),
        );
      } catch (err) {
        console.log("User fetch failed");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="glow-bg" />
      <BrowserRouter>
        <Toaster position="top-right" />

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
               <Home/>
              </>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <ProtectedRoute role="candidate">
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="recruiter">
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route path="/profile/:id" element={<PublicProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
