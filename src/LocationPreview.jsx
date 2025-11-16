function LocationPreview({ location, setIsVisible }) {
    return (
        <div className="location-preview-card">
            <h2 className="location-preview-title">{location}</h2>
            <button
                className="location-preview-btn"
                onClick={() => setIsVisible(true)}
            >
                View Plan
            </button>
        </div>
    );
}

export default LocationPreview;