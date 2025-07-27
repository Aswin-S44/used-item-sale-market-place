import React from "react";

const allFeatures = [
  "Backlit Keyboard",
  "4K Display",
  "Lumbar Support",
  "Adjustable Arms",
  "Manual Focus",
  "Interchangeable Lens",
];

function FiltersSidebar({
  filters,
  onFilterChange,
  onFeatureChange,
  onApply,
  onReset,
  isMobile,
}) {
  return (
    <aside className="filters-sidebar">
      {!isMobile && <h2 className="filter-title">Filters</h2>}

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="filter-select"
          value={filters.category}
          onChange={onFilterChange}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Apparel">Apparel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            name="minPrice"
            className="filter-input"
            value={filters.minPrice}
            onChange={onFilterChange}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            name="maxPrice"
            className="filter-input"
            value={filters.maxPrice}
            onChange={onFilterChange}
          />
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="condition">Condition</label>
        <select
          id="condition"
          name="condition"
          className="filter-select"
          value={filters.condition}
          onChange={onFilterChange}
        >
          <option value="all">All Conditions</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {filters.condition === "Used" && (
        <div className="filter-group">
          <label htmlFor="usedDuration">Used For</label>
          <select
            id="usedDuration"
            name="usedDuration"
            className="filter-select"
            value={filters.usedDuration}
            onChange={onFilterChange}
          >
            <option value="all">Any Duration</option>
            <option value="<6 months"> 6 months</option>
            <option value="6-12 months">6-12 months</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2+ years">2+ years</option>
          </select>
        </div>
      )}

      <div className="filter-group">
        <label htmlFor="postedWithin">Posted Within</label>
        <select
          id="postedWithin"
          name="postedWithin"
          className="filter-select"
          value={filters.postedWithin}
          onChange={onFilterChange}
        >
          <option value="all">Anytime</option>
          <option value="1">Last 24 hours</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="City or State"
          className="filter-input"
          value={filters.location}
          onChange={onFilterChange}
        />
      </div>

      <div className="filter-group">
        <label>Features</label>
        <div className="features-group">
          {allFeatures.map((feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={filters.features.includes(feature)}
                onChange={onFeatureChange}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isNegotiable"
            checked={filters.isNegotiable}
            onChange={onFilterChange}
          />
          Negotiable Price
        </label>
        <label>
          <input
            type="checkbox"
            name="warrantyAvailable"
            checked={filters.warrantyAvailable}
            onChange={onFilterChange}
          />
          Warranty Available
        </label>
      </div>

      <div className="filter-buttons">
        <button className="apply-filters-btn" onClick={onApply}>
          Apply Filters
        </button>
        <button className="reset-filters-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </aside>
  );
}

export default FiltersSidebar;
