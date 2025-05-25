import React, { useState } from 'react';
import './Contact.css'; // Make sure you have this CSS file linked

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been submitted!');
    // You can add logic to send form data to the server here
  };

  return (
    <div className="contact-wrapper">
      {/* Left Side: Contact Info */}
      <div className="contact-left">
        <h2>Contact Information</h2>
        <p>Get in touch with us. We're here to help!</p>
        <div className="contact-details">
          <p><i className="fas fa-map-marker-alt"></i> 123 Grand Street, Hyderabad, India</p>
          <p><i className="fas fa-phone"></i> +91 98765 43210</p>
          <p><i className="fas fa-envelope"></i> info@manohargrandhotel.com</p>
        </div>
      </div>

      {/* Right Side: Contact Form */}
      <div className="contact-right">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <textarea 
              placeholder="Your Message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>

          <button type="submit" className="btn-contact">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
