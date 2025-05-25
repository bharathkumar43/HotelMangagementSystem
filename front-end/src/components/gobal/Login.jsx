<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Use username instead of email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9099/login', {
        username: username,  // Send username and password
        password: password
      });

      const { token, role, username: loggedInUsername } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', loggedInUsername);
      localStorage.setItem('role', role);

      // Navigate based on role
      if (role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (role === 'ROLE_USER') {
        navigate('/home');
      } else {
        navigate('/');
      }

    } catch (error) {
      alert('Invalid username or password');
    }
  };

>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="overlay"></div>
        <div className="hotel-text">
<<<<<<< HEAD
          <h1>GRAND HOTEL</h1>
          <p>LUXURY | COMFORT | EXPERIENCE</p>
        </div>
      </div>
=======
          <h1>Grand Hotel</h1>
          <p>Luxury | Comfort | Experience</p>
        </div>
      </div>

>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
<<<<<<< HEAD
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
=======
                type="text"  // Changed to text input for username
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
<<<<<<< HEAD
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
=======
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-login">Login</button>

            <div className="other-links">
              <Link to="/forgot-password">Forgot Password?</Link>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </form>
>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 7b425c3e568c7e513e280977cc29a6ed13dd4186
