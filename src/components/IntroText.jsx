import { Text } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Prefer local or default font; remove remote Google .woff to avoid CORS/offline failures
const FONT_URL_RAJDHANI = undefined;

const introLines = ['Ташкент.', 'Он не ищет работу.', 'Он создаёт реальность.'];

const IntroText = () => {
  const groupRef = useRef();

  useEffect(() => {
    const onEnter = () => {
      if (!groupRef.current) return;
      gsap.from(groupRef.current.children, {
        duration: 1.5,
        opacity: 0,
        y: 2,
        ease: 'power3.out',
        stagger: 1.0,
      });
    };
    window.addEventListener('section:avatar', onEnter);
    // run once on mount as well for initial reveal
    onEnter();
    return () => window.removeEventListener('section:avatar', onEnter);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.5, 1]} scale={0.5}>
      {introLines.map((line, index) => (
        <Text
          key={index}
          font={FONT_URL_RAJDHANI}
          anchorX='center'
          anchorY='middle'
          position={[0, (introLines.length - 1 - index) * -1.2, 0]} // Stack lines vertically
          fontSize={1}
          color='#00FFFF' // Neon-turquoise
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
