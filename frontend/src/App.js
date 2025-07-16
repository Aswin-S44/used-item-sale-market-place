import React from "react";
import Header from "./components/shared/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/shared/Footer/Footer";
import InfoGrid from "./components/sections/InfoGrid/InfoGrid";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
