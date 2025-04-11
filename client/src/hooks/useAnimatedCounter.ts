import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver();
  const countingStarted = useRef(false);

  useEffect(() => {
    if (!isIntersecting || countingStarted.current) return;
    
    countingStarted.current = true;
    let start = 0;
    const increment = target / (duration / 16); // Assuming 60fps (16ms per frame)
    const startTime = performance.now();
    
    const updateCount = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      start = Math.floor(progress * target);
      setCount(start);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isIntersecting, target, duration]);

  return { count, ref };
}
