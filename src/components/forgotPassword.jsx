import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/forgot.css'; // Import your CSS file

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [errors, setErrors] = useState({ username: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/admin/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Check your email for further instructions.');
        navigate("/admin/loginForm");
      } else {
        const error = await response.json();
        setErrors({ ...errors, [error.field]: error.message }); // Display field-specific errors
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="forgotBody">
    <div className="forgotform-container">
      <h2 className="forgotform-title">Forgot Password</h2>
      <form onSubmit={handleSubmit} action="http://localhost:4000/admin/forgotPassword" method="POST">
        <div className="forgotform-group">
          <label className="forgotlabel" htmlFor="username">Username:</label>
          <input
            className="forgotinput"
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <span className="error-message" id="usernameError">{errors.username}</span>
        </div>
        <div className="form-group">
          <label className="forgotlabel" htmlFor="email">Email:</label>
          <input
            className="forgotinput"
            type="email"
            id="email"
            name="email"
            placeholder="eg: xyz@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <span className="forgoterror-message" id="emailError">{errors.email}</span>
        </div>
        <button type="submit" className="forgotsubmit-button">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default ForgotPassword;

