import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const MercuryInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div onClick={() => setShowPopup(true)}>
        {/* Your Mercury 3D model goes here */}
        <p>Click to learn about Mercury</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Mercury"
          size="4,880 km"
          rotation="59 Earth days"
          revolution="88 Earth days"
          distance="57.9 million km"
          facts="Mercury is the closest planet to the Sun and has no atmosphere."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default MercuryInfo;
