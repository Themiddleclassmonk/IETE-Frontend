import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (url) => {
    const params = new URLSearchParams(url);
    return params.get('token');
  }

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const token = getQueryParams(location.search);

    try {
      const response = await axios.post(
        "http://localhost:4000/admin/reset-password",
        { token, newPassword }
      );

      if (response.data.message === "Password has been reset successfully.") {
        setSuccess("Your password has been successfully reset!");
        setTimeout(() => navigate("/admin/loginForm"), 2000);  // Redirect after 2 seconds
      }
    } catch (err) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <div >{error}</div>}
      {success && <div >{success}</div>}
      <form onSubmit={resetPasswordHandler}>
        <div >
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
