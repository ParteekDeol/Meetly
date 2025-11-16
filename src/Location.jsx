import React, { useState } from 'react';

import './location.css'

export default function Locations({ location, plan }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            {/* {!isVisible && <LocationPreview location={location} setIsVisible={setIsVisible}/>} */}
            {/* <div className="location-container" style={{ display: isVisible ? 'block' : 'none' }}>
                <h1>{plan}</h1>
                <h2>{location}</h2>
                <div className="location-itinerary">
                    <h3>Itinerary:</h3>
                    <ul>
                        <li>Day 1: Arrival and city tour</li>
                        <li>Day 2: Museum visits and local cuisine tasting</li>
                        <li>Day 3: Outdoor adventure and sightseeing</li>
                    </ul>
                </div>
                <div className="location-tips">
                    <h3>Travel Tips:</h3>
                    <ul>
                        <li>Best time to visit: Spring and Fall</li>
                        <li>Local customs to be aware of</li>
                        <li>Packing essentials for the trip</li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="main-map"></div>
                    <div className="image-collection">
                        <image className="image" src="../public/images/image-1.jpg"></image>
                    </div>
                </div>
            </div> */}


              <main className="card">
                <h1 className="title viaoda-libre-bold">{location.toUpperCase()}</h1>

                <div className="content">
                  {/* Left column: itinerary + tips */}
                  <aside className="left">
                    <section className="section">
                      <h2 className="section-title">ITINERARY</h2>
                      <ul className="pill-list">
                        <li className="pill">📍 Fushimi Inari Taisha</li>
                        <li className="pill">📍 Arashiyama Bamboo Grove</li>
                        <li className="pill">📍 Gion District</li>
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
                        <img className="hero placeholder" src="../public/images/image-1.jpg" />

                    <div className="thumb-row">
                      <img className="thumb placeholder" aria-hidden="true" src="../public/images/image-2.jpg" />
                      <img className="thumb placeholder" aria-hidden="true" src="../public/images/image-3.jpg" />
                      <img className="thumb placeholder" aria-hidden="true" src="../public/images/image-4.jpg" />
                    </div>
                  </section>
                </div>
              </main>
        </div>
    );
}