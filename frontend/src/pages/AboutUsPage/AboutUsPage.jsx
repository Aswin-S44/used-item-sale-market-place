import React, { useState, useEffect, useRef } from "react";
import "./AboutUsPage.css";

function AboutUsPage() {
  const [activeValue, setActiveValue] = useState(0);
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;
    if (!scrollContainer || !content) return;

    const handleScroll = () => {
      const { top } = scrollContainer.getBoundingClientRect();
      const scrollableHeight =
        scrollContainer.scrollHeight - window.innerHeight;
      const contentWidth = content.scrollWidth - window.innerWidth;

      if (top < 0 && top > -scrollableHeight) {
        const scrollPercent = -top / scrollableHeight;
        content.style.transform = `translateX(-${
          scrollPercent * contentWidth
        }px)`;
      } else if (top >= 0) {
        content.style.transform = `translateX(0px)`;
      } else {
        content.style.transform = `translateX(-${contentWidth}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const values = [
    {
      title: "Radical Trust",
      description:
        "We build systems of trust so you can transact with confidence. Every user, every item, every time.",
    },
    {
      title: "Design-Driven",
      description:
        "A beautiful, intuitive experience isn't a feature; it's our foundation. We believe good design makes life better.",
    },
    {
      title: "Sustainable Core",
      description:
        "The circular economy is our north star. We're here to extend the life of every product and reduce our collective footprint.",
    },
  ];

  return (
    <div className="about-page-v3">
      <section className="hero-v3">
        <h1>
          Rethink.
          <br />
          Reuse.
          <br />
          Rejoice.
        </h1>
      </section>

      <div ref={scrollContainerRef} className="horizontal-scroll-container">
        <div ref={contentRef} className="horizontal-content">
          <section className="h-section mission">
            <div className="mission-text">
              <span className="eyebrow">Our Manifesto</span>
              <h2>
                We're for the finders, the keepers, the sellers, and the
                storytellers.
              </h2>
            </div>
            <div className="mission-image">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team collaborating"
              />
            </div>
          </section>

          <section className="h-section values">
            <div className="values-content">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`value-card ${
                    activeValue === index ? "active" : ""
                  }`}
                  onClick={() => setActiveValue(index)}
                >
                  <h3>
                    <span>0{index + 1}</span>
                    {value.title}
                  </h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="h-section team">
            <h2>The Instigators</h2>
            <div className="team-gallery">
              <div
                className="gallery-item"
                style={{ "--x": "-20%", "--y": "10%" }}
              >
                <img
                  src="https://ui-avatars.com/api/?name=Kai+Zen&background=3a388a&color=fff&size=256&bold=true"
                  alt="Kai Zen"
                />
                <p>Kai Zen, Vision</p>
              </div>
              <div
                className="gallery-item"
                style={{ "--x": "30%", "--y": "-15%" }}
              >
                <img
                  src="https://ui-avatars.com/api/?name=Lila+Raye&background=3a388a&color=fff&size=256&bold=true"
                  alt="Lila Raye"
                />
                <p>Lila Raye, Product</p>
              </div>
              <div
                className="gallery-item"
                style={{ "--x": "0%", "--y": "30%" }}
              >
                <img
                  src="https://ui-avatars.com/api/?name=Axel+Rhodes&background=3a388a&color=fff&size=256&bold=true"
                  alt="Axel Rhodes"
                />
                <p>Axel Rhodes, Code</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="cta-v3">
        <h2>Your Next Favorite Thing Awaits.</h2>
        <button className="cta-button">Start Your Search</button>
      </section>
    </div>
  );
}

export default AboutUsPage;
