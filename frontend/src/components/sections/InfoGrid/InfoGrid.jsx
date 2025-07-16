import React from "react";
import "./InfoGrid.css"; // Import the styles for this section
import InfoCard from "../../InfoCard/InfoCard";

// --- DUMMY DATA ---
// In a real app, this would come from an API.
const cardData = [
  {
    title: "Appliances for your home | Up to 55% off",
    linkText: "See more",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1571086201103-9d5649a435ae?w=300",
        caption: "Air conditioners",
      },
      {
        image:
          "https://images.unsplash.com/photo-1616464918553-f02a56768484?w=300",
        caption: "Refrigerators",
      },
      {
        image:
          "https://images.unsplash.com/photo-1576795365377-33ad2b495d43?w=300",
        caption: "Microwaves",
      },
      {
        image:
          "https://images.unsplash.com/photo-1626806819282-2c1dc01694e8?w=300",
        caption: "Washing machines",
      },
    ],
  },
  {
    title: "Revamp your home in style",
    linkText: "Explore all",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300",
        caption: "Cushion covers, bedsheets",
      },
      {
        image:
          "https://images.unsplash.com/photo-1594191024694-8f7a6279f8c9?w=300",
        caption: "Figurines, vases & more",
      },
      {
        image:
          "https://images.unsplash.com/photo-1594026112273-094e4d580435?w=300",
        caption: "Home storage",
      },
      {
        image:
          "https://images.unsplash.com/photo-1533090481723-8fd940850c8c?w=300",
        caption: "Lighting solutions",
      },
    ],
  },
  {
    title: "PlayStation 5 Slim & Accessories",
    linkText: "See all deals",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300",
        caption: "PS5 Slim digital edition",
      },
      {
        image:
          "https://images.unsplash.com/photo-1607863680197-2931b18c76d2?w=300",
        caption: "PS5 Slim disc edition",
      },
      {
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=300",
        caption: "PS5 Slim Fortnite digital",
      },
      {
        image:
          "https://images.unsplash.com/photo-1605901309584-818e6a683344?w=300",
        caption: "PS5 DualSense Controller",
      },
    ],
  },
  {
    title: "Automotive essentials | Up to 60% off",
    linkText: "Shop now",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1613553422365-06354446b7a5?w=300",
        caption: "Cleaning supplies",
      },
      {
        image:
          "https://images.unsplash.com/photo-1568605117036-5fe5e7185743?w=300",
        caption: "Tire & wheel care",
      },
      {
        image:
          "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=300",
        caption: "Helmets & riding gear",
      },
      {
        image:
          "https://images.unsplash.com/photo-1602919939334-a2122bd5165f?w=300",
        caption: "Vehicle electronics",
      },
    ],
  },
];

function InfoGrid() {
  return (
    <section className="info-grid-section">
      <div className="container">
        <div className="info-grid">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              items={card.items}
              linkText={card.linkText}
              linkHref={card.linkHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoGrid;
