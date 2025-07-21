import React, { useState } from "react";
import "./ContactUsPage.css";

const faqData = [
  {
    id: 1,
    question: "How do I sell my products on your site?",
    answer:
      "Becoming a seller is easy! Just navigate to the 'Become a Seller' page from your profile, fill out the required information, and once approved, you can start listing your products immediately.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "Since we are a marketplace for used goods, all sales are typically final. However, we have a robust buyer protection program. If an item is not as described, you can open a dispute within 3 days of delivery.",
  },
  {
    id: 3,
    question: "How is shipping handled?",
    answer:
      "Shipping is arranged directly between the buyer and the seller. We provide tools to estimate shipping costs and print labels, but the seller is responsible for packing and shipping the item.",
  },
];

function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have a question or a brilliant idea? We'd love to hear from you.</p>
      </div>

      <div className="contact-content-wrapper">
        <div className="contact-info-panel">
          <h3>Contact Information</h3>
          <p>
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          <div className="info-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>hello@yoursite.com</span>
          </div>

          <div className="info-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+1 (555) 123-4567</span>
          </div>

          <div className="map-placeholder">
            <img src="https://i.imgur.com/SdYmB4i.png" alt="Map location" />
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${openFaq === item.id ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFaq(item.id)}>
                {item.question}
                <span className="faq-icon"></span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
