import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="hero" style={heroStyle}>
      <div className="container" style={containerStyle}>
        <div className="hero-content" style={heroContentStyle}>
          <h1 className="animate-fadeInUp">Best Consulting for International Education</h1>
          <p className="animate-fadeInUp delay-2" style={heroParagraphStyle}>
            Unlock your potential with our expert guidance. We help students achieve 
            their dreams of studying abroad with personalized counseling and support.
          </p>
          <a 
            href="#" 
            className="hero-cta animate-fadeInUp delay-3" 
            style={heroCTAStyle}
            onClick={(e) => {
              e.preventDefault();
              onGetStarted();
            }}
          >
            Get Started <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
          </a>
        </div>
        <div className="hero-image-container animate-fadeInRight" style={heroImageContainerStyle}>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Students studying abroad" 
            className="hero-image animate-float" 
            style={heroImageStyle}
          />
        </div>
      </div>
      <div className="hero-overlay" style={heroOverlayStyle}></div>
    </section>
  );
};

// Styles
const heroStyle: React.CSSProperties = {
  position: 'relative',
  color: 'white',
  padding: 'var(--spacing-xxl) 0',
  overflow: 'hidden',
  backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
};

const heroOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(30, 58, 138, 0.8)',
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
  maxWidth: '600px',
};

const heroParagraphStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  marginBottom: 'var(--spacing-lg)',
};

const heroCTAStyle: React.CSSProperties = {
  display: 'inline-block',
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
  '@media (max-width: 768px)': {
    display: 'none',
  },
};

const heroImageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-lg)',
};

export default HeroSection;
