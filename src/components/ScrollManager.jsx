import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import animationState from '../state';

gsap.registerPlugin(ScrollTrigger);

const ScrollManager = ({ children }) => {
  const { camera, scene } = useThree();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Main timeline for camera and section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Animate camera to move between sections
    // Section 1 -> 2 (Intro -> Avatar)
    tl.to(camera.position, { y: -5, duration: 1 }, 0);
    // Section 2 -> 3 (Avatar -> Lore)
    tl.to(camera.position, { y: -10, duration: 1 }, 1);
    // Section 3 -> 4 (Lore -> Work)
    tl.to(camera.position, { y: -15, duration: 1 }, 2);
    // Section 4 -> 5 (Work -> Travel)
    tl.to(camera.position, { y: -20, duration: 1 }, 3);
    // Section 5 -> 6 (Travel -> Future)
    tl.to(camera.position, { y: -24, duration: 1 }, 4);
    // Section 6 -> 7 (Future -> Footer)
    tl.to(camera.position, { y: -27, duration: 1 }, 5);

    // Animate the glitch effect for the Work section
    tl.fromTo(
      animationState.workSection,
      { glitchAmount: 1 },
      { glitchAmount: 0, duration: 0.5 },
      2.2
    ); // Starts slightly after the camera starts moving to the section

    // Placeholder hooks for section-local timelines via dispatching custom events
    // Sections can listen for these to start their internal animations
    tl.call(
      () => window.dispatchEvent(new CustomEvent('section:avatar')),
      null,
      0.2
    );
    tl.call(
      () => window.dispatchEvent(new CustomEvent('section:lore')),
      null,
      1.2
    );
    tl.call(
      () => window.dispatchEvent(new CustomEvent('section:work')),
      null,
      2.2
    );
    tl.call(
      () => window.dispatchEvent(new CustomEvent('section:travel')),
      null,
      3.2
    );
    tl.call(
      () => window.dispatchEvent(new CustomEvent('section:future')),
      null,
      4.2
    );

    return () => {
      lenis.destroy();
      tl.kill();
    };
  }, [camera, scene]);

  return <>{children}</>;
};

export default ScrollManager;
