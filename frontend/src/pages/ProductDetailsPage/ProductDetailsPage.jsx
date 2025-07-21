import React, { useState } from "react";
import "./ProductDetailsPage.css";

const productData = {
  _id: "687e5520be46394e300a1d5c",
  name: "BMW M5 Competition",
  category: "Cars",
  dealerId: "687a5512ffda54708dfee208",
  condition: "Used",
  usedDuration: "2 years",
  askingRate: "6700000",
  isNegotiable: true,
  images: [
    "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ],
  description:
    "High-performance BMW M5 Competition with premium modifications. Includes new insurance valid for one year and custom work amounting to ₹5 lakh. Meticulously maintained and in pristine condition.",
  location: "Trivandrum, Kerala",
  status: "available",
  views: 124,
  warrantyAvailable: true,
  features: [
    "Custom Alloy Wheels",
    "Performance Exhaust System",
    "Full-body Ceramic Coating",
    "Zero Depreciation Insurance",
    "No Accident History",
  ],
  postedAt: "2025-07-21T14:56:32.826Z",
};

function ProductDetailsPage() {
  const [mainImage, setMainImage] = useState(productData.images[0]);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(productData.askingRate);

  const postedDate = new Date(productData.postedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="details-page-container">
      <div className="product-layout">
        <div className="image-gallery">
          <div className="main-image-container">
            <img
              src={mainImage}
              alt={productData.name}
              className="main-image"
            />
          </div>
          <div className="thumbnail-container">
            {productData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${img === mainImage ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="breadcrumbs">Home / {productData.category}</p>
          <h1 className="product-title">{productData.name}</h1>
          <div className="product-meta">
            <span>Location: {productData.location}</span>
            <span>Posted: {postedDate}</span>
          </div>

          <div className="price-section">
            <p className="product-price">{formattedPrice}</p>
            {productData.isNegotiable && (
              <span className="negotiable-tag">Negotiable</span>
            )}
          </div>

          <div className="key-details">
            <div className="detail-item">
              <span className="detail-label">Condition</span>
              <span className="detail-value">{productData.condition}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Used For</span>
              <span className="detail-value">{productData.usedDuration}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Warranty</span>
              <span className="detail-value">
                {productData.warrantyAvailable ? "Available" : "N/A"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value status-available">
                {productData.status}
              </span>
            </div>
          </div>

          <div className="features-section">
            <h3 className="section-title">Key Features</h3>
            <ul className="feature-list">
              {productData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="description-section">
            <h3 className="section-title">Description</h3>
            <p className="product-description">{productData.description}</p>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary">Contact Seller</button>
            <button className="btn btn-secondary">Add to Wishlist</button>
          </div>

          <div className="seller-info-box">
            <h4>Seller Information</h4>
            <p>Contact the seller to learn more about this amazing deal!</p>
            <button className="btn-view-profile">View Seller Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
