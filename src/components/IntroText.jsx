import { Text } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// Font URLs from Google Fonts
const FONT_URL_ORBITRON = 'https://fonts.gstatic.com/s/orbitron/v25/yMJRMIlzdpvBhQQL_Qq7dy0.woff'
const FONT_URL_RAJDHANI = 'https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7g0c-g.woff'

const introLines = [
  "Ташкент.",
  "Он не ищет работу.",
  "Он создаёт реальность."
];

const IntroText = () => {
  const groupRef = useRef();

  useEffect(() => {
    // Animation: "spray-paint" reveal
    // We target the children of the group, which will be the <Text> components
    if (groupRef.current) {
      gsap.from(groupRef.current.children, {
        duration: 1.5,
        opacity: 0,
        y: 2, // move text up slightly as it appears
        ease: 'power3.out',
        stagger: 1.0, // 1 second delay between each line
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.5, 1]} scale={0.5}>
      {introLines.map((line, index) => (
        <Text
          key={index}
          font={FONT_URL_RAJDHANI}
          anchorX="center"
          anchorY="middle"
          position={[0, (introLines.length - 1 - index) * -1.2, 0]} // Stack lines vertically
          fontSize={1}
          color="#00FFFF" // Neon-turquoise
          material-fog={false}
          material-transparent={true}
        >
          {line}
        </Text>
      ))}
    </group>
  );
};

export default IntroText;
