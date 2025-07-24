import React from "react";

function InfoCard({ title, items, linkText, linkHref }) {
  const mainItem = items[0];
  const thumbItems = items.slice(1, 4);

  return (
    <article className="info-card">
      <h3 className="info-card-title">{title}</h3>
      <div className="info-card-content-grid">
        <a href={linkHref || "#"} className="main-item">
          <img src={mainItem.image} alt={mainItem.caption} />
          <p className="main-item-caption">{mainItem.caption}</p>
        </a>
        <div className="thumb-list">
          {thumbItems.map((item, index) => (
            <a href={linkHref || "#"} key={index} className="thumb-item">
              <div className="thumb-image-wrapper">
                <img src={item.image} alt={item.caption} />
              </div>
              <p className="thumb-caption">{item.caption}</p>
            </a>
          ))}
        </div>
      </div>
      <a href={linkHref || "#"} className="info-card-link">
        {linkText}
      </a>
    </article>
  );
}

export default InfoCard;
