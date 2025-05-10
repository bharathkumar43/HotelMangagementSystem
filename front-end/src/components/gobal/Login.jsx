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

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="overlay"></div>
        <div className="hotel-text">
          <h1>Grand Hotel</h1>
          <p>Luxury | Comfort | Experience</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"  // Changed to text input for username
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
