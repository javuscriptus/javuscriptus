import { useRef, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

import workGlitchFragmentShader from '../shaders/workGlitch.glsl';
import animationState from '../state';

// Project placeholders; replace urls with real ones
const mockProjects = [
  { title: 'Neural Garments', url: '#' },
  { title: 'Realtime WebGL', url: '#' },
  { title: 'R3F DGX', url: '#' },
  { title: 'Gen-Design Toolkit', url: '#' },
  { title: 'Spatial UI', url: '#' },
  { title: 'A/V Systems', url: '#' },
];

const WorkGlitchMaterial = shaderMaterial(
  { time: 0, glitchAmount: 1.0 },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  workGlitchFragmentShader
);
extend({ WorkGlitchMaterial });

const ProjectItem = ({ project, position }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const textRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      // Continuously update glitch from global state
      materialRef.current.uniforms.glitchAmount.value =
        animationState.workSection.glitchAmount;
    }
  });

  const handlePointerMove = e => {
    gsap.to(meshRef.current.position, {
      x: position[0] + (Math.random() - 0.5) * 2,
      y: position[1] + (Math.random() - 0.5) * 2,
      z: position[2] + (Math.random() - 0.5),
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    // glitch pulse on click but keep link clickable
    if (materialRef.current) {
      gsap.fromTo(
        materialRef.current.uniforms.glitchAmount,
        { value: 0.6 },
        { value: 0, duration: 0.6, ease: 'expo.out' }
      );
    }
    if (project.url) window.open(project.url, '_blank');
  };

  return (
    <group position={position}>
      <mesh onPointerMove={handlePointerMove} visible={false}>
        <planeGeometry args={[2.5, 1.5]} />
      </mesh>
      <mesh ref={meshRef} onClick={handleClick}>
        <planeGeometry args={[2, 1]} />
        <workGlitchMaterial ref={materialRef} />
        <Text
          ref={textRef}
          // Use default font to avoid remote fetch
          font={undefined}
          fontSize={0.2}
          color='white'
          anchorX='center'
          anchorY='middle'
        >
          {project.title}
        </Text>
      </mesh>
    </group>
  );
};

const WorkSection = () => {
  const gridColumns = 3;
  const gridGap = 3;

  return (
    <group>
      {mockProjects.map((project, index) => {
        const row = Math.floor(index / gridColumns);
        const col = index % gridColumns;
        const x = (col - (gridColumns - 1) / 2) * gridGap;
        const y = row * -1 * (gridGap - 1);
        return (
          <ProjectItem key={index} project={project} position={[x, y, 0]} />
        );
      })}
    </group>
  );
};

export default WorkSection;
