import React, { useState } from "react";
import PlanetInfoPopup from "./PlanetInfoPopup";

const SunInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => setShowPopup((prev) => !prev);

  return (
    <>
      <div onClick={handlePopupToggle}>
        <p>Click to learn about the Sun</p>
      </div>
      {showPopup && (
        <PlanetInfoPopup
          name="Sun"
          size="1.39 million km"
          rotation="27 days"
          revolution="225 million years (around Milky Way)"
          distance="0 km (Center of Solar System)"
          facts="The Sun is a massive ball of hydrogen and helium, generating energy through nuclear fusion."
          onClose={handlePopupToggle}
        />
      )}
    </>
  );
};

export default SunInfo;
