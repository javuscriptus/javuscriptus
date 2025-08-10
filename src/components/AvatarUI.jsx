import { useState } from 'react';
import { Html } from '@react-three/drei';
import Avatar from './Avatar';

// Basic styles for the buttons. We'll refine this in a later step.
const buttonStyle = {
  fontFamily: 'Orbitron, sans-serif',
  backgroundColor: '#00FFFF20', // transparent neon-turquoise
  border: '1px solid #00FFFF',
  color: '#00FFFF',
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  textTransform: 'uppercase',
};

const AvatarSection = () => {
  const [style, setStyle] = useState(0); // Default to Hacker

  return (
    <>
      <Avatar avatarStyle={style} glitchAmount={0.05} />

      <Html position={[-1.5, -2.5, 0]} center>
        <div style={{ display: 'flex' }}>
          <button style={buttonStyle} onClick={() => setStyle(0)}>
            Hacker
          </button>
          <button style={buttonStyle} onClick={() => setStyle(1)}>
            Traveler
          </button>
          <button style={buttonStyle} onClick={() => setStyle(2)}>
            Designer
          </button>
        </div>
      </Html>
    </>
  );
};

export default AvatarSection;
