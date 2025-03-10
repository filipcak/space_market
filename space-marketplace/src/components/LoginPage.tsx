import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle login logic, like checking credentials
    console.log("Logged in:", { username, password });

    // After login, redirect to the Home page
    navigate("/space");
  };

  const handleGoogleLogin = () => {
    // Google login logic here
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // Facebook login logic here
    console.log("Facebook login");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Login to Space Marketplace</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="full-width" // Apply full-width class
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="full-width" // Apply full-width class
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Login
        </button>

        <div className="line"></div> {/* Line between login and social buttons */}
        
        <div className="social-button-container">
          <button type="button" className="social-button" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
          </button>
          <button type="button" className="social-button google" onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i> {/* Google icon */}
          </button>
        </div>

        <div className="line"></div> {/* Line before the registration text */}

        <p>
          <a href="/register">Don't have an account? Register here.</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
