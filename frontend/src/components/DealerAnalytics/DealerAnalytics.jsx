import React, { useEffect, useState } from "react";
import {
  FiShare2,
  FiEdit,
  FiBarChart2,
  FiGrid,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiDollarSign,
  FiEye,
  FiTrendingUp,
  FiBox,
  FiTag, // New Icon
} from "react-icons/fi";
import "./DealerAnalytics.css";
import { viewAnalytics } from "../../api/dealer/dealerApi";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

function DealerAnalytics() {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalSold: 0,
    totalActive: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const res = await viewAnalytics();
      setLoading(false);
      if (res && res.status == 200) {
        setAnalytics({
          totalProducts: res.data.totalProducts,
          totalSold: res.data.totalSold,
          totalActive: res.data.totalActive,
          totalViews: res.data.totalViews,
        });
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <div className="analytics-view fade-in">
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
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <FiDollarSign />
                </div>
                <div className="stat-info">
                  <span className="stat-title">Total products</span>
                  <span className="stat-value">{analytics.totalProducts}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon views">
                  <FiEye />
                </div>
                <div className="stat-info">
                  <span className="stat-title">Total Product Views</span>
                  <span className="stat-value">{analytics.totalViews}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon sales">
                  <FiTrendingUp />
                </div>
                <div className="stat-info">
                  <span className="stat-title">Total active products</span>
                  <span className="stat-value">{analytics.totalActive}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon inventory">
                  <FiBox />
                </div>
                <div className="stat-info">
                  <span className="stat-title">Total sold products</span>
                  <span className="stat-value">{analytics.totalSold}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DealerAnalytics;
