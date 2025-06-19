import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Footer } from "./components/Footer";
import Profile from "./pages/Profile";
import WebgenAIStudio from "./pages/Workspace";
import WebgenWorkspaceId from "./pages/WorkspaceId"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  
  const isWorkspace = location.pathname.includes("/workspace");

  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [fetchProfile, isAuthenticated]);

  return (
    <>
      {!isWorkspace && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<WebgenAIStudio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workspace/:id" element={<WebgenWorkspaceId/>}/>
      </Routes>


      {!isWorkspace  && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
        aria-label={undefined}      />
    </>
  );
};

export default App;
