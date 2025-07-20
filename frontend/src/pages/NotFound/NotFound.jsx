import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom"; // Use Link for client-side routing

function NotFound() {
  return (
    <div className="not-found-container-minimal">
      <div className="not-found-content-minimal">
        <h1 className="error-code-minimal">404</h1>
        <p className="error-message-minimal">Page Not Found</p>
        <p className="error-description-minimal">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="home-link-minimal">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
