import React from "react";

function InfoCard({ title, items, linkText, linkHref }) {
  // Use the first item for the main image and the rest for thumbnails
  const mainItem = items[0];
  const thumbItems = items.slice(1, 4); // Get the next 3 items

  return (
    <article className="info-card">
      <div className="info-card-gallery">
        <div className="main-image">
          <img src={mainItem.image} alt={mainItem.caption} />
        </div>
        <div className="thumb-grid">
          {thumbItems.map((item, index) => (
            <div key={index} className="thumb-image">
              <img src={item.image} alt={item.caption} />
            </div>
          ))}
        </div>
      </div>
      <div className="info-card-footer">
        <h3 className="info-card-title">{title}</h3>
        <a href={linkHref || "#"} className="info-card-link">
          {linkText}
        </a>
      </div>
    </article>
  );
}

export default InfoCard;
