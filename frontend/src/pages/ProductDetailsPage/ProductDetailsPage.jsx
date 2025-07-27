import React, { useEffect, useState } from "react";
import "./ProductDetailsPage.css";
import { getProductById } from "../../api/common/commonApis";
import { useParams } from "react-router-dom";
import { STATUS_OK } from "../../constants/httpStatusCodes";
import ProductDetailsSkeleton from "./skeleton/ProductDetailsSkeleton";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { formatDate } from "../../utils/utils";
import { CiShare2 } from "react-icons/ci";
import { getAllProducts } from "../../api/users/userApis";
import FeatureListing from "../../sections/FeatureListing/FeatureListing";

function ProductDetailsPage() {
  const [mainImage, setMainImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        setLoading(true);
        const response = await getProductById(id);
        setLoading(false);
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (response && response.status == STATUS_OK) {
          setProduct(response.data.product);
          setMainImage(response.data.product.images[0]);
          if (favorites && favorites.length > 0) {
            if (favorites.includes(id)) {
              setIsFavourite(true);
            }
          }
        }
      }
    };
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (product && product.category) {
      const fetchProducts = async () => {
        try {
          const queryParams = new URLSearchParams({
            limit: 10,
            sortBy: "createdAt",
            sortOrder: "desc",
            page: 1,
            category: product.category,
          }).toString();

          try {
            setProductsLoading(true);
            const response = await getAllProducts(queryParams);
            setProductsLoading(false);
            setSimilarProducts(response.data.products);
          } catch (error) {
            console.error("Error fetching products:", error.message);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setProductsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [product]);

  const addToFav = async () => {
    setSaved(!saved);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.success("Added to favourites");
      setIsFavourite(true);
    } else {
      favorites = favorites.filter((favId) => favId !== id);

      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.error("Removed from favourites");
      setIsFavourite(false);
    }
  };

  const notify = () => toast.success("Link copied");

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        notify();
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="details-page-container">
      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <>
          <div className="product-layout">
            <div className="image-gallery">
              <div className="main-image-container">
                <img
                  src={mainImage}
                  alt={product?.name}
                  className="main-image"
                />
              </div>
              <div className="thumbnail-container">
                {product?.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${img === mainImage ? "active" : ""}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="space-between">
                <div>
                  {" "}
                  <p className="breadcrumbs">Home / {product?.name}</p>
                </div>
                <div>
                  {" "}
                  <span>
                    {" "}
                    <FaHeart
                      color={isFavourite ? "red" : "grey"}
                      size={24}
                      onClick={addToFav}
                    />
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    {" "}
                    <CiShare2 size={24} onClick={handleShareClick} />
                  </span>
                </div>
              </div>
              <h1 className="product-title">{product?.name}</h1>

              <div className="product-meta">
                <span>Location: {product?.location}</span>
                <span>Posted: {formatDate(product?.createdAt)}</span>
              </div>

              <div className="price-section">
                <p className="product-price">{product?.askingRate}</p>
                {product?.isNegotiable && (
                  <span className="negotiable-tag">Negotiable</span>
                )}
              </div>

              <div className="key-details">
                <div className="detail-item">
                  <span className="detail-label">Condition</span>
                  <span className="detail-value">{product?.condition}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Used For</span>
                  <span className="detail-value">{product?.usedDuration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Warranty</span>
                  <span className="detail-value">
                    {product?.warrantyAvailable ? "Available" : "N/A"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-available">
                    {product?.status}
                  </span>
                </div>
              </div>

              <div className="features-section">
                <h3 className="section-title">Key Features</h3>
                <ul className="feature-list">
                  {product?.features &&
                    product?.features.length > 0 &&
                    product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                </ul>
              </div>

              <div className="description-section">
                <h3 className="section-title">Description</h3>
                <p className="product-description">{product?.description}</p>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary">
                  <a
                    href={`tel:${product?.dealerId?.phone}`}
                    style={{ color: "#fff" }}
                  >
                    Contact Seller
                  </a>
                </button>
                <button className="btn btn-secondary">Chat with Dealer</button>
              </div>

              <div className="seller-info-box">
                <h4>Seller Information</h4>
                <p>Contact the seller to learn more about this amazing deal!</p>
                <button className="btn-view-profile">
                  View Seller Profile
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />

          <>
            <FeatureListing
              title={"Similar products"}
              description={`Discover the similar products on ${product?.category}`}
              products={similarProducts}
            />
          </>
        </>
      )}
    </div>
  );
}

export default ProductDetailsPage;
