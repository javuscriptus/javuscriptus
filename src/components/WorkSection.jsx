import { useRef, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

import workGlitchFragmentShader from '../shaders/workGlitch.glsl';
import animationState from '../state';

// Secret #27: Project names are anagrams of cyberpunk authors
const mockProjects = [
  { title: 'Project: Bogsin', url: '#' }, // Gibson
  { title: 'Project: Ovimas', url: '#' }, // Asimov
  { title: 'Project: Relack', url: '#' }, // Clarke
  { title: 'Project: Kdic', url: '#' },   // Dick
  { title: 'Project: Stingrel', url: '#' }, // Sterling
  { title: 'Project: Step On Hens', url: '#' }, // Stephenson
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

  useFrame((state, delta) => {
    if (materialRef.current) {
        materialRef.current.uniforms.time.value += delta;
        // Continuously update glitch from global state
        materialRef.current.uniforms.glitchAmount.value = animationState.workSection.glitchAmount;
    }
  });

  const handlePointerMove = (e) => {
    gsap.to(meshRef.current.position, {
      x: position[0] + (Math.random() - 0.5) * 2,
      y: position[1] + (Math.random() - 0.5) * 2,
      z: position[2] + (Math.random() - 0.5),
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    console.log(`Clicked on ${project.title}`);
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
          font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMIlzdpvBhQQL_Qq7dy0.woff"
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
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
        const y = (row * -1) * (gridGap - 1);
        return <ProjectItem key={index} project={project} position={[x, y, 0]} />;
      })}
    </group>
  );
};

export default WorkSection;
