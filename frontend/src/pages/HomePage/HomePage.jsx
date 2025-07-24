import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import InfoGrid from "../../components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import FeatureListing from "../../sections/FeatureListing/FeatureListing";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import { getAllProducts } from "../../api/users/userApis";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
          page: 1,
        }).toString();

        try {
          setLoading(true);
          const response = await getAllProducts(queryParams);
          setLoading(false);
          setProducts(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <CategoryNav />
      <Banner />
      <CategoriesList />
      {loading ? (
        <>
          <div className="product-list">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <FeatureListing
            title={"Freshly Added Items"}
            description={"Discover the latest treasures added by our community"}
            products={products}
          />
        </>
      )}

      <InfoGrid />
      <ProductCarousel
        title="Best Sellers in Computers & Accessories"
        linkText="Shop now"
      />
    </div>
  );
}

export default HomePage;
