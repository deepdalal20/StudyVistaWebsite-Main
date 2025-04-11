import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    // Handle scroll for sticky header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Handle resize for responsive design
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--primary)',
              cursor: 'pointer'
            }}
          >
            <i className={`fas ${menuVisible ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <ul 
            className={`main-nav ${menuVisible ? 'active' : ''}`}
            style={{
              display: isMobile ? (menuVisible ? 'flex' : 'none') : 'flex',
              position: isMobile ? 'absolute' : 'static',
              top: isMobile ? '100%' : 'auto',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : 'auto',
              backgroundColor: isMobile ? 'white' : 'transparent',
              flexDirection: isMobile ? 'column' : 'row',
              padding: isMobile ? 'var(--spacing-md)' : 0,
              boxShadow: isMobile ? 'var(--shadow-md)' : 'none',
              gap: 'var(--spacing-md)',
              zIndex: 10
            }}
          >
            <li><Link href="/" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>Home</Link></li>
            <li><Link href="/countries" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>Countries</Link></li>
            <li><Link href="/about" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>About Us</Link></li>
            <li><Link href="/gallery" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>Gallery</Link></li>
            <li><Link href="/blog" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>Blogs</Link></li>
            <li><Link href="/inquiry" className="nav-link" style={{textDecoration: 'none', color: 'var(--text-dark)'}}>Inquiry</Link></li>
            <li>
              <Link href="/contact" className="nav-cta" style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                fontWeight: 500,
                transition: 'background-color var(--transition-fast)',
                textDecoration: 'none'
              }}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
