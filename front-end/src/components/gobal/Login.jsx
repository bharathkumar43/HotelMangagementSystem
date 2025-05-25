import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Form submission triggered with:", { username, password }); // Debug log
  try {
    const response = await axios.post("http://localhost:9099/login", {
      username,
      password,
    });
    console.log("Login response:", response.data);

    const token = response.data.token;
    const usernameFromResponse = response.data.username;
    const role = response.data.role;

    localStorage.setItem("token", token);
    localStorage.setItem("username", usernameFromResponse);
    localStorage.setItem("role", role);

    if (role === "ROLE_ADMIN") {
      navigate("/Admin");
    } else {
      navigate("/Rooms");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid username or password");
  }
};
  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="overlay"></div>
        <div className="hotel-text">
          <h1>GRAND HOTEL</h1>
          <p>LUXURY | COMFORT | EXPERIENCE</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  console.log("Username input changed:", e.target.value); // Debug log
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  console.log("Password input changed:", e.target.value); // Debug log
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
          <div className="other-links">
            <p>
              <Link to="/forgot-password">Forgot Password?</Link> {/* Use Link instead of <a> */}
            </p>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;