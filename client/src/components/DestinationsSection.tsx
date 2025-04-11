import React, { useState } from 'react';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const DestinationsSection: React.FC = () => {
  const destinations: Destination[] = [
    {
      id: 1,
      name: 'USA',
      description: 'Home to world-class universities',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'UK',
      description: 'Excellence in education and research',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      name: 'Australia',
      description: 'Innovation and quality education',
      image: 'https://images.unsplash.com/photo-1513227344420-6c7c92a4a163?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      name: 'Canada',
      description: 'Diverse and welcoming learning environment',
      image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 5,
      name: 'New Zealand',
      description: 'Quality education in a beautiful setting',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 6,
      name: 'Singapore',
      description: 'Global hub for education and innovation',
      image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  // State for hover effect
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="destinations" id="destinations" style={destinationsStyle}>
      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2 data-aos="fade-up">Know Your Destination</h2>
        </div>
        <div className="destinations-intro" style={destinationsIntroStyle} data-aos="fade-up">
          <p>Begin an academic adventure in the world's most prestigious educational systems. Explore top destinations where knowledge meets opportunity.</p>
        </div>
        <div className="destinations-grid" style={destinationsGridStyle}>
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="destination-card" 
              style={{
                ...destinationCardStyle,
                transform: hoveredId === destination.id ? 'rotateY(5deg) scale(1.02)' : 'rotateY(0) scale(1)'
              }}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="destination-img" 
                style={{
                  ...destinationImgStyle,
                  transform: hoveredId === destination.id ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <div 
                className="destination-overlay" 
                style={{
                  ...destinationOverlayStyle,
                  transform: hoveredId === destination.id ? 'translateY(-10px)' : 'translateY(0)'
                }}
              >
                <h3 className="destination-title" style={destinationTitleStyle}>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more" style={viewMoreStyle} data-aos="fade-up">
          <a href="#" className="btn-view-more" style={btnViewMoreStyle}>
            View All Destinations
          </a>
        </div>
      </div>
    </section>
  );
};

// Styles
const destinationsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--spacing-md)',
};

const destinationsIntroStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto var(--spacing-xl)',
};

const destinationsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 'var(--spacing-lg)',
};

const destinationCardStyle: React.CSSProperties = {
  position: 'relative',
  borderRadius: 'var(--border-radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
  height: '300px',
  perspective: '1000px',
  transformStyle: 'preserve-3d',
  transition: 'transform var(--transition-medium)',
};

const destinationImgStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  transition: 'transform var(--transition-medium)',
};

const destinationOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
  color: 'white',
  padding: 'var(--spacing-md)',
  transform: 'translateY(0)',
  transition: 'transform var(--transition-medium)',
};

const destinationTitleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: 'var(--spacing-xs)',
};

const viewMoreStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: 'var(--spacing-xl)',
};

const btnViewMoreStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  transition: 'all var(--transition-fast)',
};

export default DestinationsSection;
