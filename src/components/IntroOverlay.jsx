import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';

const IntroOverlay = () => {
  const [hidden, setHidden] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ref.current,
      { opacity: 1 },
      {
        opacity: 0,
        delay: 1.6,
        duration: 1.2,
        onComplete: () => setHidden(true),
      }
    );
    return () => tl.kill();
  }, []);

  if (hidden) return null;
  return (
    <Html center>
      <div
        ref={ref}
        style={{
          color: '#00FFFF',
          fontFamily: 'Orbitron, system-ui, sans-serif',
          letterSpacing: 1,
          fontSize: 18,
        }}
      >
        Stepan Nekrasov — Digital IT Developer 2025
      </div>
    </Html>
  );
};

export default IntroOverlay;
