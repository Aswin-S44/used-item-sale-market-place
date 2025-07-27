import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./ExploreAllProductsPage.css";
import FiltersSidebar from "../../components/FiltersSidebar/FiltersSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FaHeart } from 'react-icons/fa';

const dummyProducts = [
  {
    _id: "1",
    name: "Vintage Leather Camera",
    askingRate: 450,
    condition: "Used",
    usedDuration: "1-2 years",
    location: "New York, NY",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    isNegotiable: true,
    warrantyAvailable: false,
    category: "Electronics",
    postedAt: new Date(
      new Date().setDate(new Date().getDate() - 15)
    ).toISOString(),
    views: 150,
    features: ["Manual Focus", "Interchangeable Lens"],
  },
  {
    _id: "2",
    name: "Modern Ergonomic Chair",
    askingRate: 280,
    condition: "Like New",
    usedDuration: "N/A",
    location: "San Francisco, CA",
    images: [
      "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    isNegotiable: false,
    warrantyAvailable: true,
    category: "Furniture",
    postedAt: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toISOString(),
    views: 85,
    features: ["Lumbar Support", "Adjustable Arms"],
  },
  {
    _id: "3",
    name: "High-Performance Laptop",
    askingRate: 1200,
    condition: "Used",
    usedDuration: "6-12 months",
    location: "Chicago, IL",
    images: [
      "https://images.pexels.com/photos/4012966/pexels-photo-4012966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    isNegotiable: true,
    warrantyAvailable: true,
    category: "Electronics",
    postedAt: new Date().toISOString(),
    views: 320,
    features: ["Backlit Keyboard", "4K Display"],
  },
];

const initialFilters = {
  category: "all",
  minPrice: "",
  maxPrice: "",
  condition: "all",
  usedDuration: "all",
  location: "",
  postedWithin: "all",
  isNegotiable: false,
  warrantyAvailable: false,
  features: [],
};

function ExploreAllProductsPage() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const currentFeatures = prev.features;
      if (checked) {
        return { ...prev, features: [...currentFeatures, value] };
      } else {
        return {
          ...prev,
          features: currentFeatures.filter((feature) => feature !== value),
        };
      }
    });
  };

  const applyFilters = () => {
    setIsFilterDrawerOpen(false);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...dummyProducts];

    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.condition !== "all") {
      result = result.filter((p) => p.condition === filters.condition);
    }
    if (filters.condition === "Used" && filters.usedDuration !== "all") {
      result = result.filter((p) => p.usedDuration === filters.usedDuration);
    }
    if (filters.minPrice) {
      result = result.filter((p) => p.askingRate >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.askingRate <= Number(filters.maxPrice));
    }
    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.postedWithin !== "all") {
      const days = parseInt(filters.postedWithin);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      result = result.filter((p) => new Date(p.postedAt) >= cutoffDate);
    }
    if (filters.isNegotiable) {
      result = result.filter((p) => p.isNegotiable);
    }
    if (filters.warrantyAvailable) {
      result = result.filter((p) => p.warrantyAvailable);
    }
    if (filters.features.length > 0) {
      result = result.filter((p) =>
        filters.features.every((feature) => p.features.includes(feature))
      );
    }

    switch (sortOption) {
      case "price_asc":
        result.sort((a, b) => a.askingRate - b.askingRate);
        break;
      case "price_desc":
        result.sort((a, b) => b.askingRate - a.askingRate);
        break;
      case "most_viewed":
        result.sort((a, b) => b.views - a.views);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        break;
    }
    return result;
  }, [searchTerm, sortOption, filters]);

  return (
    <div className="explore-page-container">
      <h1 className="page-title">Explore Our Products</h1>

      <div className="controls-bar">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-bar">
          <label htmlFor="sort-options">Sort by:</label>
          <select
            id="sort-options"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="most_viewed">Most Viewed</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        <button
          className="mobile-filter-btn"
          onClick={() => setIsFilterDrawerOpen(true)}
        >
          Filters
        </button>
      </div>

      <div className="explore-page-content">
        <div className="desktop-filters-container">
          <FiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onFeatureChange={handleFeatureChange}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </div>

        <main className="products-grid">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="no-products-found">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </main>
      </div>

      <div
        className={`mobile-filter-drawer ${
          isFilterDrawerOpen ? "drawer-open" : ""
        }`}
      >
        <div className="drawer-header">
          <h2>Filters</h2>
          <button
            className="close-drawer-btn"
            onClick={() => setIsFilterDrawerOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="drawer-content">
          <FiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onFeatureChange={handleFeatureChange}
            onApply={applyFilters}
            onReset={resetFilters}
            isMobile={true}
          />
        </div>
      </div>

      {isFilterDrawerOpen && (
        <div
          className="filter-overlay"
          onClick={() => setIsFilterDrawerOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default ExploreAllProductsPage;
