import { Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const FONT_URL_GRAFFITI = 'https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004La2C.woff'

const loreText = `
Он родился в тени советских серверов.
Вырос на пиратских DVD.
Учился у уличных художников и нейросетей.
Он не следует трендам — он их ломает.
`

const LoreSection = () => {
  const textRef = useRef()
  const artifactsRef = useRef()

  // We will add GSAP animations here in a later step.

  return (
    <group position={[0, 0, -10]}>
      {/* Left side: Lore Text */}
      <Text
        ref={textRef}
        font={FONT_URL_GRAFFITI}
        position={[-3, 0, 0]}
        fontSize={0.3}
        lineHeight={1.5}
        anchorX="left"
        anchorY="middle"
        color="#F2D027" // Rotten-yellow
        maxWidth={4}
      >
        {loreText}
      </Text>

      {/* Right side: Animated Artifacts (placeholders) */}
      <group ref={artifactsRef} position={[3, 0, 0]}>
        {/* Placeholder for "Backpack" */}
        <mesh
          position={[0, 1, 0]}
          onClick={() => console.log('// Secret #15: You found the hidden stash. It contains old, pirated DVDs.')}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>
        {/* Placeholder for "Gear Necklaces" */}
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.5, 0.1, 16, 32]} />
          <meshStandardMaterial color="white" wireframe />
        </mesh>
      </group>
    </group>
  );
};

export default LoreSection;
