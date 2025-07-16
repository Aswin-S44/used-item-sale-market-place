import React from "react";
import Banner from "../../components/Banner/Banner";
import InfoGrid from "../../components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

function HomePage() {
  return (
    <div>
      <Banner />

      <InfoGrid />
      <ProductCarousel
        title="Best Sellers in Computers & Accessories"
        linkText="Shop now"
      />
    </div>
  );
}

export default HomePage;
