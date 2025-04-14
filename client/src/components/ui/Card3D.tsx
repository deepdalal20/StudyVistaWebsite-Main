import React, { ReactNode, useRef, useState } from 'react';
import styles from '../../styles/card3d.module.css'; // Make sure this path is correct

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glareEffect?: boolean;
  depth?: number;
  borderGlow?: boolean;
  interactive?: boolean;
  borderRadius?: number;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glareEffect = false,
  depth = 20,
  borderGlow = false,
  interactive = true,
  borderRadius = 8
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateYValue = 30 * (0.5 - x);
    const rotateXValue = 30 * (y - 0.5);

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    if (glareEffect) {
      setGlarePosition({ x: x * 100, y: y * 100 });
    }
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const containerClasses = [
    styles.card3dContainer,
    interactive ? styles.interactive : '',
    borderGlow ? styles.borderGlow : '',
    className
  ].filter(Boolean).join(' ');

  const cardStyle: React.CSSProperties = {
    transform: isHovering
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px)`
      : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
    transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease',
    borderRadius: `${borderRadius}px`,
  };

  const glareStyle: React.CSSProperties = {
    opacity: isHovering ? 0.25 : 0,
    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 1), transparent 80%)`,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div
      ref={cardRef}
      className={containerClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--border-radius': `${borderRadius}px`,
      } as React.CSSProperties}
    >
      <div className={styles.card3d} style={cardStyle}>
        {children}
        {glareEffect && <div className={styles.glare} style={glareStyle} />}
      </div>
    </div>
  );
};

export default Card3D;
