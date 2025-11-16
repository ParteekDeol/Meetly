import React, { useState } from 'react';

import './location.css'

export default function Locations({ location, plan }) {
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
                        {plan && typeof plan === 'string' ? (
                          plan.split('\n').filter(line => line.trim()).map((item, index) => (
                            <li key={index} className="pill">📍 {item.trim()}</li>
                          ))
                        ) : (
                          <>
                            <li className="pill">📍 Fushimi Inari Taisha</li>
                            <li className="pill">📍 Arashiyama Bamboo Grove</li>
                            <li className="pill">📍 Gion District</li>
                          </>
                        )}
                      </ul>
                    </section>

                    <section className="section">
                      <h2 className="section-title">TIPS</h2>
                      <ul className="pill-list">
                        <li className="pill">💡 Time Your Visits Strategically</li>
                        <li className="pill">💡 Explore Local Markets</li>
                        <li className="pill">💡 Respect Local Customs</li>
                      </ul>
                    </section>
                  </aside>

                  {/* Right column: large image placeholder + three thumbnails */}
                  <section className="right">
                    <img className="hero placeholder" src="/images/image-1.jpg" alt={location || "Travel destination"} />

                    <div className="thumb-row">
                      <img className="thumb placeholder" src="/images/image-2.jpg" alt="Destination view 1" />
                      <img className="thumb placeholder" src="/images/image-3.jpg" alt="Destination view 2" />
                      <img className="thumb placeholder" src="/images/image-4.jpg" alt="Destination view 3" />
                    </div>
                  </section>
                </div>
            </main>
        </div>
    );
}