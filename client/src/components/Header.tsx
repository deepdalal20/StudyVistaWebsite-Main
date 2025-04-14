import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
      <div className="logo">
  <Link to="/">
    <img 
      src="/mainlogo.png" 
      alt="StudyVista Logo" 
      width={80} 
      height={40} 
    />
  </Link>
</div>
        <nav>
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${menuVisible ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          {/* Changed the active class placement here */}
          <ul className={`main-nav ${menuVisible ? 'active' : ''}`}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/countries" onClick={closeMenu}>Countries</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link href="/gallery" onClick={closeMenu}>Gallery</Link></li>
            <li><Link href="/blog" onClick={closeMenu}>Blogs</Link></li>
            <li><Link href="/inquiry" onClick={closeMenu}>Inquiry</Link></li>
            <li>
              <Link href="/contact" className="nav-cta" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <style>{`
        .header {
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .scrolled {
          box-shadow: 0 2px 15px rgba(0,0,0,0.15);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo img {
          height: 75px;
          width: auto;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--primary);
          cursor: pointer;
          z-index: 1001;
        }

        .main-nav {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .main-nav a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .main-nav a:hover {
          color: var(--primary);
        }

        .nav-cta {
          background: var(--primary);
          color: white !important;
          padding: 0.5rem 1.5rem;
          border-radius: 5px;
          transition: background 0.2s ease;
        }

        .nav-cta:hover {
          background: #f08422;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .main-nav {
            position: fixed;
            top: 70px;
            right: -100%;
            flex-direction: column;
            background: white;
            width: 100%;
            max-width: 300px;
            height: calc(100vh - 70px);
            padding: 2rem;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
            gap: 1.5rem;
            align-items: flex-start;
            z-index: 1000; /* Added z-index */
          }

          .main-nav.active {
            right: 0;
          }

          .nav-container {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .main-nav {
            max-width: 100%;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;