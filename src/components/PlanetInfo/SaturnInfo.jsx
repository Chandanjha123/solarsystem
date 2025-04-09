import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const SaturnInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Saturn</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Saturn"
          size="116,460 km"
          rotation="10.7 hours"
          revolution="29.5 Earth years"
          distance="1.4 billion km"
          facts="Saturn is famous for its stunning ring system made of ice and rock."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default SaturnInfo;
