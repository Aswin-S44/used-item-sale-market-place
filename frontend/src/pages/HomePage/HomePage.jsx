import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import InfoGrid from "../../components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import FeatureListing from "../../sections/FeatureListing/FeatureListing";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import { getAllProducts } from "../../api/users/userApis";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams({
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
        page: 1,
      }).toString();

      try {
        const response = await getAllProducts(queryParams);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <Banner />
      <CategoriesList />
      <FeatureListing
        title={"Freshly Added Items"}
        description={"Discover the latest treasures added by our community"}
        products={products}
      />
      <InfoGrid />
      <ProductCarousel
        title="Best Sellers in Computers & Accessories"
        linkText="Shop now"
      />
    </div>
  );
}

export default HomePage;
