import React, { useState } from "react";
import "./SignupPage.css";
import { STATUS_CREATED, STATUS_OK } from "../../constants/httpStatusCodes";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../../api/dealer/dealerApi";

function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    const { firstName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = "First name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { confirmPassword, ...apiPayload } = formData;
      setLoading(true);
      const res = await SignUp(apiPayload);
      setLoading(false);
      if (res && res.status === STATUS_CREATED) {
        navigate("/login");
      } else {
        setErrors({
          api: res?.data?.message || "Sign up failed. Please try again.",
        });
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-panel">
        <section className="login-panel-left">
          <h2>Join the Community.</h2>
          <p>Create an account to start your journey with ReVibe.</p>
        </section>

        <section className="login-panel-right">
          <h3>Create an Account</h3>

          <form onSubmit={handleSignUp} noValidate>
            {errors.api && <p className="error-api">{errors.api}</p>}
            <div className="form-group">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user input-icon"></i>
              {errors.firstName && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="lastName"
                placeholder="Last Name (Optional)"
                value={formData.lastName}
                onChange={handleChange}
              />
              <i className="fas fa-user input-icon"></i>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i className="fas fa-envelope input-icon"></i>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
              />
              <i className="fas fa-phone input-icon"></i>
            </div>

            <div className="form-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock input-icon"></i>
              <i
                className={`fas ${
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                } password-toggle-icon`}
                onClick={togglePasswordVisibility}
              ></i>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock input-icon"></i>
              <i
                className={`fas ${
                  confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                } password-toggle-icon`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? <> Sign Up</> : <>Please wait....</>}
            </button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default SignUpPage;
