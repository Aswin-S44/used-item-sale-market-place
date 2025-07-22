import React from "react";
import "./ReviewsPage.css";

// Mock data for demonstration. You would fetch this from your backend.
const reviewsData = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "October 28, 2023",
    rating: 5,
    title: "Absolutely fantastic!",
    text: "The product exceeded all my expectations. The quality is top-notch and it arrived faster than I thought. I would highly recommend this to anyone.",
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    date: "October 25, 2023",
    rating: 4,
    title: "Very good, but one small issue",
    text: "Overall, a great purchase. It does exactly what it says. My only minor complaint is that the instruction manual was a bit confusing. Otherwise, it's perfect.",
  },
  {
    id: 3,
    author: "Jessica Williams",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "October 22, 2023",
    rating: 5,
    title: "Couldn't be happier with my purchase!",
    text: "I was hesitant at first, but I am so glad I bought this. The build quality is excellent and it has been incredibly useful. Five stars all the way!",
  },
  {
    id: 4,
    author: "David Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=4",
    date: "October 19, 2023",
    rating: 3,
    title: "It's okay, does the job.",
    text: "The product is decent for the price. It works as advertised, but it doesn't feel as premium as some other brands. It's a solid, average product.",
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 75 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

// A helper component to render stars
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i key={i} className={`fas fa-star ${i <= rating ? "filled" : ""}`}></i>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function ReviewsPage() {
  return (
    <div className="reviews-page">
      <div className="container">
        <header className="reviews-header">
          <h1 className="reviews-title">Customer Reviews</h1>
          <button className="btn btn-primary">
            <i className="fas fa-edit"></i> Write a Review
          </button>
        </header>

        <section className="reviews-summary">
          <div className="summary-overview">
            <div className="average-rating">4.8</div>
            <StarRating rating={5} />
            <div className="total-reviews-text">Based on 1,234 reviews</div>
          </div>
          <div className="summary-breakdown">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="rating-bar-item">
                <span>{item.stars} star</span>
                <div className="rating-bar-track">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reviews-list">
          {reviewsData.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="review-author">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="review-avatar"
                  />
                  <div className="review-author-info">
                    <p className="review-author-name">{review.author}</p>
                    <p className="review-date">{review.date}</p>
                  </div>
                </div>
                <div className="review-card-rating">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <div className="review-card-body">
                <h4 className="review-title">{review.title}</h4>
                <p className="review-text">{review.text}</p>
              </div>
              <div className="review-card-footer">
                <button className="helpful-button">
                  <i className="fas fa-thumbs-up"></i>
                  Helpful
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ReviewsPage;
