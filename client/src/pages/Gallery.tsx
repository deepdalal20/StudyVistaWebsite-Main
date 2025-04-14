import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import BackToTop from '../components/BackToTop';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
}

const Gallery = () => {
  useEffect(() => {
    document.title = 'Gallery - StudyVista';
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterImages = (category: string) => {
    setFilter(category);
  };

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === filter);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className="gallery-page">
      {/* Embedded CSS for hover animations */}
      <style>
        {`
          div.gallery-item {
      transform-style: preserve-3d;
    }
    div.gallery-item:hover {
      transform: perspective(1000px) translateY(-10px) translateZ(20px) rotateX(2deg) !important;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
    }
    div.gallery-item:hover .gallery-image img {
      transform: scale(1.05) !important;
    }
    div.gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
        `}
      </style>

      <Header />
      <PageHeader
        title="Gallery"
        subtitle="Explore our campus, events, and student life through captivating imagery"
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />

      <section className="gallery-section" style={gallerySectionStyle}>
        <div className="container">
          <div className="gallery-intro" style={galleryIntroStyle} data-aos="fade-up">
            <h2 style={sectionTitleStyle}>Visual Journey</h2>
            <p>
              Welcome to our gallery showcasing StudyVista's events, campus tours, student success stories, and glimpses of life at top universities worldwide. These images capture the essence of international education and the vibrant experiences that await our students.
            </p>
          </div>

          <div className="gallery-filter" style={galleryFilterStyle} data-aos="fade-up">
            <button
              style={{
                ...filterButtonStyle,
                backgroundColor: filter === 'all' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: filter === 'all' ? 'white' : 'var(--text-dark, #333)',
              }}
              onClick={() => filterImages('all')}
            >
              All
            </button>
            <button
              style={{
                ...filterButtonStyle,
                backgroundColor: filter === 'events' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: filter === 'events' ? 'white' : 'var(--text-dark, #333)',
              }}
              onClick={() => filterImages('events')}
            >
              Events
            </button>
            <button
              style={{
                ...filterButtonStyle,
                backgroundColor: filter === 'campus' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: filter === 'campus' ? 'white' : 'var(--text-dark, #333)',
              }}
              onClick={() => filterImages('campus')}
            >
              Campus Tours
            </button>
            <button
              style={{
                ...filterButtonStyle,
                backgroundColor: filter === 'students' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: filter === 'students' ? 'white' : 'var(--text-dark, #333)',
              }}
              onClick={() => filterImages('students')}
            >
              Student Life
            </button>
            <button
              style={{
                ...filterButtonStyle,
                backgroundColor: filter === 'graduations' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: filter === 'graduations' ? 'white' : 'var(--text-dark, #333)',
              }}
              onClick={() => filterImages('graduations')}
            >
              Graduations
            </button>
          </div>

          <div className="gallery-grid" style={galleryGridStyle}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                style={galleryItemStyle}
                data-aos="fade-up"
                data-aos-delay={index % 6 * 100}
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image" style={galleryImageStyle}>
                  <img
                    src={image.image}
                    alt={image.title}
                    style={imageStyle}
                  />
                  <div className="gallery-overlay" style={galleryOverlayStyle}>
                    <div className="overlay-content" style={overlayContentStyle}>
                      <h3 style={imageTitleStyle}>{image.title}</h3>
                      <span style={categoryBadgeStyle}>{image.category}</span>
                      <div style={zoomIconStyle}>
                        <i className="fas fa-search-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="lightbox" style={lightboxStyle} onClick={closeLightbox}>
              <div className="lightbox-content" style={lightboxContentStyle} onClick={e => e.stopPropagation()}>
                <button className="close-button" style={closeButtonStyle} onClick={closeLightbox}>
                  <i className="fas fa-times"></i>
                </button>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  style={lightboxImageStyle}
                />
                <div style={lightboxCaptionStyle}>
                  <h3>{selectedImage.title}</h3>
                  <span style={{ ...categoryBadgeStyle, display: 'inline-block', marginTop: 'var(--spacing-xs, 8px)' }}>
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="gallery-cta" style={galleryCtaStyle}>
        <div className="container">
          <div className="cta-content" style={ctaContentStyle} data-aos="fade-up">
            <h2>Want to Visit Our Campuses?</h2>
            <p>Schedule a campus tour or virtual visit to explore your potential study destinations.</p>
            <a href="/contact" style={ctaButtonStyle}>
              Contact Us <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

// Data
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'International Education Fair 2023',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Harvard University Campus Visit',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Student Success Stories Panel',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    title: 'Study Group Session at University Library',
    category: 'students',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 5,
    title: 'Oxford University Graduation Ceremony',
    category: 'graduations',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    title: 'University of Toronto Campus Tour',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 7,
    title: 'Pre-Departure Orientation Workshop',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 8,
    title: 'International Student Welcome Day',
    category: 'students',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
  },
  {
    id: 9,
    title: 'University of Melbourne Campus Visit',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 10,
    title: 'MIT Graduation Day',
    category: 'graduations',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 11,
    title: 'Student Cultural Exchange Program',
    category: 'students',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 12,
    title: 'University of British Columbia Tour',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1583373834259-46cc92173cb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 13,
    title: 'Education Seminar with Industry Experts',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 14,
    title: 'Student Accommodation Tour',
    category: 'students',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 15,
    title: 'Cambridge University Graduation',
    category: 'graduations',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

// Styles
const gallerySectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl, 60px) 0',
  backgroundColor: 'white',
};

const galleryIntroStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto var(--spacing-xl, 60px)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary, #1a73e8)',
  marginBottom: 'var(--spacing-md, 20px)',
  position: 'relative',
  paddingBottom: 'var(--spacing-sm, 10px)',
};

const galleryFilterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 'var(--spacing-xs, 8px) var(--spacing-sm, 16px)',
  marginBottom: 'var(--spacing-xl, 60px)',
};

const filterButtonStyle: React.CSSProperties = {
  padding: 'var(--spacing-xs, 8px) var(--spacing-md, 20px)',
  borderRadius: 'var(--border-radius-md, 8px)',
  border: '1px solid var(--primary, #1a73e8)',
  backgroundColor: 'transparent',
  color: 'var(--primary, #1a73e8)',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const galleryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
  gap: 'var(--spacing-md, 20px)',
};

const galleryItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: 'var(--border-radius-md, 8px)',
  boxShadow: 'var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  transform: 'perspective(1000px) translateZ(0)',
  transformStyle: 'preserve-3d', // Ensure 3D transforms are preserved
};
const galleryImageStyle: React.CSSProperties = {
  position: 'relative',
  height: '250px',
  overflow: 'hidden',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const galleryOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
};

const overlayContentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'white',
  padding: 'var(--spacing-md, 20px)',
};

const imageTitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  marginBottom: 'var(--spacing-xs, 8px)',
};

const categoryBadgeStyle: React.CSSProperties = {
  backgroundColor: 'var(--secondary, #34c759)',
  color: 'white',
  padding: '3px 10px',
  borderRadius: 'var(--border-radius-sm, 4px)',
  fontSize: '0.8rem',
  textTransform: 'capitalize',
};

const zoomIconStyle: React.CSSProperties = {
  marginTop: 'var(--spacing-sm, 16px)',
  fontSize: '1.5rem',
};

const lightboxStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 'var(--spacing-lg, 40px)',
};

const lightboxContentStyle: React.CSSProperties = {
  position: 'relative',
  maxWidth: '90%',
  maxHeight: '90%',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-40px',
  right: 0,
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
  zIndex: 1001,
};

const lightboxImageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '75vh',
  borderRadius: 'var(--border-radius-md, 8px)',
  boxShadow: 'var(--shadow-lg, 0 10px 15px rgba(0,0,0,0.2))',
};

const lightboxCaptionStyle: React.CSSProperties = {
  color: 'white',
  textAlign: 'center',
  marginTop: 'var(--spacing-md, 20px)',
};

const galleryCtaStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl, 60px) 0',
  backgroundColor: 'var(--primary, #1a73e8)',
  color: 'white',
};

const ctaContentStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
};

const ctaButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--secondary, #34c759)',
  color: 'white',
  padding: 'var(--spacing-sm, 16px) var(--spacing-lg, 40px)',
  borderRadius: 'var(--border-radius-md, 8px)',
  fontWeight: 600,
  marginTop: 'var(--spacing-md, 20px)',
  transition: 'all 0.2s ease',
};

export default Gallery;