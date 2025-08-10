import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { useRef } from 'react';

import fragmentShader from '../shaders/introVhsEffect.glsl';

const VhsMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    nIntensity: 0.1,
    sIntensity: 0.05,
    sCount: 4096,
    tDiffuse: new THREE.Texture(),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  fragmentShader
);

extend({ VhsMaterial });

const VhsIntroEffect = () => {
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[10, 10]} />
      <vhsMaterial ref={materialRef} />
    </mesh>
  );
};

export default VhsIntroEffect;
