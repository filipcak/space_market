import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backenUrl } from '../global/constants';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch(backenUrl + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          permissions: ["user"], // or whatever default role you want
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Registration failed.");
        return;
      }
  
      alert("✅ Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("❌ An error occurred. Please try again.");
      console.error("Registration error:", err);
    }
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
            <a href="/space_market/login">Already have an account? Login</a>
          </p>
      </form>
     
    </div>
  );
};

export default RegistrationPage;
