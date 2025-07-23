import React, { useState, useEffect, useRef } from "react";
import "./EditProfilePage.css";
import useUser from "../../hooks/useUser";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/appConstants";
import Swal from "sweetalert2";
import { FiUser, FiLock, FiCamera, FiUploadCloud } from "react-icons/fi";
import { updateProfile } from "../../api/dealer/dealerApi";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";

function EditProfilePage() {
  const { user: profile } = useUser();
  const navigate = useNavigate();
  const [activeSubPage, setActiveSubPage] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] =
    useState(DEFAULT_AVATAR_IMAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profileImage: profile.profileImage || "",
      });
      setProfileImagePreview(profile.profileImage || DEFAULT_AVATAR_IMAGE);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Use the file directly, not file.originFileObj
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (file) => {
    if (file && file.type.startsWith("image/")) {
      const convertedImage = await convertToBase64(file);
      setProfileImageFile(convertedImage);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => handleFileSelect(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    formData.profileImage = profileImageFile;
    const res = await updateProfile(formData);
    setIsLoading(false);
    if (res && res.status == httpStatusCodes.STATUS_OK) {
      Swal.fire({
        title: "Success!",
        text: "Your profile has been updated.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Error while updating profile, please try again later",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="edit-profile-page-v2">
      <aside className="profile-nav-sidebar">
        <div className="profile-nav-header">
          <h3>Settings</h3>
        </div>
        <nav className="profile-nav-links">
          <a
            href="#"
            className={activeSubPage === "profile" ? "active" : ""}
            onClick={() => setActiveSubPage("profile")}
          >
            <FiUser /> Profile
          </a>
          <a
            href="#"
            className={activeSubPage === "password" ? "active" : ""}
            onClick={() => setActiveSubPage("password")}
          >
            <FiLock /> Password
          </a>
        </nav>
      </aside>

      <main className="profile-content-area">
        {activeSubPage === "profile" && (
          <form onSubmit={handleSubmit}>
            <a href="/profile">
              <IoIosArrowBack className="mt-2" />
              Back
            </a>
            <header className="content-header">
              <h2>Public Profile</h2>
              <p>This information will be displayed publicly.</p>
            </header>
            <div className="form-section">
              <div className="section-header">
                <h3>Profile Photo</h3>
              </div>
              <div className="section-body">
                <div
                  className={`avatar-dropzone ${isDragging ? "dragging" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <img
                    src={profileImagePreview || formData.profileImage}
                    alt="Avatar Preview"
                    className="profile-avatar-preview"
                  />
                  <div className="dropzone-overlay">
                    <FiUploadCloud size={24} />
                    <span>
                      {isDragging ? "Drop image here" : "Change photo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-section">
              <div className="section-header">
                <h3>Personal Details</h3>
              </div>
              <div className="section-body">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={isLoading}>
                {isLoading && <div className="loader-inline"></div>}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
        {activeSubPage === "password" && (
          <div>
            <a href="/profile">
              <IoIosArrowBack className="mt-2" />
              Back
            </a>
            <header className="content-header">
              <h2>Change Password</h2>
              <p>Update your password here.</p>
            </header>
            <ChangePasswordForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default EditProfilePage;
