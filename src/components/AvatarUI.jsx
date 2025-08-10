import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import Avatar from './Avatar';

// Button variants
const buttonBase = {
  fontFamily: 'Orbitron, sans-serif',
  padding: '10px 16px',
  margin: '0 8px',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderRadius: 4,
  transition: 'transform 0.2s ease, filter 0.2s ease',
};
const variants = [
  { bg: '#001f1f', border: '#00FFFF', color: '#00FFFF' },
  { bg: '#1f1400', border: '#BF6A00', color: '#BF6A00' },
  { bg: '#1f0006', border: '#C1121F', color: '#C1121F' },
];

const AvatarSection = () => {
  const [style, setStyle] = useState(0); // Default to Hacker

  useEffect(() => {
    const onEnter = () => {
      gsap.to('.avatar-controls', { opacity: 1, y: 0, duration: 0.8 });
    };
    window.addEventListener('section:avatar', onEnter);
    return () => window.removeEventListener('section:avatar', onEnter);
  }, []);

  return (
    <>
      <Avatar avatarStyle={style} glitchAmount={0.03} />

      <Html position={[-1.5, -2.5, 0]} center>
        <div
          className='avatar-controls'
          style={{ display: 'flex', opacity: 0, transform: 'translateY(10px)' }}
        >
          <button
            style={{
              ...buttonBase,
              backgroundColor: variants[0].bg,
              border: `1px solid ${variants[0].border}`,
              color: variants[0].color,
            }}
            onClick={() => setStyle(0)}
          >
            Hacker
          </button>
          <button
            style={{
              ...buttonBase,
              backgroundColor: variants[1].bg,
              border: `1px solid ${variants[1].border}`,
              color: variants[1].color,
            }}
            onClick={() => setStyle(1)}
          >
            Traveler
          </button>
          <button
            style={{
              ...buttonBase,
              backgroundColor: variants[2].bg,
              border: `1px solid ${variants[2].border}`,
              color: variants[2].color,
            }}
            onClick={() => setStyle(2)}
          >
            Designer
          </button>
        </div>
      </Html>
    </>
  );
};

export default AvatarSection;
