import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [publicUser, setPublicUser] = useState({ username: "", password: "" });

  const handlePublicInputChange = (e) => {
    const { name, value } = e.target;
    setPublicUser({ ...publicUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicUser),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/admin/adminDashboard");
      } else {
        const error = await response.json();
        alert("Login failed: " + error.message);
      }
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  const handleForgotPassword = () => {
    navigate("/admin/forgotPassword");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={publicUser.username}
          onChange={handlePublicInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={publicUser.password}
          onChange={handlePublicInputChange}
        />
      </div>
      <div>
        <button type="button" onClick={handleForgotPassword}>
          Forgot Password
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
