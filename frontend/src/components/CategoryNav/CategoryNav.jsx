import React from "react";
import "./CategoryNav.css";

// You can fetch this data from an API or define it as a constant
const categories = [
  { name: "Grocery", icon: "fas fa-shopping-basket", link: "#" },
  { name: "Mobiles", icon: "fas fa-mobile-alt", link: "#" },
  { name: "Fashion", icon: "fas fa-tshirt", link: "#" },
  { name: "Electronics", icon: "fas fa-laptop", link: "#" },
  { name: "Furniture", icon: "fas fa-couch", link: "#" },
  { name: "Appliances", icon: "fas fa-blender-phone", link: "#" },
  { name: "Travel", icon: "fas fa-plane-departure", link: "#" },
  { name: "Toys", icon: "fas fa-baby", link: "#" },
  { name: "Vehicles", icon: "fas fa-motorcycle", link: "#" },
];

function CategoryNav() {
  return (
    <nav className="category-nav">
      <div className="container">
        <div className="category-nav-content">
          {categories.map((category) => (
            <a
              href={category.link}
              key={category.name}
              className="category-item"
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default CategoryNav;
