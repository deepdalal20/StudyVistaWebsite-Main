import React, { useState } from 'react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const services: Service[] = [
    {
      icon: 'fa-search',
      title: 'Career Counseling',
      description: 'Our expert counselors help you identify the right career path based on your interests, skills, and future goals.'
    },
    {
      icon: 'fa-university',
      title: 'University Selection',
      description: 'We help you choose the best universities that match your academic profile, budget, and career aspirations.'
    },
    {
      icon: 'fa-file-alt',
      title: 'Application Assistance',
      description: 'Get expert guidance on preparing and submitting winning applications to maximize your chances of admission.'
    },
    {
      icon: 'fa-passport',
      title: 'Visa Guidance',
      description: 'Navigate the complex visa application process with our step-by-step assistance and preparation for visa interviews.'
    },
    {
      icon: 'fa-plane-departure',
      title: 'Pre-Departure Briefing',
      description: 'Get valuable information and tips to prepare you for life abroad, including cultural adjustment and practical matters.'
    },
    {
      icon: 'fa-hands-helping',
      title: 'Post-Arrival Support',
      description: 'Our support continues even after you arrive at your destination, helping you settle into your new environment.'
    }
  ];

  return (
    <section className="services" style={servicesStyle} id='services'>
      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2 data-aos="fade-up">Our Services</h2>
        </div>
        <div className="services-intro" style={servicesIntroStyle} data-aos="fade-up">
          <p>We are with you at every step of your journey to studying abroad.</p>
        </div>
        <div className="services-grid" style={servicesGridStyle}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card" 
              style={{
                ...serviceCardStyle,
                transform: hoveredIndex === index 
                  ? 'translateY(-10px)' // Moves the box up on hover
                  : 'translateY(0)', // No move by default
                boxShadow: hoveredIndex === index 
                  ? '0 20px 30px rgba(0,0,0,0.2)' // More shadow for lifted effect
                  : 'var(--shadow-md)', // Default shadow
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div 
                className="service-icon" 
                style={{
                  ...serviceIconStyle,
                  backgroundColor: hoveredIndex === index ? 'var(--secondary)' : 'var(--primary)',
                }}
              >
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="service-title" style={serviceTitleStyle}>{service.title}</h3>
              <p className="service-desc" style={serviceDescStyle}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Styles
const servicesStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--spacing-md)',
};

const servicesIntroStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto var(--spacing-xl)',
};

const servicesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--spacing-lg)',
  perspective: '1000px', // Add perspective for 3D effect
};

const serviceCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  cursor: 'pointer',
  willChange: 'transform',
};

const serviceIconStyle: React.CSSProperties = {
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
  transition: 'all var(--transition-medium)',
};

const serviceTitleStyle: React.CSSProperties = {
  fontSize: '1.3rem',
  marginBottom: 'var(--spacing-sm)',
  color: 'var(--primary)',
};

const serviceDescStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
  flexGrow: 1,
};

export default ServicesSection;
