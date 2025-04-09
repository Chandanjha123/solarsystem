import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const EarthInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Earth</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Earth"
          size="12,742 km"
          rotation="24 hours"
          revolution="365.25 days"
          distance="149.6 million km"
          facts="Earth is the only known planet to support life and has a diverse climate."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default EarthInfo;
