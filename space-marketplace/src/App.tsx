import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./components/Planet";
import Sun from "./components/Sun";
import Stars from "./components/Stars";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import SpacePage from "./components/SpacePage";
import SearchSpacePage from "./components/SearchSpacePage";
import ObjectDetailPage from "./components/ObjectDetailPage";
import AdminPage from "./components/AdminPage";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="canvas-container">
      <Canvas shadows camera={{ position: [0, 0, 200], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Stars />
        <Sun />

        {/* Planets */}
        <Planet position={[57.9, 0, 0]} size={3} texturePath="/textures/mercury.jpg" speed={0.02} />
        <Planet position={[108.2, 0, 0]} size={5} texturePath="/textures/venus.jpg" speed={0.015} />
        <Planet position={[149.6, 0, 0]} size={6} texturePath="/textures/earth.jpg" speed={0.01} />
        <Planet position={[227.9, 0, 0]} size={4} texturePath="/textures/mars.jpg" speed={0.008} />
        <Planet position={[778.5, 0, 0]} size={10} texturePath="/textures/jupiter.jpg" speed={0.004} /> {/* Jupiter */}
        <Planet position={[1429, 0, 0]} size={8} texturePath="/textures/saturn.jpg" speed={0.002} /> {/* Saturn */}
        <Planet position={[2871, 0, 0]} size={7} texturePath="/textures/uranus.jpg" speed={0.0015} /> {/* Uranus */}
        <Planet position={[4495, 0, 0]} size={6} texturePath="/textures/neptune.jpg" speed={0.001} /> {/* Neptune */}

        <OrbitControls />
      </Canvas>

      {/* Login UI */}
      <div className="login-container">
        <h1>Welcome to Space Marketplace 🚀</h1>
        <button onClick={() => navigate("/login")} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/space" element={<SpacePage />} />
        <Route path="/search-space" element={<SearchSpacePage />} />
        <Route path="/object-detail" element={<ObjectDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
