import React from "react";
import "./CategoriesList.css";

const categories = [
  {
    id: 1,
    name: "Furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 3,
    name: "Cars & Vehicles",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 4,
    name: "Books & Media",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    name: "Fashion & Apparel",
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 6,
    name: "Sports & Outdoors",
    imageUrl:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
  },
];

function CategoriesList() {
  return (
    <section className="categories-section">
      <h2 className="section-title">Browse By Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <a
            href="#"
            key={category.id}
            className="category-card"
            style={{ backgroundImage: `url(${category.imageUrl})` }}
          >
            <div className="category-overlay">
              <span className="category-name">{category.name}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default CategoriesList;
