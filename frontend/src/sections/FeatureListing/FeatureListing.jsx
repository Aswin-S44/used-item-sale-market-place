import React from "react";
import "./FeatureListing.css";

function FeatureListing() {
  const products = [
    {
      id: 1,
      name: "Vintage Leather Sofa",
      price: 450,
      condition: "Good",
      location: "New York, NY",
      imageUrl: "https://placehold.co/600x400/E5D9B2/333333?text=Sofa",
    },
    {
      id: 2,
      name: "MacBook Pro 15-inch, 2018",
      price: 800,
      condition: "Excellent",
      location: "San Francisco, CA",
      imageUrl: "https://placehold.co/600x400/CCCCCC/333333?text=Laptop",
    },
    {
      id: 3,
      name: "Mountain Bike",
      price: 250,
      condition: "Used",
      location: "Denver, CO",
      imageUrl: "https://placehold.co/600x400/8E9E82/FFFFFF?text=Bike",
    },
    {
      id: 4,
      name: "Canon EOS R Camera",
      price: 1200,
      condition: "Like New",
      location: "Austin, TX",
      imageUrl: "https://placehold.co/600x400/333333/FFFFFF?text=Camera",
    },
    {
      id: 5,
      name: "Designer Oak Table",
      price: 320,
      condition: "Good",
      location: "Chicago, IL",
      imageUrl: "https://placehold.co/600x400/C2A385/FFFFFF?text=Table",
    },
    {
      id: 6,
      name: "Acoustic Guitar",
      price: 180,
      condition: "Excellent",
      location: "Nashville, TN",
      imageUrl: "https://placehold.co/600x400/7B5B3F/FFFFFF?text=Guitar",
    },
  ];

  return (
    <section className="feature-listing-section">
      <div className="section-header">
        <h2>Freshly Added Items</h2>
        <p>Discover the latest treasures added by our community</p>
      </div>
      <div className="listings-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <div className="product-meta">
                <span className="product-location">📍 {product.location}</span>
                <span className="product-condition">{product.condition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="view-all-container">
        <button className="view-all-btn">View All Items</button>
      </div>
    </section>
  );
}

export default FeatureListing;
