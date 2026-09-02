import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import ServiceDetail from "./pages/ServiceDetail";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07111D] transition-all duration-500">
      <LoadingScreen />

      <ScrollToHash />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
