import React, { useState } from "react";
import "./ChangePasswordForm.css";
import {
  verifyAndChangePassword,
  verifyPassword,
} from "../../api/dealer/dealerApi";
import { STATUS_OK } from "../../constants/httpStatusCodes";
import Swal from "sweetalert2";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerifyCurrentPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await verifyPassword({ password: currentPassword });
      if (res && res.status === STATUS_OK) {
        setIsPasswordVerified(true);
      } else {
        setError("The password you entered is incorrect. Please try again.");
      }
    } catch (apiError) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmedNewPassword) {
      setError("The new password and confirmation do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyAndChangePassword({
        otp,
        new_password: newPassword,
      });

      if (res && res.status === STATUS_OK) {
        Swal.fire({
          title: "Success!",
          text: "Your password has been changed successfully.",
          icon: "success",
          confirmButtonColor: "#3182ce",
        });
        setIsPasswordVerified(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmedNewPassword("");
        setOtp("");
      } else {
        setError(
          res?.data?.message || "Invalid OTP or failed to change password."
        );
      }
    } catch (apiError) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-header">
        <h2>Change Password</h2>
        <p>
          {!isPasswordVerified
            ? "First, verify your current password to proceed."
            : "Enter the OTP and your new password."}
        </p>
      </div>

      {!isPasswordVerified ? (
        <form onSubmit={handleVerifyCurrentPassword} className="pc-form">
          <div className="pc-form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              className="pc-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="pc-button"
            disabled={isLoading || !currentPassword}
          >
            {isLoading && <div className="pc-loader"></div>}
            <span>Send OTP</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleChangePassword} className="pc-form">
          <div className="pc-form-group">
            <label htmlFor="otp">Verification Code (OTP)</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              className="pc-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="pc-form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="pc-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="pc-form-group">
            <label htmlFor="confirmPassword">Re-enter New Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="pc-input"
              value={confirmedNewPassword}
              onChange={(e) => setConfirmedNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="pc-button" disabled={isLoading}>
            {isLoading && <div className="pc-loader"></div>}
            <span>Change Password</span>
          </button>
        </form>
      )}

      {error && <p className="pc-error-message">{error}</p>}
    </div>
  );
}

export default ChangePasswordForm;
