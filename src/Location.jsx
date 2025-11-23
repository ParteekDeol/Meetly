import React, { useState } from 'react';
import LocationImage from './LocationImage.jsx';

import './Location.css'

export default function Locations({ location, plan, images }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="location-container">
            <main className="card">
                <h1 className="title viaoda-libre-bold">{location ? location.toUpperCase() : 'LOCATION'}</h1>

                <div className="content">
                  {/* Left column: itinerary + tips */}
                  <aside className="left">
                    <section className="section">
                      <h2 className="section-title">ITINERARY</h2>
                      <ul className="pill-list">
                        {plan && plan.itinerary ? (
                          plan.itinerary.map((item, index) => (
                            <li key={index} className="pill">📍 {item.location}</li>
                          ))
                        ) : (
                          <li className="pill">⚠️ Unable to Load Itinerary</li>
                        )}
                      </ul>
                    </section>

                    <section className="section">
                      <h2 className="section-title">TIPS</h2>
                      <ul className="pill-list">
                        {plan && plan.tips ? (
                          plan.tips.map((item, index) => (
                            <li key={index} className="pill">💡 {item}</li>
                          ))
                        ) : (
                          <li className="pill">⚠️ Unable to Load Tips</li>
                        )}
                      </ul>
                    </section>
                  </aside>

                  {/* Right column: large image placeholder + three thumbnails */}
                  <section className="right">
                    {images && images[0] ? <LocationImage key={0} image={images[0]} type="hero" /> : null}

                    <div className="thumb-row">
                      {images && images.slice(1).map((image, index) => (
                        <div id={`location-image-${index + 1}`} key={index + 1}>
                          <LocationImage index={index + 1} image={image} type="thumb" />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
            </main>
          <p id="credits-text-location">Created by Parteek Deol and Kushaagra Patel</p>
        </div>
    );
}