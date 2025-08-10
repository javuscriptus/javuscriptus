import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import suzaniFragmentShader from '../shaders/suzaniPattern.glsl';

const SuzaniMaterial = shaderMaterial(
  { time: 0 },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  suzaniFragmentShader
);
extend({ SuzaniMaterial });

const SuzaniBackground = () => {
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta * 0.5; // Slow down the animation a bit
    }
  });

  return (
    <mesh position={[0, 0, -1]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <suzaniMaterial ref={materialRef} />
    </mesh>
  );
};

export default SuzaniBackground;
