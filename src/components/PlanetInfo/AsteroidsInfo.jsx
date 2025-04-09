import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const AsteroidsInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Asteroids</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Asteroids"
          facts="Asteroids are rocky remnants left over from the early formation of the Solar System."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default AsteroidsInfo;
