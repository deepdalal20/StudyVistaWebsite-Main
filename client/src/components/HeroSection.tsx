import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  // Check for mobile and tablet screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle mouse move for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // 3D transform values based on mouse position
  const calcTranslateX = mousePosition.x * 20 - 10;
  const calcTranslateY = mousePosition.y * 20 - 10;
  
  // Define animations
  const titleAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };
  
  const paragraphAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } 
    }
  };
  
  const buttonAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } 
    },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#ff9d2f", 
      boxShadow: "0 10px 25px rgba(255, 157, 47, 0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  const imageAnimation = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        duration: 1, 
        delay: 0.3, 
        ease: "easeOut" 
      } 
    }
  };
  
  const floatingAnimation = {
    y: [0, -15, 0],
    rotateZ: [0, 2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const decorElements = [
    { top: '15%', left: '10%', size: 30, delay: 0, rotate: 0 },
    { top: '70%', left: '15%', size: 20, delay: 0.5, rotate: 45 },
    { top: '20%', right: '15%', size: 25, delay: 1, rotate: 30 },
    { top: '75%', right: '10%', size: 35, delay: 1.5, rotate: 60 }
  ];
  
  return (
    <section ref={heroRef} className="hero" style={heroStyle}>
      <div className="container" style={{
        ...containerStyle,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '0 var(--spacing-md)' : '0 var(--spacing-xl)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <motion.div 
          className="hero-content" 
          style={{
            ...heroContentStyle,
            width: isMobile ? '100%' : isTablet ? '60%' : '50%',
            padding: isMobile ? 'var(--spacing-xl) 0' : 'var(--spacing-xxl) 0',
            marginRight: isMobile ? 0 : 'var(--spacing-xl)'
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            style={{
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
              lineHeight: 1.2,
              marginBottom: 'var(--spacing-md)',
              fontWeight: 700,
              background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
            variants={titleAnimation}
          >
            <span style={{ color: 'var(--secondary)', WebkitTextFillColor: 'var(--secondary)' }}>Transform</span> Your Future with International Education
          </motion.h1>
          
          <motion.p 
            style={{
              ...heroParagraphStyle,
              fontSize: isMobile ? '1rem' : '1.2rem',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.9)'
            }}
            variants={paragraphAnimation}
          >
            Unlock your potential with our expert guidance. We help students achieve 
            their dreams of studying abroad with personalized counseling and support at every step of your journey.
          </motion.p>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)' }}>
            <motion.a 
              href="#" 
              style={{
                ...heroCTAStyle,
                width: isMobile ? '100%' : 'auto',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 5px 15px rgba(255, 157, 47, 0.3)'
              }}
              onClick={(e) => {
                e.preventDefault();
                onGetStarted();
              }}
              variants={buttonAnimation}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Get Started <i className="fas fa-arrow-right"></i>
            </motion.a>
            
            <motion.a 
              href="#services" 
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                color: 'white',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--border-radius-md)',
                backdropFilter: 'blur(5px)',
                background: 'rgba(255, 255, 255, 0.1)',
                width: isMobile ? '100%' : 'auto',
                transition: 'all var(--transition-fast)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { delay: 0.6, duration: 0.8 } 
              }}
              whileHover={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-play" style={{ 
                fontSize: '0.8rem', 
                background: 'white', 
                color: 'var(--primary)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}></i>
              Our Services
            </motion.a>
          </div>
          
          <motion.div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginTop: 'var(--spacing-xl)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              transition: { delay: 0.8, duration: 0.8 } 
            }}
          >
            <div style={{ display: 'flex' }}>
              {[1, 2, 3, 4].map((num, i) => (
                <div 
                  key={i}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid white',
                    marginLeft: i > 0 ? '-10px' : '0',
                    position: 'relative',
                    zIndex: 4 - i
                  }}
                >
                  <img 
                    src={`https://i.pravatar.cc/100?img=${num + 10}`} 
                    alt="Student" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                marginLeft: '-10px',
                backgroundColor: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                99+
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>Trusted by 5000+ students</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>across 50+ countries worldwide</div>
            </div>
          </motion.div>
        </motion.div>
        
        {!isMobile && (
          <motion.div 
            className="hero-image-container"
            style={{
              ...heroImageContainerStyle,
              width: isTablet ? '40%' : '45%',
              display: 'block',
              perspective: '1000px'
            }}
            initial="hidden"
            animate="visible"
            variants={imageAnimation}
          >
            <motion.div
              style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateY(${calcTranslateX}deg) rotateX(${-calcTranslateY}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              animate={floatingAnimation}
            >
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Students studying abroad" 
                style={{
                  ...heroImageStyle,
                  borderRadius: 'var(--border-radius-lg)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  border: '5px solid rgba(255, 255, 255, 0.1)'
                }}
              />
              
              {/* 3D decorative elements */}
              {decorElements.map((elem, index) => (
                <motion.div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: elem.top,
                    left: elem.left,
                    right: elem.right,
                    width: `${elem.size}px`,
                    height: `${elem.size}px`,
                    backgroundColor: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    zIndex: 10
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: [elem.rotate, elem.rotate + 360],
                    transition: { 
                      delay: elem.delay, 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    } 
                  }}
                />
              ))}
              
              {/* 3D floating text badge */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  backgroundColor: 'white',
                  color: 'var(--primary)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius-md)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 5,
                  transform: 'translateZ(40px)',
                  fontWeight: 600
                }}
                initial={{ opacity: 0, y: 50, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0], 
                  x: 0,
                  transition: { 
                    delay: 1,
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  } 
                }}
              >
                <i className="fas fa-globe" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                <div>
                  <div style={{ fontSize: '1rem', lineHeight: 1.2 }}>100% Success Rate</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Visa Approvals</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Hero wave background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        zIndex: 1
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
          position: 'relative',
          display: 'block',
          width: 'calc(100% + 1.3px)',
          height: '60px',
          transform: 'rotateY(180deg)'
        }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            style={{ fill: 'white' }}></path>
        </svg>
      </div>
      
      <div className="hero-overlay" style={heroOverlayStyle}></div>
    </section>
  );
};

// Base styles
const heroStyle: React.CSSProperties = {
  position: 'relative',
  color: 'white',
  padding: '0',
  height: 'min(90vh, 800px)',
  overflow: 'hidden',
  backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center'
};

const heroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(18, 47, 120, 0.95) 0%, rgba(30, 58, 138, 0.85) 100%)',
  zIndex: 1,
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const heroContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
};

const heroParagraphStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
};

const heroCTAStyle: React.CSSProperties = {
  backgroundColor: 'var(--secondary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  fontWeight: 600,
  transition: 'all var(--transition-fast)',
};

const heroImageContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '50%',
  maxWidth: '600px',
};

const heroImageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
};

export default HeroSection;
