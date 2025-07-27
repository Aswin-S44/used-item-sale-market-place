import React from "react";
import "./ProductDetailsSkeleton.css";

function ProductDetailsSkeleton() {
  return (
    <div className="details-page-container">
      <div className="product-layout">
        <div className="image-gallery">
          <div className="main-image-container">
            <div className="skeleton main-image-skeleton"></div>
          </div>
          <div className="thumbnail-container">
            <div className="skeleton thumbnail-skeleton"></div>
            <div className="skeleton thumbnail-skeleton"></div>
            <div className="skeleton thumbnail-skeleton"></div>
          </div>
        </div>

        <div className="product-info">
          <p className="breadcrumbs">
            <span
              className="skeleton skeleton-text"
              style={{ width: "30%" }}
            ></span>
          </p>
          <h1 className="product-title">
            <span className="skeleton skeleton-title"></span>
          </h1>
          <div className="product-meta">
            <span
              className="skeleton skeleton-text"
              style={{ width: "40%" }}
            ></span>
            <span
              className="skeleton skeleton-text"
              style={{ width: "35%" }}
            ></span>
          </div>

          <div className="price-section">
            <span className="skeleton skeleton-price"></span>
          </div>

          <div className="key-details">
            <div className="detail-item">
              <span
                className="skeleton skeleton-text"
                style={{ width: "50%" }}
              ></span>
              <span className="skeleton skeleton-text-lg"></span>
            </div>
            <div className="detail-item">
              <span
                className="skeleton skeleton-text"
                style={{ width: "50%" }}
              ></span>
              <span className="skeleton skeleton-text-lg"></span>
            </div>
            <div className="detail-item">
              <span
                className="skeleton skeleton-text"
                style={{ width: "50%" }}
              ></span>
              <span className="skeleton skeleton-text-lg"></span>
            </div>
            <div className="detail-item">
              <span
                className="skeleton skeleton-text"
                style={{ width: "50%" }}
              ></span>
              <span className="skeleton skeleton-text-lg"></span>
            </div>
          </div>

          <div className="features-section">
            <h3 className="section-title">
              <span className="skeleton skeleton-heading"></span>
            </h3>
            <ul className="feature-list">
              <li>
                <span className="skeleton skeleton-text"></span>
              </li>
              <li>
                <span
                  className="skeleton skeleton-text"
                  style={{ width: "90%" }}
                ></span>
              </li>
              <li>
                <span
                  className="skeleton skeleton-text"
                  style={{ width: "85%" }}
                ></span>
              </li>
            </ul>
          </div>

          <div className="description-section">
            <h3 className="section-title">
              <span className="skeleton skeleton-heading"></span>
            </h3>
            <p>
              <span className="skeleton skeleton-text"></span>
              <span className="skeleton skeleton-text"></span>
              <span
                className="skeleton skeleton-text"
                style={{ width: "70%" }}
              ></span>
            </p>
          </div>

          <div className="action-buttons">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
