import React, { useState, useEffect } from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { motion } from 'framer-motion';

interface StatItem {
  icon: string;
  number: number;
  suffix: string;
  label: string;
  color: string;
}

const StatsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
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

  const stats: StatItem[] = [
    {
      icon: 'fa-user-graduate',
      number: 15000,
      suffix: '+',
      label: 'Students Placed',
      color: 'rgb(59, 130, 246)' // Blue
    },
    {
      icon: 'fa-university',
      number: 500,
      suffix: '+',
      label: 'Partner Universities',
      color: 'rgb(245, 158, 11)' // Amber
    },
    {
      icon: 'fa-globe-americas',
      number: 15,
      suffix: '+',
      label: 'Years of Experience',
      color: 'rgb(16, 185, 129)' // Green
    },
    {
      icon: 'fa-check-circle',
      number: 98,
      suffix: '%',
      label: 'Success Rate',
      color: 'rgb(236, 72, 153)' // Pink
    }
  ];
  
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  // Animation variants for individual stat items
  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="stats" style={{
      ...statsStyle,
      padding: isMobile ? 'var(--spacing-lg) 0' : 'var(--spacing-xxl) 0',
      position: 'relative',
    }}>
      {/* Decorative elements */}
      <div className="stats-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, 0.1)`,
              borderRadius: '50%',
              zIndex: -1
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.1, 1],
              rotate: [0, Math.random() * 180, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 var(--spacing-md)',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-xl)',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            color: 'var(--primary)',
            marginBottom: 'var(--spacing-sm)',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: 'var(--spacing-sm)'
          }}>
            Our Impact <span style={{ color: 'var(--secondary)' }}>By Numbers</span>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'var(--secondary)',
              borderRadius: '2px'
            }}></div>
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            color: 'var(--text-dark)',
            maxWidth: '700px',
            margin: '0 auto',
            opacity: 0.8,
            lineHeight: 1.6
          }}>
            We take pride in our achievements and the impact we've made on thousands of students' lives.
          </p>
        </motion.div>
        
        <motion.div 
          className="stats-grid" 
          style={{
            ...statsGridStyle,
            gridTemplateColumns: isMobile 
              ? 'repeat(2, 1fr)' 
              : isTablet 
                ? 'repeat(2, 1fr)' 
                : 'repeat(4, 1fr)',
            gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              icon={stat.icon} 
              number={stat.number} 
              suffix={stat.suffix} 
              label={stat.label}
              color={stat.color}
              delay={index * 100}
            />
          ))}
        </motion.div>
        
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'var(--spacing-xl)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            style={{
              backgroundColor: 'white',
              color: 'var(--primary)',
              border: '2px solid var(--primary)',
              padding: 'var(--spacing-sm) var(--spacing-xl)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ 
              backgroundColor: 'var(--primary)',
              color: 'white',
              boxShadow: '0 8px 15px rgba(var(--primary-rgb), 0.2)',
              y: -2
            }}
            whileTap={{ y: 0 }}
          >
            Read Our Success Stories <i className="fas fa-long-arrow-alt-right"></i>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

interface StatItemProps extends StatItem {
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, suffix, label, color, delay }) => {
  const { count, ref } = useAnimatedCounter(number);
  
  return (
    <motion.div 
      className="stat-item" 
      style={{
        ...statItemStyle,
        transform: 'translateZ(0)',
        borderRadius: 'var(--border-radius-lg)',
        backgroundColor: 'white',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        padding: 'var(--spacing-lg)'
      }}
      variants={itemVariants}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        borderColor: color,
        borderWidth: '1px',
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="stat-icon" 
        style={{
          ...statIconStyle,
          backgroundColor: `${color}10`,
          color: color,
          width: '80px',
          height: '80px',
          borderRadius: '50%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--spacing-md)',
          border: `2px dashed ${color}50`,
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{ 
          rotate: 360,
          borderStyle: 'solid',
          scale: 1.05,
          backgroundColor: color,
          color: 'white',
          transition: { duration: 0.5 }
        }}
      >
        <i className={`fas ${icon}`} style={{ fontSize: '2rem' }}></i>
      </motion.div>
      
      <motion.div 
        className="stat-number" 
        style={{
          ...statNumberStyle,
          color: color,
          fontSize: '2.8rem',
          fontWeight: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline'
        }} 
        ref={ref}
      >
        <span>{count}</span>
        <span style={{ fontSize: '1.8rem', fontWeight: 600, marginLeft: '2px' }}>{suffix}</span>
      </motion.div>
      
      <motion.div 
        className="stat-label" 
        style={{
          ...statLabelStyle,
          fontSize: '1.1rem',
          fontWeight: 600,
          opacity: 0.8
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

// Animation variants for individual items
const itemVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Styles
const statsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xxl) 0',
  backgroundColor: 'var(--light-bg)',
  position: 'relative',
  overflow: 'hidden'
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-lg)',
  textAlign: 'center',
};

const statItemStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
  transition: 'all var(--transition-medium)',
};

const statIconStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  marginBottom: 'var(--spacing-sm)',
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: 'var(--spacing-xs)',
};

const statLabelStyle: React.CSSProperties = {
  fontWeight: 500,
  color: 'var(--text-dark)',
};

export default StatsSection;
