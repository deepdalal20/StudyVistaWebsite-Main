import React, { useEffect, useRef } from 'react';
import { useGlobe } from '../hooks/useGlobe';

interface BenefitItem {
  title: string;
  description: string;
}

const WhyChooseSection: React.FC = () => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize the 3D globe
  useGlobe(canvasRef, globeContainerRef);

  const benefits: BenefitItem[] = [
    {
      title: 'Personalized Approach',
      description: 'We create a customized plan for each student based on their academic background, career goals, and personal preferences.'
    },
    {
      title: 'Comprehensive Support',
      description: 'From university selection to accommodation arrangements, we provide end-to-end support throughout your journey.'
    },
    {
      title: 'High Success Rate',
      description: 'Our proven track record shows a 90% success rate in visa approvals and university admissions for our students.'
    },
    {
      title: 'Post-Arrival Support',
      description: 'Our relationship doesn\'t end with your departure; we provide continuous support even after you reach your destination.'
    }
  ];

  return (
    <section className="why-choose" style={whyChooseStyle}>
      <div className="container why-choose-container" style={whyChooseContainerStyle}>
        <div className="why-choose-content" style={whyChooseContentStyle} data-aos="fade-right">
          <h2 style={{color: 'var(--primary)', marginBottom: 'var(--spacing-lg)'}}>
            Why Choose StudyVista?
          </h2>
          <ul className="benefits-list" style={benefitsListStyle}>
            {benefits.map((benefit, index) => (
              <li 
                key={index} 
                className="benefit-item" 
                style={benefitItemStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <span className="benefit-icon" style={benefitIconStyle}>
                  <i className="fas fa-check-circle"></i>
                </span>
                <div className="benefit-text" style={benefitTextStyle}>
                  <h4 className="benefit-title" style={benefitTitleStyle}>{benefit.title}</h4>
                  <p className="benefit-desc" style={benefitDescStyle}>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div 
          className="why-choose-image" 
          style={whyChooseImageStyle} 
          ref={globeContainerRef}
          data-aos="fade-left"
        >
          <div className="globe-container" style={globeContainerStyle}>
            <canvas ref={canvasRef} id="globe-canvas" style={globeCanvasStyle}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

// Styles
const whyChooseStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const whyChooseContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'var(--spacing-xl)',
  alignItems: 'center',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-lg)',
  },
};

const whyChooseContentStyle: React.CSSProperties = {
  '@media (max-width: 1024px)': {
    order: 1,
  },
};

const benefitsListStyle: React.CSSProperties = {
  listStyle: 'none',
};

const benefitItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-md)',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
};

const benefitIconStyle: React.CSSProperties = {
  color: 'var(--success)',
  fontSize: '1.2rem',
  marginRight: 'var(--spacing-sm)',
  marginTop: '5px',
  '@media (max-width: 768px)': {
    marginRight: 0,
    marginBottom: 'var(--spacing-xs)',
  },
};

const benefitTextStyle: React.CSSProperties = {
  flex: 1,
};

const benefitTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 'var(--spacing-xs)',
};

const benefitDescStyle: React.CSSProperties = {
  color: 'var(--dark-bg)',
};

const whyChooseImageStyle: React.CSSProperties = {
  position: 'relative',
  height: '100%',
  minHeight: '400px',
  '@media (max-width: 1024px)': {
    order: -1,
    minHeight: '300px',
  },
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
