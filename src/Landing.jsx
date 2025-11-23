import React from "react";
import "./Landing.css";

export default function Landing({ onStart }) {
  const [isVisible, setIsVisible] = React.useState(true);
  const images = [
    "/images/country1.jpg",
    "/images/country2.jpg",
    "/images/country3.jpg",
  ];

  const countries = [
        "Germany",
        "Italy",
        "France",
      ];

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }} className="landing-container">
      <main className="landing-card">
        <header className="landing-header">
          <h1 className="viaoda-libre-bold">MEETLY</h1>
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
              {/* <figcaption className="hero-caption">{countries[i]}</figcaption> */}
            </figure>
          ))}
        </section>

        <div className="start-wrap">
          <button
            className="start-btn"
            onClick={() => {
              if (onStart) {
                onStart();
                setIsVisible(false);
              }
              else window.location.hash = "#start";
            }}
          >
            Start Now
          </button>
        </div>
      </main>
      <p id="credits-text-landing">Created by Parteek Deol and Kushaagra Patel</p>
    </div>
  );
}
