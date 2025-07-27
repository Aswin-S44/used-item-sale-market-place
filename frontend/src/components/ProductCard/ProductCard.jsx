import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const navigateToDetails = (productId) => {
    navigate(`/used-item/${productId}`);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigateToDetails(product._id)}
    >
      <div className="heart-icon-container">
        <FaHeart className="heart-icon" />
      </div>
      <div className="product-image-container">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-card-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price-2">
          {product.askingRate.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <div className="product-details">
          <span className="product-condition-badge">{product.condition}</span>
          <span className="product-location-text">{product.location}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
