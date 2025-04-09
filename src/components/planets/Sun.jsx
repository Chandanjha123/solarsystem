import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Sun(props) {
  const { nodes, materials } = useGLTF('/models/tripo_pbr_model_cdda7fe6-dbb0-438c-afa7-8a70d50b45be.glb');

  // Clone the original material so we don’t modify the global one
  const sunMaterial = materials['tripo_material_cdda7fe6-dbb0-438c-afa7-8a70d50b45be'].clone();
  
  sunMaterial.emissive = new THREE.Color(0xffa500); // Soft orange glow
  sunMaterial.emissiveIntensity = 1.2; // Adjusted so it glows but doesn’t cover details
  sunMaterial.toneMapped = false; // Keeps the glow effect without making it too dull

  return (
    <group {...props} dispose={null} scale={[50, 50, 50]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tripo_node_cdda7fe6-dbb0-438c-afa7-8a70d50b45be'].geometry}
        material={sunMaterial} // Apply the adjusted material
      />
    </group>
  );
}

useGLTF.preload('/models/tripo_pbr_model_cdda7fe6-dbb0-438c-afa7-8a70d50b45be.glb');
