import React from 'react';

interface ParallaxCTAProps {
  onGetConsultation: () => void;
}

const ParallaxCTA: React.FC<ParallaxCTAProps> = ({ onGetConsultation }) => {
  return (
    <section className="parallax-bg" style={parallaxBgStyle}>
      <div className="parallax-overlay" style={parallaxOverlayStyle}></div>
      <div className="container">
        <div className="parallax-content" style={parallaxContentStyle} data-aos="fade-up">
          <h2>Start Your International Education Journey Today</h2>
          <p>Take the first step towards a brighter future. Our expert counselors are ready to guide you through the entire process.</p>
          <a 
            href="#inquiry-form" 
            className="hero-cta" 
            style={heroCTAStyle}
            onClick={(e) => {
              e.preventDefault();
              onGetConsultation();
            }}
          >
            Get Free Consultation <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
          </a>
        </div>
      </div>
    </section>
  );
};

// Styles
const parallaxBgStyle: React.CSSProperties = {
  position: 'relative',
  padding: 'var(--spacing-xxl) 0',
  backgroundImage: 'url("https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
};

const parallaxOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(30, 58, 138, 0.8)',
};

const parallaxContentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  color: 'white',
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
};

const heroCTAStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--secondary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  fontWeight: 600,
  transition: 'all var(--transition-fast)',
  '&:hover': {
    backgroundColor: 'var(--secondary-light)',
    transform: 'translateY(-3px)',
    boxShadow: 'var(--shadow-lg)',
    color: 'white',
  }
};

export default ParallaxCTA;
