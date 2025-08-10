import { useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import animationState from '../state'

gsap.registerPlugin(ScrollTrigger)

const ScrollManager = ({ children }) => {
  const { camera, scene } = useThree()

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Main timeline for camera and section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Animate camera to move between sections
    // Section 1 -> 2 (Intro -> Avatar)
    tl.to(camera.position, { y: -5, duration: 1 }, 0)
    // Section 2 -> 3 (Avatar -> Lore)
    tl.to(camera.position, { y: -10, duration: 1 }, 1)
    // Section 3 -> 4 (Lore -> Work)
    tl.to(camera.position, { y: -15, duration: 1 }, 2)
    // Section 4 -> 5 (Work -> Travel)
    tl.to(camera.position, { y: -20, duration: 1 }, 3)

    // Animate the glitch effect for the Work section
    tl.fromTo(animationState.workSection,
        { glitchAmount: 1 },
        { glitchAmount: 0, duration: 0.5 },
    2.2) // Starts slightly after the camera starts moving to the section

    // Placeholder for Lore parallax effect
    // We would target the refs of the text and artifacts here
    // e.g., tl.to(loreTextRef.current.position, { x: -4 }, 1)
    // e.g., tl.to(loreArtifactsRef.current.position, { x: 4 }, 1)

    return () => {
      lenis.destroy()
      tl.kill()
    }
  }, [camera, scene])

  return <>{children}</>
}

export default ScrollManager
