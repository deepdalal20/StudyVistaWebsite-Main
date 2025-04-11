import React from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

interface StatItem {
  icon: string;
  number: number;
  suffix: string;
  label: string;
}

const StatsSection: React.FC = () => {
  const stats: StatItem[] = [
    {
      icon: 'fa-user-graduate',
      number: 15000,
      suffix: '+',
      label: 'Students Placed'
    },
    {
      icon: 'fa-university',
      number: 500,
      suffix: '+',
      label: 'Partner Universities'
    },
    {
      icon: 'fa-globe-americas',
      number: 15,
      suffix: '+',
      label: 'Years of Experience'
    },
    {
      icon: 'fa-check-circle',
      number: 90,
      suffix: '%',
      label: 'Success Rate'
    }
  ];

  return (
    <section className="stats" style={statsStyle}>
      <div className="container">
        <div className="stats-grid" style={statsGridStyle}>
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              icon={stat.icon} 
              number={stat.number} 
              suffix={stat.suffix} 
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps extends StatItem {
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, suffix, label, delay }) => {
  const { count, ref } = useAnimatedCounter(number);
  
  return (
    <div 
      className="stat-item" 
      style={statItemStyle}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="stat-icon" style={statIconStyle}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-number" style={statNumberStyle} ref={ref}>
        {count}{suffix}
      </div>
      <div className="stat-label" style={statLabelStyle}>{label}</div>
    </div>
  );
};

// Styles
const statsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-lg)',
  textAlign: 'center',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr 1fr',
  },
};

const statItemStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
  transition: 'transform var(--transition-medium)',
};

const statIconStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-sm)',
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: 'var(--secondary)',
  marginBottom: 'var(--spacing-xs)',
};

const statLabelStyle: React.CSSProperties = {
  fontWeight: 500,
  color: 'var(--text-dark)',
};

export default StatsSection;
