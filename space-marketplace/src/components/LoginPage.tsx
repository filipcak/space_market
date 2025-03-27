import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backenUrl } from '../global/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch(backenUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Login failed");
        return;
      }
  
      const user = await res.json();
      // Store user info in localStorage (or context)
      localStorage.setItem("user_id", user.uuid);
      localStorage.setItem("username", user.username);
      navigate("/space");
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    }
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
          <a href="/space_market/register">Don't have an account? Register here.</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
