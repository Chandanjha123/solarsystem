import React from 'react';
import { Stars } from '@react-three/drei';

export default function StarBackground() {
  return (
    <Stars
      radius={300} // Radius of the starfield
      depth={60} // Depth of the starfield
      count={2000} // Number of stars
      factor={4} // Size factor
      saturation={0} // Saturation of stars
      fade // Fade-in animation
      speed={1} // Rotation speed
    />
  );
}