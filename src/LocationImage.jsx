import React, { useState } from 'react';
import "./Location.css"

export default function LocationImage({ index, image, type = "thumb" }) {
    const [showAttributions, setShowAttributions] = useState(false);

    return (
        <div id={`location-image-${index}-inner`} className="location-image-inner">
            <img className={`${type} placeholder`} src={image.image} alt={`Destination view ${index + 1}`} />
            <button className="attribution-button" onClick={() => {setShowAttributions(!showAttributions)}}>i</button>
            <div style={{ display: showAttributions ? 'block' : 'none' }} className="attribution-box">
                <p>Photo by 
                    <a href={`${image.authorLink}?utm_source=meetly&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{image.author}</a> on 
                    <a href="https://unsplash.com/?utm_source=meetly&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
                </p>
            </div>
        </div>
    );
}