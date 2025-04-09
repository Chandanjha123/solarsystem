import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Comet = ({ position, direction, speed, delay }) => {
  const cometRef = useRef();
  const [visible, setVisible] = useState(false);
  const [tailPositions, setTailPositions] = useState(() => new Array(10).fill().map(() => new THREE.Vector3(...position)));

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state, delta) => {
    if (!visible || !cometRef.current) return;

    // Update position with delta time for consistent speed
    cometRef.current.position.add(direction.clone().multiplyScalar(speed * delta));

    // Update tail positions (circular buffer)
    setTailPositions(prev => [
      cometRef.current.position.clone(),
      ...prev.slice(0, -1)
    ]);

    // Reset when out of bounds (3D space consideration)
    const { x, y, z } = cometRef.current.position;
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      cometRef.current.position.set(...position);
    }
  });

  return (
    visible && (
      <group>
        {/* Main comet body */}
        <mesh ref={cometRef}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* Particle tail */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={tailPositions.length}
              array={new Float32Array(tailPositions.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            color="white"
            transparent
            opacity={0.7}
            sizeAttenuation={true}
          />
        </points>
      </group>
    )
  );
};

const CometField = () => {
  const comets = useRef([]);

  // Generate initial positions with spatial distribution
  useEffect(() => {
    const positions = new Set();
    const generateUniquePosition = () => {
      const pos = [
        (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 40), // X: -100 to -60 or 60 to 100
        50 + Math.random() * 50, // Y: 50 to 100
        (Math.random() - 0.5) * 40 // Z: -20 to 20
      ];
      const key = pos.map(v => v.toFixed(0)).join("|");
      return positions.has(key) ? generateUniquePosition() : (positions.add(key), pos);
    };

    comets.current = Array.from({ length: 25 }).map((_, i) => {
      const position = generateUniquePosition();
      const angle = Math.random() * Math.PI * 2;
      const dir = new THREE.Vector3(
        Math.cos(angle) * 0.5,
        -1,
        Math.sin(angle) * 0.5
      ).normalize();
      
      return (
        <Comet
          key={i}
          position={position}
          direction={dir}
          speed={0.5 + Math.random() * 0.7}
          delay={Math.random() * 5}
        />
      );
    });
  }, []);

  return <>{comets.current}</>;
};

export default CometField;