import React, { useState } from 'react';
import styles from './OfficeGallerySection.module.css';

interface GalleryImage {
  src: string;
  alt: string;
}

const OfficeGallerySection: React.FC = () => {
  const galleryImages: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Office interior',
    },
    {
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Office reception',
    },
    {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Counseling room',
    },
    {
      src: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Meeting room',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Waiting area',
    },
    {
      src: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Study resource center',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.officeGallery}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2 data-aos="fade-up">Our Offices</h2>
        </div>
        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={styles.galleryItem}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.galleryImage}
                style={{
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <div
                className={styles.galleryOverlay}
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              >
                <div className={styles.galleryIcon}>
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

export default OfficeGallerySection;
