import React, { useEffect, useState } from "react";
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
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  deleteProductById,
  getDealerProducts,
  getMyProfile,
} from "../../api/dealer/dealerApi";
import useUser from "../../hooks/useUser";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/appConstants";
import { STATUS_OK } from "../../constants/httpStatusCodes";

const DealerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(false);
  const { user: profile, userId } = useUser();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (userId) {
        setLoading(true);
        const res = await getDealerProducts(userId);
        setLoading(false);
        if (res && res.status == STATUS_OK) {
          setProducts(res.data.products);
        }
      }
    };
    fetchProducts();
  }, [userId]);

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await deleteProductById(productId);
      console.log("deleted res--------", res ? res : "no res");
    } catch (error) {}
  };

  return (
    <div className="dashboard-container">
      {console.log("products---------", products)}
      <aside className="profile-sidebar">
        <div className="profile-card">
          <img
            src={profile?.profileImage || DEFAULT_AVATAR_IMAGE}
            alt="Dealer Avatar"
            className="profile-avatar"
          />
          <h1 className="profile-name">{profile?.firstName}</h1>
          <p className="profile-location">{profile?.location ?? "_"}</p>
          <p className="profile-member-since">{profile?.createdAt ?? "_"}</p>
          <div className="profile-actions">
            <button className="profile-btn share-btn">
              <FiShare2 /> Share
            </button>
            <button className="profile-btn edit-btn">
              <FiEdit />
              Edit
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <FiBarChart2 /> Analytics
            </button>
            <button
              className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <FiGrid /> My Products
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
                    <FiCheckCircle />
                  </div>
                  <div className="stat-info">
                    <span className="stat-title">Products Sold</span>
                    <span className="stat-value">14</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="product-list fade-in">
              {products.length == 0 ? (
                <>No products available</>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-image"
                      />
                      <span
                        className={`product-status ${product.status.toLowerCase()}`}
                      >
                        {product?.status ?? "_"}
                      </span>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-footer">
                        <p className="product-price">
                          {product.askingRate ?? "_"}
                        </p>
                        <div className="product-card-actions">
                          <button className="product-action-btn">
                            <FiEdit2 />
                          </button>
                          <button
                            className="product-action-btn delete"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DealerProfile;
