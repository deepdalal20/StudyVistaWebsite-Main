import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: 'fa-graduation-cap',
      title: 'Expert Counseling',
      description: 'Our experienced counselors provide personalized guidance to help you choose the right university and course.'
    },
    {
      icon: 'fa-file-alt',
      title: 'Visa Assistance',
      description: 'We offer comprehensive visa support to ensure a smooth application process with high success rates.'
    },
    {
      icon: 'fa-university',
      title: 'University Admissions',
      description: 'Get into your dream university with our tailored admission guidance and application support.'
    },
    {
      icon: 'fa-home',
      title: 'Accommodation Support',
      description: 'We help you find the perfect place to stay that fits your preferences and budget.'
    }
  ];

  return (
    <section className="features" style={featuresStyle}>
      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2 data-aos="fade-up">Why Students Choose Us</h2>
        </div>
        <div className="features-grid" style={featuresGridStyle}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              style={featureCardStyle}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-icon" style={featureIconStyle}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="feature-title" style={featureTitleStyle}>
                {feature.title}
              </h3>
              <p className="feature-desc" style={featureDescStyle}>
                {feature.description}
              </p>
              <a href="#" className="feature-link" style={featureLinkStyle}>
                Learn More <i className="fas fa-chevron-right" style={{ marginLeft: '5px', transition: 'transform var(--transition-fast)' }}></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Styles
const featuresStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--spacing-xl)',
  position: 'relative',
};

const featuresGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--spacing-lg)',
};

const featureCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
  transition: 'transform var(--transition-medium), box-shadow var(--transition-medium)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translateY(0)',
};

const featureIconStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  marginBottom: 'var(--spacing-md)',
  transition: 'transform var(--transition-medium), background-color var(--transition-medium)',
};

const featureTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginBottom: 'var(--spacing-sm)',
};

const featureDescStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
  flexGrow: 1,
};

const featureLinkStyle: React.CSSProperties = {
  color: 'var(--secondary)',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
};

export default FeaturesSection;
