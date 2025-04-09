import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const MarsInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        <p>Click to learn about Mars</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Mars"
          size="6,779 km"
          rotation="24.6 hours"
          revolution="687 Earth days"
          distance="227.9 million km"
          facts="Mars is known as the Red Planet due to iron oxide (rust) on its surface."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default MarsInfo;
