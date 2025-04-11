import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} style={{
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-md)',
      transition: 'all var(--transition-medium)'
    }}>
      <div className="container nav-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-sm) 0'
      }}>
        <div className="logo" style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{
            color: 'var(--primary)',
            marginRight: 'var(--spacing-sm)'
          }}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <div className="logo-text" style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'var(--primary)'
          }}>
            Study<span style={{ color: 'var(--secondary)' }}>Vista</span>
          </div>
        </div>
        <nav>
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--primary)',
              cursor: 'pointer',
              '@media (max-width: 768px)': {
                display: 'block'
              }
            }}
          >
            <i className={`fas ${menuVisible ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <ul 
            className={`main-nav ${menuVisible ? 'active' : ''}`}
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              '@media (max-width: 768px)': {
                display: menuVisible ? 'flex' : 'none',
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                flexDirection: 'column',
                padding: 'var(--spacing-md)',
                boxShadow: 'var(--shadow-md)'
              }
            }}
          >
            <li><a href="#" className="nav-link" style={navLinkStyle}>Home</a></li>
            <li><a href="#destinations" className="nav-link" style={navLinkStyle}>Countries</a></li>
            <li><a href="#" className="nav-link" style={navLinkStyle}>About Us</a></li>
            <li><a href="#" className="nav-link" style={navLinkStyle}>Gallery</a></li>
            <li><a href="#" className="nav-link" style={navLinkStyle}>Blogs</a></li>
            <li><a href="#inquiry-form" className="nav-link" style={navLinkStyle}>Inquiry now</a></li>
            <li>
              <a href="#inquiry-form" className="nav-cta" style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: 500,
                transition: 'background-color var(--transition-fast)',
                ':hover': {
                  backgroundColor: 'var(--primary-light)',
                  color: 'white'
                }
              }}>Contact page</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Styles
const navLinkStyle = {
  position: 'relative',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  fontWeight: 500,
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '2px',
    backgroundColor: 'var(--accent)',
    transition: 'all var(--transition-medium)',
    transform: 'translateX(-50%)'
  },
  ':hover::after': {
    width: '100%'
  }
};

export default Header;
