import React, { useState } from "react";
import "./LoginPage.css";
import { SignIn } from "../../api/dealer/dealerApi";
import {
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../../constants/httpStatusCodes";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }
      const res = await SignIn({ email, password });

      if (res && res.status === STATUS_OK) {
        navigate("/");
      } else if (res && res.status === STATUS_UNAUTHORIZED) {
        setError("Invalid credentials");
      } else {
        setError(res?.data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (err.status === STATUS_UNAUTHORIZED) {
        setError("Invalid credentials");
      } else {
        setError(
          "An unexpected error occurred. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-panel">
        <section className="login-panel-left">
          <h2>Your Next Treasure Awaits.</h2>
          <p>Sign in to discover, buy, and sell unique pre-loved items.</p>
        </section>

        <section className="login-panel-right">
          <h3>Welcome to ReVibe</h3>

          <div className="social-login">
            <a href="#" className="social-btn" aria-label="Login with Google">
              <i className="fab fa-google"></i> Google
            </a>
            <a href="#" className="social-btn" aria-label="Login with Facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
          </div>

          <div className="separator" style={{ margin: "0 0 1.5rem" }}>
            OR
          </div>

          <form onSubmit={handleLogin} noValidate>
            {error && <p className="error-api">{error}</p>}
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>

            <div className="form-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fas fa-lock input-icon"></i>
              <i
                className={`fas ${
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                } password-toggle-icon`}
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              ></i>
            </div>

            <div className="form-extras">
              <label>
                <input type="checkbox" name="remember" /> Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-login">
              Sign In
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Create one now</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
