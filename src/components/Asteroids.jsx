import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import AsteroidModel from './planets/AsteroidModel'; // Import the asteroid model

export default function Asteroids() {
  const asteroidsRef = useRef([]);

  useFrame(({ clock }) => {
    asteroidsRef.current.forEach((asteroid) => {
      const time = clock.getElapsedTime();
      asteroid.rotation.x = time * 0.2; // Rotate asteroids
      asteroid.rotation.y = time * 0.2;

      // Move asteroids in random directions
      asteroid.position.x += Math.sin(time + asteroid.userData.offset) * 0.1;
      asteroid.position.y += Math.cos(time + asteroid.userData.offset) * 0.1;
      asteroid.position.z += Math.sin(time + asteroid.userData.offset) * 0.1;
    });
  });

  return (
    <>
      {Array.from({ length: 50 }).map((_, index) => (
        <group
          key={index}
          ref={(el) => {
            asteroidsRef.current[index] = el;
            if (el) {
              el.userData = { offset: Math.random() * 100 }; // Add random offset for motion
            }
          }}
          position={[
            Math.random() * 1000 - 500, // Spread evenly across the X-axis
            Math.random() * 1000 - 500, // Spread evenly across the Y-axis
            Math.random() * 1000 - 500, // Spread evenly across the Z-axis
          ]}
          scale={[1, 1, 1]} // Keep the scale consistent
        >
          <AsteroidModel /> {/* Use the asteroid model */}
        </group>
      ))}
    </>
  );
}