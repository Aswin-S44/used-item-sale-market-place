import React from "react";
import "./FeatureListing.css";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CONDITION_TYPES } from "../../constants/appConstants";
import { CiLocationOn } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function FeatureListing({ title, description, products }) {
  const navigate = useNavigate();
  return (
    <section className="feature-listing-section">
      <div className="section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="listings-grid">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product?._id} className="product-card">
              <div className="heart-icon-container">
                <FaHeart className="heart-icon" />
              </div>
              <img
                src={product?.images[0]}
                alt={product?.name}
                className="product-image"
              />
              <div className="product-card-info">
                <h3 className="product-name">{product?.name}</h3>
                <p className="product-price">
                  {product?.askingRate?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <div className="product-details">
                  {product.condition && (
                    <span
                      className={`badge ${
                        product.condition === PRODUCT_CONDITION_TYPES.NEW
                          ? "badge-new"
                          : "badge-used"
                      }`}
                    >
                      {product.condition}
                    </span>
                  )}
                  <span className="location-icon">
                    <CiLocationOn
                      style={{ top: "2px", position: "relative" }}
                    />
                    {product.location}
                  </span>
                </div>
                <button
                  className="product-view-btn"
                  onClick={() => navigate(`/used-item/${product?._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="view-all-container">
        <button
          className="view-all-btn"
          onClick={() => navigate("/used-items")}
        >
          View All Items
        </button>
      </div>
    </section>
  );
}

export default FeatureListing;
