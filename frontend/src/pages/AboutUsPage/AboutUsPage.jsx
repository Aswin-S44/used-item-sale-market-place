import React, { useEffect, useRef } from "react";
import "./AboutUsPage.css";

function AboutUsPage() {
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
      icon: "fas fa-handshake",
      title: "Radical Trust",
      description:
        "We build systems of trust so you can transact with confidence. Every user, every item, every time.",
    },
    {
      icon: "fas fa-palette",
      title: "Design-Driven",
      description:
        "A beautiful, intuitive experience isn't a feature; it's our foundation. We believe good design makes life better.",
    },
    {
      icon: "fas fa-leaf",
      title: "Sustainable Core",
      description:
        "The circular economy is our north star. We're here to extend the life of every product and reduce our collective footprint.",
    },
  ];

  const teamMembers = [
    {
      name: "Kai Zen",
      role: "Chief Visionary Officer",
      img: "https://i.pravatar.cc/200?img=5",
    },
    {
      name: "Lila Raye",
      role: "Head of Product",
      img: "https://i.pravatar.cc/200?img=6",
    },
    {
      name: "Axel Rhodes",
      role: "Lead Engineer",
      img: "https://i.pravatar.cc/200?img=7",
    },
    {
      name: "Mia Valo",
      role: "Community Director",
      img: "https://i.pravatar.cc/200?img=8",
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Built on the belief that good things deserve a second life.</h1>
          <p>
            ReVibe is more than a marketplace. It's a movement for conscious
            consumption and connected communities.
          </p>
        </div>
      </section>

      <div ref={scrollContainerRef} className="horizontal-scroll-container">
        <div ref={contentRef} className="horizontal-content">
          <section className="h-section mission-section">
            <div className="mission-content">
              <div className="mission-text">
                <span className="eyebrow-text">OUR MISSION</span>
                <h2>
                  To empower creativity and opportunity through the circular
                  economy.
                </h2>
                <p>
                  We connect millions of buyers and sellers, fostering a world
                  where items are cherished, reused, and given new stories.
                  We're for the finders, the keepers, the sellers, and the
                  storytellers.
                </p>
              </div>
              <div className="mission-image-wrapper">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Team collaborating on a project"
                />
              </div>
            </div>
          </section>

          <section className="h-section values-section">
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <i className={value.icon}></i>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="h-section team-section">
            <div className="team-intro">
              <h2>The People Behind the Platform</h2>
              <p>
                A passionate group of designers, engineers, and dreamers
                dedicated to our mission.
              </p>
            </div>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                  <img src={member.img} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="about-cta">
        <h2>Ready to join the ReVibe movement?</h2>
        <p>
          Your next favorite thing is just a search away. Or, turn your unused
          items into someone else's treasure.
        </p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Start Browsing</button>
          <button className="btn btn-secondary">Sell an Item</button>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
