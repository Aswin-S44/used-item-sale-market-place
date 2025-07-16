import React from "react";
import "./Banner.css";
function Banner() {
  return (
    <div>
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Discover Pre-Loved, Re-Loved.</h1>
          <p class="hero-subtitle">
            The ultimate marketplace for unique second-hand treasures.
          </p>
          <div class="search-bar">
            <div class="search-input">
              <i class="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search for 'vintage camera', 'leather sofa'..."
              />
            </div>
            <button class="btn btn-accent">Search</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
