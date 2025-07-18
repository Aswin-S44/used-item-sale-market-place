import React from "react";
import Banner from "../../components/Banner/Banner";
import InfoGrid from "../../components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import FeatureListing from "../../sections/FeatureListing/FeatureListing";
import CategoriesList from "../../components/CategoriesList/CategoriesList";

function HomePage() {
  return (
    <div>
      <Banner />
      <CategoriesList />
      <FeatureListing />
      <InfoGrid />
      <ProductCarousel
        title="Best Sellers in Computers & Accessories"
        linkText="Shop now"
      />
    </div>
  );
}

export default HomePage;
