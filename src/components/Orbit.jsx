import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Orbit = ({ radius }) => {
    const orbitRef = useRef(new THREE.Group()); // Initialize with a valid Group

    useEffect(() => {
        // Create the orbit geometry and material
        const orbitGeometry = new THREE.RingGeometry(
            radius - 0.2, // Inner radius (thicker orbit)
            radius + 0.2, // Outer radius (thicker orbit)
            64 // Number of segments
        );
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff, // White color
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8 // Slightly more opaque for better glow
        });

        // Create the orbit mesh
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2; // Rotate to align with the horizontal plane

        // Ensure orbitRef.current is defined before adding
        if (orbitRef.current) {
            orbitRef.current.add(orbit);
        }

        // Cleanup
        return () => {
            if (orbitRef.current) {
                orbitRef.current.remove(orbit);
            }
        };
    }, [radius]);

    return <primitive object={orbitRef.current} />;
};

export default Orbit;
