import React, { useState } from "react";
import "./Header.css"; // Import the component-specific CSS
import { useNavigate } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    // Use a Fragment <> to avoid an unnecessary div wrapper
    <>
      {/* Conditionally apply the 'active' class based on state */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <a href="#" className="sidebar-logo">
            ReVibe
          </a>
          {/* Add onClick handler to the close button */}
          <button className="close-btn" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-mobile-alt"></i> Electronics
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-couch"></i> Furniture
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-tshirt"></i> Fashion
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-car"></i> Vehicles
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-actions">
          <a href="/login" className="btn btn-secondary">
            Log In
          </a>
          <a href="#" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Sell Item
          </a>
        </div>
      </div>

      {/* Conditionally apply the 'active' class and add onClick handler */}
      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo">
              ReVibe
            </a>
            <nav className="main-nav">
              <ul>
                <li>
                  <a href="#">Electronics</a>
                </li>
                <li>
                  <a href="#">Furniture</a>
                </li>
                <li>
                  <a href="#">Fashion</a>
                </li>
                <li>
                  <a href="#">Vehicles</a>
                </li>
              </ul>
            </nav>
            <div className="header-actions">
              <a href="/login" className="btn btn-secondary">
                Log In
              </a>
              <a href="#" className="btn btn-primary">
                <i className="fas fa-plus-circle"></i> Sell Item
              </a>
            </div>
            {/* Add onClick handler to the hamburger menu toggle */}
            <button
              className="nav-toggle"
              aria-label="toggle navigation"
              onClick={openSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
