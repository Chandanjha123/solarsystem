import React from "react";
import "./components/PlanetInfo/PlanetInfoPopup.css"; // Import styles

const PlanetInfoPopup = ({ name, size, rotation, revolution, distance, facts, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{name}</h2>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Rotation Time:</strong> {rotation}</p>
        <p><strong>Revolution Time:</strong> {revolution}</p>
        <p><strong>Distance from Sun:</strong> {distance}</p>
        <p><strong>Facts:</strong> {facts}</p>
      </div>
    </div>
  );
};

export default PlanetInfoPopup;
