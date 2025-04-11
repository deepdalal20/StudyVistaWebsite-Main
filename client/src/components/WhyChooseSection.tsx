import React, { useEffect, useRef, useState } from 'react';
import { useGlobe } from '../hooks/useGlobe';
import { motion } from 'framer-motion';

interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

const WhyChooseSection: React.FC = () => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Initialize the 3D globe
  useGlobe(canvasRef, globeContainerRef);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const benefits: BenefitItem[] = [
    {
      title: 'Personalized Approach',
      description: 'We create a customized plan for each student based on their academic background, career goals, and personal preferences.',
      icon: 'fa-user-graduate'
    },
    {
      title: 'Comprehensive Support',
      description: 'From university selection to accommodation arrangements, we provide end-to-end support throughout your journey.',
      icon: 'fa-hands-helping'
    },
    {
      title: 'High Success Rate',
      description: 'Our proven track record shows a 95% success rate in visa approvals and university admissions for our students.',
      icon: 'fa-award'
    },
    {
      title: 'Post-Arrival Support',
      description: 'Our relationship doesn\'t end with your departure; we provide continuous support even after you reach your destination.',
      icon: 'fa-headset'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="why-choose" style={whyChooseStyle}>
      <div className="container why-choose-container" style={{
        ...whyChooseContainerStyle,
        gridTemplateColumns: isTablet || isMobile ? '1fr' : '1fr 1fr',
        gap: isTablet || isMobile ? 'var(--spacing-lg)' : 'var(--spacing-xl)',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 var(--spacing-md)'
      }}>
        <div 
          className="why-choose-content" 
          style={{
            ...whyChooseContentStyle,
            order: isTablet || isMobile ? 1 : 0
          }}
        >
          <motion.h2 
            style={{
              color: 'var(--primary)', 
              marginBottom: 'var(--spacing-lg)',
              fontSize: isMobile ? '2rem' : '2.5rem',
              position: 'relative',
              paddingBottom: 'var(--spacing-sm)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Why Choose <span style={{ color: 'var(--secondary)' }}>StudyVista</span>?
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '80px',
              height: '4px',
              background: 'var(--secondary)',
              borderRadius: '2px'
            }}></div>
          </motion.h2>
          <motion.ul 
            className="benefits-list" 
            style={benefitsListStyle}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index} 
                className="benefit-item" 
                style={{
                  ...benefitItemStyle,
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                  padding: 'var(--spacing-md)',
                  backgroundColor: index % 2 === 0 ? 'rgba(var(--primary-rgb), 0.05)' : 'rgba(var(--secondary-rgb), 0.05)',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid',
                  borderColor: index % 2 === 0 ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(var(--secondary-rgb), 0.1)',
                  transition: 'all 0.3s ease',
                  transform: 'translateZ(0)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                }}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  borderColor: index % 2 === 0 ? 'rgba(var(--primary-rgb), 0.3)' : 'rgba(var(--secondary-rgb), 0.3)',
                }}
              >
                <div 
                  className="benefit-icon" 
                  style={{
                    ...benefitIconStyle,
                    marginRight: isMobile ? 0 : 'var(--spacing-md)',
                    marginBottom: isMobile ? 'var(--spacing-xs)' : 0,
                    backgroundColor: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: 'white',
                    boxShadow: index % 2 === 0 
                      ? '0 5px 15px rgba(var(--primary-rgb), 0.3)' 
                      : '0 5px 15px rgba(var(--secondary-rgb), 0.3)',
                  }}
                >
                  <i className={`fas ${benefit.icon}`}></i>
                </div>
                <div className="benefit-text" style={{
                  ...benefitTextStyle,
                  maxWidth: isMobile ? '100%' : '85%',
                }}>
                  <h4 className="benefit-title" style={{
                    ...benefitTitleStyle,
                    fontSize: '1.2rem',
                    color: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                  }}>{benefit.title}</h4>
                  <p className="benefit-desc" style={{
                    ...benefitDescStyle,
                    lineHeight: 1.6
                  }}>{benefit.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.button
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: 'var(--spacing-sm) var(--spacing-xl)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 'var(--spacing-lg) auto 0',
              boxShadow: '0 5px 15px rgba(var(--primary-rgb), 0.3)',
              transition: 'all 0.3s ease',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ 
              backgroundColor: 'rgba(var(--primary-rgb), 0.9)',
              boxShadow: '0 8px 25px rgba(var(--primary-rgb), 0.4)',
              y: -2
            }}
            whileTap={{ y: 0 }}
          >
            Learn More About Our Services <i className="fas fa-arrow-right"></i>
          </motion.button>
        </div>
        <div 
          className="why-choose-image" 
          style={{
            ...whyChooseImageStyle,
            order: isTablet || isMobile ? 0 : 1,
            minHeight: isMobile ? '250px' : isTablet ? '350px' : '400px',
          }}
          ref={globeContainerRef}
        >
          <motion.div 
            className="globe-container" 
            style={{
              ...globeContainerStyle,
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <canvas ref={canvasRef} id="globe-canvas" style={globeCanvasStyle}></canvas>
            
            {/* Stats badge */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                backgroundColor: 'white',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '220px',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '5px' }}>
                Our Global Presence
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                50+ partner universities across 20+ countries
              </div>
            </motion.div>
            
            {/* Stats badge 2 */}
            <motion.div
              style={{
                position: 'absolute',
                top: '30px',
                left: '30px',
                backgroundColor: 'var(--secondary)',
                color: 'white',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: '0 10px 25px rgba(255, 157, 47, 0.3)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div style={{ 
                backgroundColor: 'white', 
                color: 'var(--secondary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>5000+</div>
                <div style={{ fontSize: '0.8rem' }}>Students Placed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Base styles
const whyChooseStyle: React.CSSProperties = {
  padding: 'var(--spacing-xxl) 0',
  backgroundColor: 'white',
  position: 'relative',
  overflow: 'hidden'
};

const whyChooseContainerStyle: React.CSSProperties = {
  display: 'grid',
  alignItems: 'center',
};

const whyChooseContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2
};

const benefitsListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  display: 'grid',
  gap: 'var(--spacing-md)',
};

const benefitItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-md)',
};

const benefitIconStyle: React.CSSProperties = {
  color: 'var(--success)',
  marginRight: 'var(--spacing-sm)',
  marginTop: '5px',
};

const benefitTextStyle: React.CSSProperties = {
  flex: 1,
};

const benefitTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 'var(--spacing-xs)',
};

const benefitDescStyle: React.CSSProperties = {
  color: 'var(--text-dark)',
};

const whyChooseImageStyle: React.CSSProperties = {
  position: 'relative',
  height: '100%',
  minHeight: '400px',
};

const globeContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const globeCanvasStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

export default WhyChooseSection;
