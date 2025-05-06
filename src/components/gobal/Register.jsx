import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Same CSS file!
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const uname = useRef(null);
  const upwd = useRef(null);
  const email = useRef(null);
  const mobile = useRef(null);
  const role = useRef(null);
  const fileInput = useRef(null); // for file input

  const navigate= useNavigate();

  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const register = async (e) => {
    e.preventDefault(); // Prevent form from reloading
  
    // Create user data as JSON string
    const userJson = JSON.stringify({
      name: uname.current.value,
      password: upwd.current.value,
      email: email.current.value,
      mobile: mobile.current.value,
      role: role.current.value,
    });
  
    const formData = new FormData();
    
    // Append the JSON blob (user data) and image to the FormData
    formData.append('user', new Blob([userJson], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data === "user data saved successfully") {
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error registering!", error); // Handle error
    }
  };
  

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

      {/* Right Side - Registration Form */}
      <div className="login-right">
        <div className="login-box">
          <h2>Create an Account</h2>
          <form onSubmit={register}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                ref={uname}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                ref={email}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Mobile Number"
                ref={mobile}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                ref={upwd}
                required
              />
            </div>

            <div className="form-group">
              <select ref={role} required>
                <option value="">Select Role</option>
                <option value="Role_USER">User</option>
                <option value="Role_ADMIN">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" onClick={register} className="btn-login">Register</button>

            <div className="other-links">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
