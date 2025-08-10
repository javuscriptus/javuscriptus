import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

import fragmentShader from '../shaders/avatarShader.glsl'

const AvatarMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    glitchAmount: 0.05,
    avatarStyle: 0, // 0: Hacker, 1: Traveler, 2: Designer
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

extend({ AvatarMaterial });

const Avatar = ({ avatarStyle, glitchAmount }) => {
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
  });

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
        materialRef.current.uniforms.avatarStyle.value = avatarStyle;
        materialRef.current.uniforms.glitchAmount.value = glitchAmount;
    }
  }, [avatarStyle, glitchAmount])

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[4, 4]} />
      <avatarMaterial ref={materialRef} transparent={true} />
    </mesh>
  );
};

export default Avatar;
