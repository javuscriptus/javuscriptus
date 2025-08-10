import { Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const FONT_URL_GRAFFITI = undefined;

const loreText = `
Он родился в тени советских серверов.
Вырос на пиратских DVD.
Учился у уличных художников и нейросетей.
Он не следует трендам — он их ломает.
`;

const LoreSection = () => {
  const textRef = useRef();
  const artifactsRef = useRef();

  useEffect(() => {
    const onEnter = () => {
      if (!textRef.current || !artifactsRef.current) return;
      gsap.fromTo(
        textRef.current.material,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        textRef.current.position,
        { x: -2.5 },
        { x: -3, duration: 1.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        artifactsRef.current.position,
        { x: 2.5 },
        { x: 3, duration: 1.2, ease: 'power3.out' }
      );
    };
    window.addEventListener('section:lore', onEnter);
    return () => window.removeEventListener('section:lore', onEnter);
  }, []);

  return (
    <group position={[0, 0, -10]}>
      {/* Left side: Lore Text */}
      <Text
        ref={textRef}
        font={FONT_URL_GRAFFITI}
        position={[-3, 0, 0]}
        fontSize={0.3}
        lineHeight={1.5}
        anchorX='left'
        anchorY='middle'
        color='#F2D027' // Rotten-yellow
        maxWidth={4}
        fillOpacity={1}
      >
        {loreText}
      </Text>

      {/* Right side: Animated Artifacts (placeholders) */}
      <group ref={artifactsRef} position={[3, 0, 0]}>
        {/* Placeholder for "Backpack" */}
        <mesh
          position={[0, 1, 0]}
          onClick={() =>
            console.log(
              '// Secret #15: You found the hidden stash. It contains old, pirated DVDs.'
            )
          }
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='red' wireframe />
        </mesh>
        {/* Placeholder for "Gear Necklaces" */}
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.5, 0.1, 16, 32]} />
          <meshStandardMaterial color='white' wireframe />
        </mesh>
      </group>
    </group>
  );
};

export default LoreSection;
