import { Text } from '@react-three/drei';

const FooterGraffiti = () => {
  return (
    <group>
      <Text fontSize={0.3} color={'#00FFFF'} position={[0, 0.4, 0]}>
        Stepan Nekrasov. 2025.
      </Text>
      <Text fontSize={0.18} color={'#888'} position={[0, -0.2, 0]}>
        [GitHub] [Instagram] [Mail]
      </Text>
    </group>
  );
};

export default FooterGraffiti;
