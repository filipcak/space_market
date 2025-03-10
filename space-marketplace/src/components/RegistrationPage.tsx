import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle registration logic, like sending data to a backend
    console.log("Registered:", { username, email, password });
    
    // After registration, redirect to login page
    navigate("/login");
  };

  return (
    <div className="registration-page">
      <form onSubmit={handleRegistration}>
        <h2>Register for Space Marketplace</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </label>
          <br />
          <button type="submit">Register</button>
          <div className="line"></div> {/* Line before the registration text */}
          <p>
            <a href="/login">Already have an account? Login</a>
          </p>
      </form>
     
    </div>
  );
};

export default RegistrationPage;
