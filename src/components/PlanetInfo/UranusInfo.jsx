import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const UranusInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Uranus</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Uranus"
          size="50,724 km"
          rotation="17.2 hours"
          revolution="84 Earth years"
          distance="2.9 billion km"
          facts="Uranus rotates on its side, making it unique among planets in the Solar System."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default UranusInfo;
