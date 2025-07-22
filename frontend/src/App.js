import React from "react";
import Header from "./components/shared/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/shared/Footer/Footer";
import InfoGrid from "./components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DealerProfile from "./pages/DealerProfile/DealerProfile";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import NotFound from "./pages/NotFound/NotFound";
import { UserProvider } from "./context/UserContext";
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import ExploreAllProductsPage from "./pages/ExploreAllProductsPage/ExploreAllProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import CategoryNav from "./components/CategoryNav/CategoryNav";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div>
          <main>
            <Header />

            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <NotFound />
                  </>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<DealerProfile />} />
              <Route path="/add/product" element={<AddProductPage />} />
              <Route path="/product/edit/:id" element={<EditProductPage />} />
              <Route path="/used-items" element={<ExploreAllProductsPage />} />
              <Route path="/used-item/:id" element={<ProductDetailsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
