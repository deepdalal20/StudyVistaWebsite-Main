export const fadeIn = (element: HTMLElement, delay: number = 0, duration: number = 500) => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 10); // Small delay to ensure transition applies
};

export const fadeInUp = (element: HTMLElement, delay: number = 0, duration: number = 500, distance: number = 20) => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = `translateY(${distance}px)`;
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 10);
};

export const fadeInLeft = (element: HTMLElement, delay: number = 0, duration: number = 500, distance: number = 20) => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = `translateX(-${distance}px)`;
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }, 10);
};

export const fadeInRight = (element: HTMLElement, delay: number = 0, duration: number = 500, distance: number = 20) => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = `translateX(${distance}px)`;
  element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }, 10);
};

export const animateNumber = (
  element: HTMLElement, 
  targetNumber: number, 
  duration: number = 2000,
  formatFunction?: (value: number) => string
) => {
  if (!element) return;
  
  let startNumber = 0;
  const startTime = performance.now();
  const increment = targetNumber / (duration / 16); // Assuming 60fps (16ms per frame)
  
  const updateNumber = (timestamp: number) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentNumber = Math.floor(progress * targetNumber);
    
    if (formatFunction) {
      element.textContent = formatFunction(currentNumber);
    } else {
      element.textContent = currentNumber.toString();
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      if (formatFunction) {
        element.textContent = formatFunction(targetNumber);
      } else {
        element.textContent = targetNumber.toString();
      }
    }
  };
  
  requestAnimationFrame(updateNumber);
};
