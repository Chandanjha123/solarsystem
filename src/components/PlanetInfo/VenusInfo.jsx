import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const VenusInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Venus</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Venus"
          size="12,104 km"
          rotation="243 Earth days"
          revolution="225 Earth days"
          distance="108.2 million km"
          facts="Venus has a thick, toxic atmosphere that traps heat, making it the hottest planet."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default VenusInfo;
