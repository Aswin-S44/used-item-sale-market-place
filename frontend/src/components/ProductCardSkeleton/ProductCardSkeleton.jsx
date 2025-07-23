import React from "react";

import "./ProductCardSkeleton.css";
import Skeleton from "../Skeleton/Skeleton";

function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <Skeleton type="thumbnail" />
      <div className="skeleton-content">
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
    </div>
  );
}

// In your main component, you could map over an array to show several
// e.g. Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)

export default ProductCardSkeleton;
