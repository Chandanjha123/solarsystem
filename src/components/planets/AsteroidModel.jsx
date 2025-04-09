import React from 'react';
import { useGLTF } from '@react-three/drei';

// Export the AsteroidModel component as the default export
export default function AsteroidModel(props) {
  const { nodes, materials } = useGLTF('/models/tripo_pbr_model_d2ed7e65-aeb2-4c17-92f8-579e672f44a2.glb');
  return (
    <group {...props} dispose={null} scale={[20,20,20]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tripo_node_d2ed7e65-aeb2-4c17-92f8-579e672f44a2'].geometry}
        material={materials['tripo_material_d2ed7e65-aeb2-4c17-92f8-579e672f44a2']}
      />
    </group>
  );
}

useGLTF.preload('/models/tripo_pbr_model_d2ed7e65-aeb2-4c17-92f8-579e672f44a2.glb');