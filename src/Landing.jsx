import React from "react";
import "./Landing.css";

export default function Landing({ onStart }) {
  // If you put images in public/images, reference them like /images/name.jpg
  const images = [
    "/images/country1.jpg",
    "/images/country2.jpg",
    "/images/country3.jpg",
  ];

  return (
    <main className="landing-card">
      <header className="landing-header">
        <h1>Meetly</h1>
      </header>

      <section className="hero-row">
        {images.map((src, i) => (
          <figure key={i} className="hero-tile" aria-hidden={false}>
            {/* Replace with <img src={src} alt="Country name" /> for real images */}
            <div
              className="hero-img"
              style={{ backgroundImage: `url(${src})` }}
              role="img"
              aria-label={`Country ${i + 1}`}
            />
            <figcaption className="hero-caption">Country {i + 1}</figcaption>
          </figure>
        ))}
      </section>

      <div className="start-wrap">
        <button
          className="start-btn"
          onClick={() => {
            if (onStart) onStart();
            else window.location.hash = "#start";
          }}
        >
          Start Now
        </button>
      </div>
    </main>
  );
}
