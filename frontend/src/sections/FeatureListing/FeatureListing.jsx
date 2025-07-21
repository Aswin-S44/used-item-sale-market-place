import React from "react";
import "./FeatureListing.css";
import { useNavigate } from "react-router-dom";

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
            <div key={product.id} className="product-card">
              <div className="card-image-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.askingRate}</p>
                <div className="product-meta">
                  <span className="product-location">
                    📍 {product.location}
                  </span>
                  <span className="product-condition">{product.condition}</span>
                </div>
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
