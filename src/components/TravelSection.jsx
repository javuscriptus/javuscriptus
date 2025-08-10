import { useState, useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

import SuzaniBackground from './SuzaniBackground';

// Mock data for cities
const cities = [
  {
    name: 'Tashkent',
    position: [-2, 1, 0],
    data: {
      photoColor: '#00FFFF',
      sound: 'tashkent_metro.mp3',
      code: 'const reality = new World();',
    },
  },
  {
    name: 'Tokyo',
    position: [0, -1, 0],
    data: {
      photoColor: '#C1121F',
      sound: 'shibuya_crossing.wav',
      code: 'import { Future } from "..."',
    },
  },
  {
    name: 'Berlin',
    position: [2, 1, 0],
    data: {
      photoColor: '#F2D027',
      sound: 'techno_bunker.aiff',
      code: 'system.reboot();',
    },
  },
];

// This will be the view for a selected city
const CityView = ({ city, onBack }) => {
  const [backHovered, setBackHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = backHovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [backHovered]);

  return (
    <group>
      <Text position={[0, 2, 0]} fontSize={0.5} color='white'>
        {city.name}
      </Text>
      {/* Placeholder for photo */}
      <mesh position={[-2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color={city.data.photoColor} />
      </mesh>
      {/* Placeholder for sound */}
      <Text
        position={[2, 0.5, 0]}
        fontSize={0.2}
        color='white'
        maxWidth={2}
        textAlign='center'
      >
        [Playing: {city.data.sound}]
      </Text>
      {/* Placeholder for code */}
      <Text
        position={[2, -0.5, 0]}
        font={undefined}
        fontSize={0.2}
        color='white'
        maxWidth={2}
        textAlign='center'
      >
        {city.data.code}
      </Text>
      <Text
        onClick={onBack}
        onPointerOver={() => setBackHovered(true)}
        onPointerOut={() => setBackHovered(false)}
        position={[0, -2, 0]}
        fontSize={0.3}
        color={backHovered ? 'white' : 'gray'}
      >
        [Back to map]
      </Text>
    </group>
  );
};

const CityPatch = ({ city, onSelect }) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    gsap.to(meshRef.current.scale, {
      x: hovered ? 1.1 : 1,
      y: hovered ? 1.1 : 1,
      z: 1,
      duration: 0.3,
    });
  });

  return (
    <group position={city.position} onClick={() => onSelect(city)}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial color='#2E2929' />
        <Text fontSize={0.3} color='#00FFFF'>
          {city.name}
        </Text>
      </mesh>
    </group>
  );
};

const TravelSection = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <group>
      {!selectedCity ? (
        cities.map(city => (
          <CityPatch key={city.name} city={city} onSelect={setSelectedCity} />
        ))
      ) : (
        <>
          <CityView city={selectedCity} onBack={() => setSelectedCity(null)} />
          <SuzaniBackground />
        </>
      )}
    </group>
  );
};

export default TravelSection;
