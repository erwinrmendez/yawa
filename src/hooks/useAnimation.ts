/**
 * Hook to handle animations
 *
 */

import { useCallback, useState } from "react";

export const useAnimation = (
  initialAnimation: string,
  initialDelay: number
) => {
  const [animate, setAnimate] = useState(initialAnimation);
  const [delay, setDelay] = useState(initialDelay);

  const shake = useCallback(() => {
    setAnimate("animate-shake");
    reset(500);
  }, []);

  const reveal = useCallback((delayFactor: number, duration: number) => {
    setDelay(delayFactor);
    setAnimate("animate-flip");
    reset(duration);
  }, []);

  const bounce = useCallback(() => {
    setDelay(0);
    setAnimate("animate-bounce");
    reset(200);
  }, []);

  const reset = (lapse: number) => {
    setTimeout(() => {
      setAnimate("animation-none");
    }, lapse);
  };

  return { animate, delay, shake, reveal, bounce };
};
