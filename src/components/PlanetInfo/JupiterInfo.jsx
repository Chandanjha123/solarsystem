import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const JupiterInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Jupiter</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Jupiter"
          size="139,820 km"
          rotation="9.9 hours"
          revolution="11.86 Earth years"
          distance="778.5 million km"
          facts="Jupiter is the largest planet in the Solar System and has a giant storm known as the Great Red Spot."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default JupiterInfo;
