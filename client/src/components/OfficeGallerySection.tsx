import React, { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

const OfficeGallerySection: React.FC = () => {
  const galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Office interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Office reception'
    },
    {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Counseling room'
    },
    {
      src: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Meeting room'
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Waiting area'
    },
    {
      src: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Study resource center'
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="office-gallery" style={officeGalleryStyle}>
      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2 data-aos="fade-up">Our Offices</h2>
        </div>
        <div className="gallery-grid" style={galleryGridStyle}>
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item" 
              style={galleryItemStyle}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image" 
                style={{
                  ...galleryImageStyle,
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <div 
                className="gallery-overlay" 
                style={{
                  ...galleryOverlayStyle,
                  opacity: hoveredIndex === index ? 1 : 0
                }}
              >
                <div className="gallery-icon" style={galleryIconStyle}>
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Styles
const officeGalleryStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--spacing-xl)',
};

const galleryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: 'var(--spacing-md)',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
};

const galleryItemStyle: React.CSSProperties = {
  borderRadius: 'var(--border-radius-md)',
  overflow: 'hidden',
  height: '200px',
  position: 'relative',
  cursor: 'pointer',
};

const galleryImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform var(--transition-medium)',
};

const galleryOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(30, 58, 138, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity var(--transition-medium)',
};

const galleryIconStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '2rem',
};

export default OfficeGallerySection;
