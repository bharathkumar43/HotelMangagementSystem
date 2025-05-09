import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      {/* Left Side - Hotel Image & Name */}
      <div className="login-left">
        <div className="overlay"></div>
        <div className="hotel-text">
          <h1> Grand Hotel</h1>
          <p>Luxury | Comfort | Experience</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <form>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" required />
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
