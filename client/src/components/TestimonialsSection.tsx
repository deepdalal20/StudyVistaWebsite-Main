import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  image: string;
  quote: string;
  name: string;
  position: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      quote: 'StudyVista made my dream of studying abroad a reality. Their counselors were incredibly supportive and guided me through every step of the process. I\'m now studying at my dream university in Canada!',
      name: 'Sarah Johnson',
      position: 'MBA Student, University of Toronto'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      quote: 'I was confused about which country to choose for my higher studies. StudyVista helped me analyze my options and choose the best fit. Their visa guidance was exceptional, and I got my visa approved in the first attempt!',
      name: 'Michael Chen',
      position: 'Computer Science, MIT'
    },
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      quote: 'The team at StudyVista is simply amazing! They not only helped me with my applications and visa but also provided valuable pre-departure guidance that made my transition to a new country smooth and stress-free.',
      name: 'Priya Sharma',
      position: 'Engineering, University of Melbourne'
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500); // Match this with your CSS transition time
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % testimonials.length);
  }, [current, testimonials.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + testimonials.length) % testimonials.length);
  }, [current, testimonials.length, goToSlide]);

  // Auto advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="testimonials" style={testimonialsStyle} data-aos="fade-up">
      <div className="container">
        <div className="section-title" style={sectionTitleStyle}>
          <h2>Student Testimonials</h2>
        </div>
        <div className="testimonial-slider" style={testimonialSliderStyle}>
          <div 
            className="testimonial-track" 
            style={{
              ...testimonialTrackStyle,
              transform: `translateX(-${current * 100}%)`
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide" style={testimonialSlideStyle}>
                <div className="testimonial-card" style={testimonialCardStyle}>
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name} testimonial`} 
                    className="testimonial-image" 
                    style={testimonialImageStyle}
                  />
                  <p className="testimonial-quote" style={testimonialQuoteStyle}>
                    {testimonial.quote}
                  </p>
                  <h4 className="testimonial-name" style={testimonialNameStyle}>{testimonial.name}</h4>
                  <p className="testimonial-info" style={testimonialInfoStyle}>{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="testimonial-arrow testimonial-prev" 
            style={{...testimonialArrowStyle, left: '10px'}}
            onClick={prevSlide}
          >
            <i className="fas fa-chevron-left"></i>
          </div>
          
          <div 
            className="testimonial-arrow testimonial-next" 
            style={{...testimonialArrowStyle, right: '10px'}}
            onClick={nextSlide}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="testimonial-nav" style={testimonialNavStyle}>
            {testimonials.map((_, index) => (
              <div 
                key={index} 
                className={`testimonial-dot ${current === index ? 'active' : ''}`}
                style={{
                  ...testimonialDotStyle,
                  backgroundColor: current === index ? 'var(--secondary)' : 'var(--light-bg)'
                }}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Styles
const testimonialsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: 'var(--spacing-xl)',
};

const testimonialSliderStyle: React.CSSProperties = {
  position: 'relative',
  maxWidth: '900px',
  margin: '0 auto',
  overflow: 'hidden',
};

const testimonialTrackStyle: React.CSSProperties = {
  display: 'flex',
  transition: 'transform var(--transition-slow)',
};

const testimonialSlideStyle: React.CSSProperties = {
  minWidth: '100%',
  padding: '0 var(--spacing-md)',
};

const testimonialCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const testimonialImageStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid var(--primary)',
  marginBottom: 'var(--spacing-md)',
};

const testimonialQuoteStyle: React.CSSProperties = {
  fontStyle: 'italic',
  marginBottom: 'var(--spacing-md)',
  position: 'relative',
  '::before': {
    content: '"',
    fontSize: '2rem',
    color: 'var(--secondary)',
    opacity: 0.5,
  },
  '::after': {
    content: '"',
    fontSize: '2rem',
    color: 'var(--secondary)',
    opacity: 0.5,
  }
};

const testimonialNameStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xs)',
};

const testimonialInfoStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--dark-bg)',
};

const testimonialNavStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'var(--spacing-lg)',
};

const testimonialDotStyle: React.CSSProperties = {
  width: '12px',
  height: '12px',
  backgroundColor: 'var(--light-bg)',
  borderRadius: '50%',
  margin: '0 var(--spacing-xs)',
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
};

const testimonialArrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'var(--primary)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 5,
  transition: 'all var(--transition-fast)',
  '&:hover': {
    backgroundColor: 'var(--secondary)',
  }
};

export default TestimonialsSection;
