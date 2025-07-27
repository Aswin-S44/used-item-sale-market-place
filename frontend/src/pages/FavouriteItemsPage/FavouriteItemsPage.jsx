import React, { useState } from "react";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import "./FavouriteItemsPage.css";

const initialSavedItems = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: "95.00",
    location: "New York, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 2,
    name: "Mid-century Modern Armchair",
    price: "250.00",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
  },
  {
    id: 3,
    name: "Classic Acoustic Guitar",
    price: "180.00",
    location: "Austin, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 4,
    name: "Retro Polaroid Camera",
    price: "60.00",
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
];

function FavouriteItemsPage() {
  const [savedItems, setSavedItems] = useState(initialSavedItems);

  const handleDeleteItem = (itemId) => {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const handleShareItem = async (itemName, itemUrl) => {
    const shareData = {
      title: "Check out this item!",
      text: `I found this "${itemName}" on [Your Website Name]!`,
      url: itemUrl || window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert(`Share this item: ${itemName}`);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="favourite-items-page">
      <h1 className="page-title">My Saved Items</h1>
      {savedItems.length > 0 ? (
        <div className="items-grid">
          {savedItems.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-content">
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-location">{item.location}</p>
                  <p className="item-price">${item.price}</p>
                </div>
                <div className="item-actions">
                  <button
                    className="action-icon"
                    aria-label="Share item"
                    onClick={() =>
                      handleShareItem(item.name, window.location.href)
                    }
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    className="action-icon delete-icon"
                    aria-label="Remove from saved"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing saved yet!</h2>
          <p>Browse items and click the save icon to add them to your list.</p>
        </div>
      )}
    </div>
  );
}

export default FavouriteItemsPage;
