import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const NeptuneInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Neptune</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Neptune"
          size="49,244 km"
          rotation="16 hours"
          revolution="165 Earth years"
          distance="4.5 billion km"
          facts="Neptune has the strongest winds in the Solar System, reaching speeds of up to 2,100 km/h."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default NeptuneInfo;
