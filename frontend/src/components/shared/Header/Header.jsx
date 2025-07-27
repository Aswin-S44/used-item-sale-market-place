import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import PopupModal from "../../Modal/Modal";
import { DEFAULT_AVATAR_IMAGE } from "../../../constants/appConstants";
import { Logout } from "../../../api/dealer/dealerApi";

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, userId } = useUser();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogout = async () => {
    await Logout();
    localStorage.removeItem("token");
    setDropdownOpen(false);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-logo">
            ReVibe
          </a>
          <button className="close-btn" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-mobile-alt"></i> Home
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
          {isLoggedIn ? (
            <>
              <a href="/profile" className="btn btn-secondary">
                Profile
              </a>
              <button onClick={handleLogout} className="btn btn-danger">
                Log Out
              </button>
            </>
          ) : (
            <a href="/login" className="btn btn-secondary">
              Log In
            </a>
          )}
          <a href="#" className="btn btn-primary">
            <i className="fas fa-plus-circle"></i> Sell Item
          </a>
        </div>
      </div>

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
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about-us">About-us</a>
                </li>
                <li>
                  <a href="/reviews">Reviews</a>
                </li>
                <li>
                  <a href="/contact-us">Contact-Us</a>
                </li>
              </ul>
            </nav>
            <div className="header-actions">
              {isLoggedIn ? (
                <>
                  <button
                    className="favorite-btn"
                    aria-label="Favorites"
                    onClick={() => navigate(`/favourites`)}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                  <div className="avatar-container" ref={dropdownRef}>
                    {console.log("user-----------", user ? user : "no user")}
                    <img
                      src={user.profileImage ?? DEFAULT_AVATAR_IMAGE}
                      alt="User Avatar"
                      className="avatar-image"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div className="avatar-dropdown">
                        <a href="/profile">Profile</a>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-primary" onClick={handleOpenModal}>
                    <i className="fas fa-plus-circle"></i> Sell Item
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="btn btn-secondary">
                    Log In
                  </a>
                  <button className="btn btn-primary" onClick={handleOpenModal}>
                    <i className="fas fa-plus-circle"></i> Sell Item
                  </button>
                </>
              )}
            </div>
            <button
              className="nav-toggle"
              aria-label="toggle navigation"
              onClick={openSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <PopupModal
          isModalOpen={openModal}
          closeModal={handleCloseModal}
          title={"sample ttle"}
        />
      </header>
    </>
  );
}

export default Header;
