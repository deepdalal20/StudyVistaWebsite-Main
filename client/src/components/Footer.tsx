import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer" style={footerStyle}>
      <div className="container">
        <div className="footer-grid" style={footerGridStyle}>
          <div className="footer-about" style={footerAboutStyle}>
            <div className="footer-logo" style={footerLogoStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary" style={{ color: 'var(--secondary)' }}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <div className="logo-text" style={logoTextStyle}>
                Study<span style={{ color: 'var(--secondary)' }}>Vista</span>
              </div>
            </div>
            <p>StudyVista is a leading educational consultancy helping students achieve their dreams of studying abroad with personalized guidance and support.</p>
            <div className="social-links" style={socialLinksStyle}>
              <a href="#" className="social-link" style={socialLinkStyle} aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" style={socialLinkStyle} aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" style={socialLinkStyle} aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" style={socialLinkStyle} aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links-container">
            <h3 className="footer-title" style={footerTitleStyle}>Quick Links</h3>
            <ul className="footer-links" style={footerLinksStyle}>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Home</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#destinations" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Countries</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> About Us</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Gallery</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Blogs</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#inquiry-form" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Contact Now</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-links-container">
            <h3 className="footer-title" style={footerTitleStyle}>Countries</h3>
            <ul className="footer-links" style={footerLinksStyle}>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> USA</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> UK</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Australia</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Canada</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> Singapore</a>
              </li>
              <li className="footer-link" style={footerLinkItemStyle}>
                <a href="#" style={footerLinkStyle}><i className="fas fa-chevron-right" style={footerLinkIconStyle}></i> New Zealand</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-title" style={footerTitleStyle}>Contact Detail</h3>
            <ul className="contact-details" style={contactDetailsStyle}>
              <li className="contact-item" style={contactItemStyle}>
                <i className="fas fa-phone-alt contact-icon" style={contactIconStyle}></i>
                <span>+91 8426535326</span>
              </li>
              <li className="contact-item" style={contactItemStyle}>
                <i className="fas fa-envelope contact-icon" style={contactIconStyle}></i>
                <span>abc@gmail.com</span>
              </li>
              <li className="contact-item" style={contactItemStyle}>
                <i className="fas fa-map-marker-alt contact-icon" style={contactIconStyle}></i>
                <span>Yorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" style={footerBottomStyle}>
          <p>Copyright ©2025 On StudyVista, All Right Reserved<br/>Designed And Developed by InfiNitium</p>
        </div>
      </div>
    </footer>
  );
};

// Styles
const footerStyle: React.CSSProperties = {
  backgroundColor: 'var(--dark-bg)',
  color: 'var(--text-light)',
  padding: 'var(--spacing-xl) 0 var(--spacing-md)',
};

const footerGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-xl)',
  marginBottom: 'var(--spacing-xl)',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
  },
};

const footerAboutStyle: React.CSSProperties = {
  
};

const footerLogoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 'var(--spacing-md)',
};

const logoTextStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: 'white',
  marginLeft: 'var(--spacing-sm)',
};

const footerTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginBottom: 'var(--spacing-md)',
  color: 'white',
  position: 'relative',
  paddingBottom: 'var(--spacing-xs)',
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50px',
    height: '2px',
    backgroundColor: 'var(--secondary)',
  }
};

const footerLinksStyle: React.CSSProperties = {
  listStyle: 'none',
};

const footerLinkItemStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-sm)',
};

const footerLinkStyle: React.CSSProperties = {
  color: 'var(--text-light)',
  transition: 'color var(--transition-fast)',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: 'var(--secondary)',
  }
};

const footerLinkIconStyle: React.CSSProperties = {
  marginRight: 'var(--spacing-xs)',
  fontSize: '0.8rem',
};

const contactDetailsStyle: React.CSSProperties = {
  listStyle: 'none',
};

const contactItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-sm)',
};

const contactIconStyle: React.CSSProperties = {
  color: 'var(--secondary)',
  marginRight: 'var(--spacing-sm)',
  marginTop: '5px',
};

const socialLinksStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-sm)',
  marginTop: 'var(--spacing-md)',
};

const socialLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  borderRadius: '50%',
  transition: 'all var(--transition-fast)',
  '&:hover': {
    backgroundColor: 'var(--secondary)',
    transform: 'translateY(-5px)',
  }
};

const footerBottomStyle: React.CSSProperties = {
  textAlign: 'center',
  paddingTop: 'var(--spacing-md)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: '0.9rem',
};

export default Footer;
