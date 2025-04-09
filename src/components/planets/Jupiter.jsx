import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Jupiter(props) {
  const { nodes, materials } = useGLTF('/models/tripo_pbr_model_ea1621ac-5447-46a9-8244-58706d312cd7.glb');
  return (
    <group {...props} dispose={null} scale={[50, 50, 50]}> {/* Scale Jupiter */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tripo_node_ea1621ac-5447-46a9-8244-58706d312cd7'].geometry}
        material={materials['tripo_material_ea1621ac-5447-46a9-8244-58706d312cd7']}
      />
    </group>
  );
}

useGLTF.preload('/models/tripo_pbr_model_ea1621ac-5447-46a9-8244-58706d312cd7.glb');