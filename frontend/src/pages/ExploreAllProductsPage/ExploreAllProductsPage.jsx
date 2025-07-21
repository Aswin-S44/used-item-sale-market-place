import React from "react";
import "./ExploreAllProductsPage.css";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    name: "Vintage Leather Camera",
    price: 450,
    condition: "Used - Good",
    location: "New York, NY",
    imageUrl:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Modern Ergonomic Chair",
    price: 280,
    condition: "Like New",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "High-Performance Laptop",
    price: 1200,
    condition: "Used - Excellent",
    location: "Chicago, IL",
    imageUrl:
      "https://images.pexels.com/photos/4012966/pexels-photo-4012966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Classic Acoustic Guitar",
    price: 320,
    condition: "Used - Fair",
    location: "Austin, TX",
    imageUrl:
      "https://images.pexels.com/photos/164727/pexels-photo-164727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Mountain Bike",
    price: 650,
    condition: "Used - Good",
    location: "Denver, CO",
    imageUrl:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 150,
    condition: "Like New",
    location: "Miami, FL",
    imageUrl:
      "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    name: "Antique Wooden Desk",
    price: 550,
    condition: "Used - Fair",
    location: "Boston, MA",
    imageUrl:
      "https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 8,
    name: "Smart Watch Series 5",
    price: 190,
    condition: "Used - Excellent",
    location: "Seattle, WA",
    imageUrl:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function ExploreAllProductsPage() {
  const navigate = useNavigate();

  const navigateToDetails = (productId) => {
    navigate(`/used-item/${productId}`);
  };

  return (
    <div className="explore-page-container">
      <h1 className="page-title">Explore Our Products</h1>
      <div className="explore-page-content">
        <aside className="filters-sidebar">
          <h2 className="filter-title">Filters</h2>

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="filter-select">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="vehicles">Vehicles</option>
              <option value="apparel">Apparel</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input type="number" placeholder="Min" className="filter-input" />
              <span>-</span>
              <input type="number" placeholder="Max" className="filter-input" />
            </div>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="condition" value="new" /> Like New
              </label>
              <label>
                <input type="radio" name="condition" value="good" /> Good
              </label>
              <label>
                <input type="radio" name="condition" value="fair" /> Fair
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="City or Zip Code"
              className="filter-input"
            />
          </div>

          <button className="apply-filters-btn">Apply Filters</button>
        </aside>

        <main className="products-grid">
          {dummyProducts.map((product) => (
            <div key={product.id} className="product-card">
              {console.log("product--------", product)}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-card-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <div className="product-details">
                  <span>{product.condition}</span>
                  <span>{product.location}</span>
                </div>
                <button
                  className="product-view-btn"
                  onClick={() => navigateToDetails(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default ExploreAllProductsPage;
