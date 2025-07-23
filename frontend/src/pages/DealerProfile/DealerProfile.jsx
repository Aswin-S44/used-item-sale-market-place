import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./DealerProfile.css";
import {
  FiShare2,
  FiEdit,
  FiBarChart2,
  FiGrid,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiDollarSign,
  FiEye,
  FiTrendingUp,
  FiBox,
  FiTag, // New Icon
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import {
  deleteProductById,
  getDealerProducts,
  updateProductStatusById,
} from "../../api/dealer/dealerApi";
import useUser from "../../hooks/useUser";
import {
  DEFAULT_AVATAR_IMAGE,
  PRODUCT_STATUS_TYPES,
} from "../../constants/appConstants";
import { STATUS_OK } from "../../constants/httpStatusCodes";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
import { ToastContainer, toast } from "react-toastify";

const DealerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const { user: profile, userId } = useUser();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt_desc");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) return;
      setLoading(true);
      const [sortKey, sortOrder] = sortBy.split("_");
      const params = { page: currentPage, sortBy: sortKey, sortOrder };
      const res = await getDealerProducts(userId, params);
      setLoading(false);
      if (res && res.status === STATUS_OK) {
        setProducts(res.data.products);
        setTotalPages(res.data.pagination.totalPages);
      }
    };
    fetchProducts();
  }, [userId, currentPage, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleShareProfile = async () => {
    if (profile) {
      const currentUrl = window.location.href + "/" + profile._id;
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy link.");
        });
    }
  };

  const handleUpdateStatus = async (productId, newStatus) => {
    Swal.fire({
      title: `Mark as ${newStatus}?`,
      text: "This will update the product's public status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button-green",
        cancelButton: "swal-cancel-button",
      },
      buttonsStyling: false,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateProductStatusById(productId, newStatus);
        if (res && res.status === STATUS_OK) {
          setProducts(
            products.map((p) =>
              p._id === productId ? { ...p, status: newStatus } : p
            )
          );

          Swal.fire({
            title: "Updated!",
            text: "The product status has been changed.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleDeleteProduct = async (productId) => {
    Swal.mixin({
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      buttonsStyling: false,
    })
      .fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteProductById(productId);
          setProducts(products.filter((p) => p._id !== productId));
          Swal.fire({
            title: "Deleted!",
            text: "The product has been successfully deleted.",
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="dashboard-container">
      <aside className="profile-sidebar">
        <div className="profile-sidebar-content">
          <div className="profile-card">
            <img
              src={profile?.profileImage || DEFAULT_AVATAR_IMAGE}
              alt="Dealer Avatar"
              className="profile-avatar"
            />
            <h1 className="profile-name">
              {profile?.firstName || "Dealer Name"}
            </h1>
            {/* <p className="profile-location">
              {profile?.location || "Location not set"}
            </p> */}
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-item-value">
                  {profile?.totalCarsCount ?? 0}
                </span>
                <span className="stat-item-label">Listings</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-value">
                  {profile?.totalSoldCarsCount ?? 0}
                </span>
                <span className="stat-item-label">Sold</span>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="profile-btn-primary"
                onClick={() => navigate(`/profile/edit/${profile?._id}`)}
              >
                <FiEdit /> Edit Profile
              </button>
              <button
                className="profile-btn-secondary"
                onClick={handleShareProfile}
              >
                <FiShare2 /> Share Profile
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <FiGrid /> My Products
            </button>
            <button
              className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <FiBarChart2 /> Analytics
            </button>
          </div>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add/product")}
          >
            <FiPlus /> Add New Product
          </button>
        </header>

        <div className="tab-content">
          {activeTab === "analytics" && (
            <div className="analytics-view fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <FiDollarSign />
                  </div>
                  <div className="stat-info">
                    <span className="stat-title">Total Revenue</span>
                    <span className="stat-value">$287,400</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon views">
                    <FiEye />
                  </div>
                  <div className="stat-info">
                    <span className="stat-title">Total Product Views</span>
                    <span className="stat-value">12,890</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon sales">
                    <FiTrendingUp />
                  </div>
                  <div className="stat-info">
                    <span className="stat-title">Conversion Rate</span>
                    <span className="stat-value">3.2%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon inventory">
                    <FiBox />
                  </div>
                  <div className="stat-info">
                    <span className="stat-title">Active Listings</span>
                    <span className="stat-value">{products.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="product-list-container fade-in">
              <div className="product-list-header">
                <label htmlFor="sort-by" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="sort-by"
                  className="sort-dropdown"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="createdAt_desc">Newest First</option>
                  <option value="createdAt_asc">Oldest First</option>
                  <option value="askingRate_desc">Price: High to Low</option>
                  <option value="askingRate_asc">Price: Low to High</option>
                  <option value="views_desc">Most Viewed</option>
                </select>
              </div>

              {loading ? (
                <div className="product-list">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="no-products-view">
                  <FiBox size={50} />
                  <h2>No Products Yet</h2>
                  <p>Click "Add New Product" to get started.</p>
                </div>
              ) : (
                <>
                  <div className="product-list">
                    {products.map((product) => (
                      <div key={product._id} className="product-card">
                        <div
                          className="product-image-container"
                          onClick={() => navigate(`/used-item/${product._id}`)}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="product-image"
                          />
                        </div>
                        <div className="product-info">
                          <div className="product-info-header">
                            <h3 className="product-name">{product.name}</h3>
                            <span
                              className={`product-status ${product.status?.toLowerCase()}`}
                            >
                              {product?.status || "N/A"}
                            </span>
                          </div>
                          <div className="product-meta">
                            <span className="product-price">
                              <FiDollarSign size={14} />{" "}
                              {product.askingRate || "0.00"}
                            </span>
                            <span className="product-views">
                              <FaEye size={14} /> {product.views || 0}
                            </span>
                          </div>
                          <div className="product-card-actions">
                            {product.status?.toLowerCase() === "available" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    product._id,
                                    PRODUCT_STATUS_TYPES.SOLD
                                  )
                                }
                                className="product-action-btn status"
                              >
                                <FiTag size={16} /> Mark as Sold
                              </button>
                            )}
                            <button
                              onClick={() =>
                                navigate(`/product/edit/${product._id}`)
                              }
                              className="product-action-btn edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="product-action-btn delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination-controls">
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="page-info">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default DealerProfile;
