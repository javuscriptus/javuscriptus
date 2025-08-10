import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const EasterEggs = () => {
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        // --- Console Log Easter Eggs ---
        const tashkentPrinceArt = `
████████╗ █████╗ ███████╗██╗  ██╗██╗████████╗██████╗ ██████╗ ██╗███╗   ██╗ ██████╗██╗  ██╗
╚══██╔══╝██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝╚════██╗██╔══██╗██║████╗  ██║██╔════╝██║  ██║
   ██║   ███████║███████╗███████║██║   ██║    █████╔╝███████║██║██╔██╗ ██║██║     ███████║
   ██║   ██╔══██║╚════██║██╔══██║██║   ██║   ██╔═══╝ ██╔══██║██║██║╚██╗██║██║     ██╔══██║
   ██║   ██║  ██║███████║██║  ██║██║   ██║   ███████╗██║  ██║██║██║ ╚████║╚██████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝
        `;
        console.log(tashkentPrinceArt);
        console.log('// He is not a resume. He is a reality.');
        console.warn('// System Integrity Compromised... Recalibrating...');
        setTimeout(() => console.log('%c// System Stable.', 'color: #00FFFF'), 2000);

        // --- Keyboard Easter Eggs ---
        const handleKeyDown = (e) => {
            // Konami Code
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    console.log('// KONAMI PROTOCOL ACTIVATED');
                    // In a real scenario, this would trigger a visual effect
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }

            // 'T' for stats
            if (e.key.toLowerCase() === 't') {
                // This is a bit of a hack since we can't add/remove components easily
                // We'll just log to console for now
                console.log('// SCENE STATS:');
                console.log(`//   - Triangles: ${gl.info.render.triangles}`);
                console.log(`//   - Textures: ${gl.info.memory.textures}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gl]);

    return null; // This component does not render anything itself
};

export default EasterEggs;
