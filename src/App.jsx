import { Canvas } from '@react-three/fiber'

import './App.css'
import IntroText from './components/IntroText'
import AvatarSection from './components/AvatarUI'
import LoreSection from './components/LoreSection'
import WorkSection from './components/WorkSection'
import TravelSection from './components/TravelSection'
import ScrollManager from './components/ScrollManager'
import EasterEggs from './components/EasterEggs'
import SoundManager from './components/SoundManager'

/*
// Secret #17: Spray can in the source
//          .
//         / \
//        |oo|
//        |""|
//       /""""\
//      /______\
*/

const NEON_TURQUOISE = '#00FFFF'

function Scene() {
  return (
    <>
      <EasterEggs />
      <SoundManager />
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight color={NEON_TURQUOISE} position={[0, 1, 4]} intensity={0.8} />

      {/* Grouping sections by their intended scroll position */}
      <group>
        <IntroText />
      </group>
      <group position-y={-5}>
        <AvatarSection />
      </group>
      <group position-y={-10}>
        <LoreSection />
      </group>
      <group position-y={-15}>
        <WorkSection />
      </group>
      <group position-y={-20}>
        <TravelSection />
      </group>
    </>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ScrollManager>
        <Scene />
      </ScrollManager>
    </Canvas>
  )
}

export default App
