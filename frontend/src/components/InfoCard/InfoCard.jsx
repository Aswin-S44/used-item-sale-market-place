import React from "react";
// We don't need to import the CSS here as the parent will handle it.

function InfoCard({ title, items, linkText, linkHref }) {
  return (
    <div className="info-card">
      <h3 className="info-card-title">{title}</h3>

      <div className="info-card-content-grid">
        {/* We map over the 'items' array to create the 2x2 grid */}
        {items.map((item, index) => (
          <a href={item.href || "#"} className="info-card-item" key={index}>
            <img src={item.image} alt={item.caption} />
            <p>{item.caption}</p>
          </a>
        ))}
      </div>

      <a href={linkHref || "#"} className="info-card-link">
        {linkText}
      </a>
    </div>
  );
}

export default InfoCard;
