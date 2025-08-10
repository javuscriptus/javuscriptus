import { useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { gsap } from 'gsap';

const options = [
  { id: 'ai', label: 'Нейросеть' },
  { id: 'fashion', label: 'Коллекция одежды' },
  { id: 'genart', label: 'Генеративное искусство' },
];

const FutureSection = () => {
  const [selected, setSelected] = useState([]);
  const groupRef = useRef();
  const pulseRef = useRef();

  const toggle = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const onEnter = () => {
      if (!groupRef.current) return;
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.9, y: 0.9, z: 0.9 },
        { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power4.out' }
      );
    };
    window.addEventListener('section:future', onEnter);
    return () => window.removeEventListener('section:future', onEnter);
  }, []);

  useEffect(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current.scale, {
      x: 1.05,
      y: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 1.2,
      ease: 'sine.inOut',
    });
  }, []);

  const finale = useMemo(() => {
    if (selected.includes('ai') && selected.includes('genart')) return 'ВЗРЫВ';
    if (selected.includes('fashion')) return 'ТИШИНА';
    if (selected.length === 0) return '...';
    return 'БЕГСТВО';
  }, [selected]);

  return (
    <group ref={groupRef}>
      <Text position={[0, 1.8, 0]} fontSize={0.45} color={'#00FFFF'}>
        Что дальше?
      </Text>
      <group position={[0, 0.5, 0]}>
        {options.map((opt, i) => (
          <group
            key={opt.id}
            position={[i * 2 - 2, 0, 0]}
            onClick={() => toggle(opt.id)}
          >
            <mesh>
              <planeGeometry args={[1.6, 0.6]} />
              <meshBasicMaterial
                color={selected.includes(opt.id) ? '#00FFFF' : '#2E2929'}
              />
            </mesh>
            <Text
              fontSize={0.22}
              color={selected.includes(opt.id) ? '#000' : '#00FFFF'}
            >
              {opt.label}
            </Text>
          </group>
        ))}
      </group>
      <group ref={pulseRef} position={[0, -1.2, 0]}>
        <mesh>
          <planeGeometry args={[2.6, 1]} />
          <meshBasicMaterial color={'#BF6A00'} />
        </mesh>
        <Text fontSize={0.35} color={'#000'}>
          {finale}
        </Text>
      </group>
      <Text position={[0, -2.2, 0]} fontSize={0.22} color={'#F2D027'}>
        Он ещё не закончил. И ты не знаешь, где он появится следующим.
      </Text>
    </group>
  );
};

export default FutureSection;
