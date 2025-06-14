import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Footer } from "./components/Footer";
import WebgenAIStudio from "./pages/Workspace";

const App = () => {
  const location = useLocation();

  const isWorkspace = location.pathname === "/workspace";

  return (
    <>
      {!isWorkspace && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<WebgenAIStudio />} />
      </Routes>

      {!isWorkspace && <Footer />}
    </>
  );
};

export default App;
