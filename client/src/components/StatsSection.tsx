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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Window width:', window.innerWidth, 'isMobile:', mobile); // Debug log
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
      color: 'rgb(59, 130, 246)', // Blue
    },
    {
      icon: 'fa-university',
      number: 500,
      suffix: '+',
      label: 'Partner Universities',
      color: 'rgb(245, 158, 11)', // Amber
    },
    {
      icon: 'fa-globe-americas',
      number: 15,
      suffix: '+',
      label: 'Years of Experience',
      color: 'rgb(16, 185, 129)', // Green
    },
    {
      icon: 'fa-check-circle',
      number: 98,
      suffix: '%',
      label: 'Success Rate',
      color: 'rgb(236, 72, 153)', // Pink
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      className="stats"
      style={{
        ...statsStyle,
        padding: isMobile ? '32px 0' : '80px 0', // Fallback values
        position: 'relative',
      }}
    >
      <style>
        {
          `
          /* StatsSection.css */
.stats-grid {
  display: grid !important;
  width: 100%;
  text-align: center;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

@media (min-width: 769px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 24px !important;
  }
}

.stat-item {
  width: 100%;
  box-sizing: border-box;
}
          `
        }
      </style>
      <div
        className="stats-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 100) + 100}, ${
                Math.floor(Math.random() * 100) + 100
              }, ${Math.floor(Math.random() * 155) + 100}, 0.1)`,
              borderRadius: '50%',
              zIndex: -1,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.1, 1],
              rotate: [0, Math.random() * 180, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div
        className="container"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 8px' : '0 16px', // Fallback values
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '24px' : '40px', // Fallback values
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '2.5rem',
              color: 'var(--primary, #333)', // Fallback color
              marginBottom: '8px',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: '8px',
            }}
          >
            Our Impact <span style={{ color: 'var(--secondary, #007bff)' }}>By Numbers</span>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'var(--secondary, #007bff)',
                borderRadius: '2px',
              }}
            ></div>
          </h2>
          <p
            style={{
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              color: 'var(--text-dark, #555)',
              maxWidth: isMobile ? '90%' : '700px',
              margin: '0 auto',
              opacity: 0.8,
              lineHeight: 1.6,
            }}
          >
            We take pride in our achievements and the impact we've made on thousands of students' lives.
          </p>
        </motion.div>

        <motion.div
          className="stats-grid"
          style={{
            ...statsGridStyle,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '16px' : '24px', // Fallback values
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
      </div>
    </section>
  );
};

interface StatItemProps extends StatItem {
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, suffix, label, color }) => {
  const { count, ref } = useAnimatedCounter(number);
  const [isHovered, setIsHovered] = useState(false);

  // Compute a lighter background color for non-hovered state
  const lightColor = `${color.replace('rgb', 'rgba').replace(')', ', 0.1)')}`;

  return (
    <motion.div
      className="stat-item"
      style={{
        ...statItemStyle,
        transform: 'translateZ(0)',
        borderRadius: 'var(--border-radius-lg, 12px)', // Fallback
        backgroundColor: 'white',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        padding: '16px', // Fallback
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -10 : 0,
        boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.05)',
        borderColor: isHovered ? color : 'rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="stat-icon"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.05 : 1,
          backgroundColor: isHovered ? color : lightColor,
          color: isHovered ? 'white' : color,
          transition: { duration: 0.5 },
        }}
        style={{
          ...statIconStyle,
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 8px', // Fallback
          border: `2px dashed ${lightColor}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <i
          className={`fas ${icon}`}
          style={{
            fontSize: '1.8rem',
            color: isHovered ? 'white' : color,
            transition: 'color 0.3s ease',
          }}
        />
      </motion.div>

      <motion.div
        className="stat-number"
        style={{
          ...statNumberStyle,
          color: color,
          fontSize: '2.5rem',
          fontWeight: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
        ref={ref}
      >
        <span>{count}</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 600, marginLeft: '2px' }}>{suffix}</span>
      </motion.div>

      <motion.div
        className="stat-label"
        style={{
          ...statLabelStyle,
          fontSize: '1rem',
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

// Shared styles
const statsStyle: React.CSSProperties = {
  padding: '80px 0',
  backgroundColor: 'var(--light-bg, #f9fafb)', // Fallback
  position: 'relative',
  overflow: 'hidden',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid !important', // Force grid display
  gap: '24px', // Fallback
  textAlign: 'center',
  width: '100%',
};

const statItemStyle: React.CSSProperties = {
  padding: '16px', // Fallback
  transition: 'all 0.3s ease', // Fallback
  width: '100%',
  boxSizing: 'border-box',
};

const statIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '8px', // Fallback
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '4px', // Fallback
};

const statLabelStyle: React.CSSProperties = {
  fontWeight: 500,
  color: 'var(--text-dark, #555)',
};

export default StatsSection;