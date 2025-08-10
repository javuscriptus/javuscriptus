import { PositionalAudio } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';

// This component will manage all the sounds in the scene.
// Note: The URLs are placeholders. Real audio files would need to be
// placed in the /public/sounds/ directory.

const SoundManager = () => {
  const vhsHumRef = useRef();
  const [isAvailable, setIsAvailable] = useState(false);
  const soundUrl = useMemo(() => '/sounds/vhs_hum.mp3', []);

  useEffect(() => {
    let isMounted = true;

    const looksLikeAudioPath = url =>
      /\.(mp3|wav|ogg|aac|m4a)(\?.*)?$/i.test(url);

    const checkAudioUrl = async url => {
      // Optional env flag to disable audio in dev/build
      try {
        // eslint-disable-next-line no-undef
        if (
          typeof import.meta !== 'undefined' &&
          import.meta.env &&
          import.meta.env.VITE_ENABLE_AUDIO === 'false'
        ) {
          return false;
        }
      } catch (_) {}
      if (!looksLikeAudioPath(url)) return false;
      try {
        const head = await fetch(url, { method: 'HEAD' });
        const type = (head.headers.get('content-type') || '').toLowerCase();
        if (head.ok && type.startsWith('audio/')) return true;
      } catch (_) {}
      try {
        const get = await fetch(url, {
          method: 'GET',
          headers: { Range: 'bytes=0-0' },
        });
        const type = (get.headers.get('content-type') || '').toLowerCase();
        if (get.ok && type.startsWith('audio/')) return true;
      } catch (_) {}
      return false;
    };

    checkAudioUrl(soundUrl)
      .then(ok => {
        if (!isMounted) return;
        setIsAvailable(ok);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsAvailable(false);
      });

    return () => {
      isMounted = false;
    };
  }, [soundUrl]);

  // We can expose functions to trigger one-shot sounds if needed,
  // for example, using a global state object like we did for animations.
  // For now, we just have the ambient hum.

  return (
    <group>
      {/* Ambient VHS hum, looping */}
      {isAvailable ? (
        <PositionalAudio ref={vhsHumRef} url={soundUrl} autoplay loop />
      ) : null}
    </group>
  );
};

// A function to play a click sound, could be exported and used anywhere
// export const playClickSound = () => { ... }

export default SoundManager;
