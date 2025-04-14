import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import BackToTop from '../components/BackToTop';

const About = () => {
  useEffect(() => {
    document.title = 'About Us - StudyVista';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Embedded CSS with responsive adjustments */}
      <style>
        {`

        .about-page{
        overflow-x: hidden !important;
        }
          .about-image img {
            transition: transform 0.3s ease;
            max-width: 100%;
            height: auto;
          }
          .about-image img:hover {
            transform: scale(1.05) translateZ(20px);
          }

          .value-card {
            border: 2px solid transparent;
            transition: transform 0.3s ease, border-color 0.5s ease, box-shadow 0.3s ease;
          }

          .value-card:hover {
            border-color: white;
            transform: translateY(-5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          /* Ensure container is responsive */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
          }

          /* Disable hover effects on touch devices */
          @media (hover: none) {
            .about-image img:hover {
              transform: none;
            }
            .value-card:hover {
              border-color: transparent;
              transform: none;
              box-shadow: none;
            }
          }

          /* About grid base styles (single column, content first) */
          .about-grid {
            display: flex;
            flex-direction: column; /* Stack vertically */
            gap: 24px;
            align-items: center; /* Center items */
          }

          .about-content, .about-image {
            width: 100%;
            max-width: 600px; /* Limit width for readability */
            text-align: center; /* Center text */
          }

          .about-image img {
            width: 100%;
            max-width: 500px; /* Limit image size */
            margin: 0 auto; /* Center image */
            display: block;
          }

          /* Mobile styles */
          @media (max-width: 767px) {
            .container {
              padding: 0 12px;
            }

            .about-grid {
              gap: 16px; /* Smaller gap for mobile */
            }

            .about-content {
              padding: 0 8px;
            }

            .about-image img {
              max-width: 100%; /* Full width on small screens */
            }

            .values-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .team-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .team-image {
              height: 200px; /* Slightly smaller for mobile */
            }

            .achievements-timeline {
              margin: 24px 0;
            }

            .timeline-item {
              width: 100% !important;
              text-align: left;
              margin-bottom: 32px;
            }

            .timeline-year {
              left: 0 !important;
              transform: none !important;
              top: -24px;
            }

            .timeline-line {
              left: 8px;
              width: 4px;
              transform: none;
            }

            h2 {
              font-size: 1.5rem;
            }

            p, .value-desc, .achievement-desc {
              font-size: 0.9rem;
            }

            .team-social a {
              width: 36px;
              height: 36px;
            }
          }

          /* Tablet styles */
          @media (min-width: 768px) and (max-width: 1023px) {
            .container {
              max-width: 720px;
            }

            .about-grid {
              gap: 20px;
            }

            .about-content, .about-image {
              max-width: 700px; /* Slightly wider for tablets */
            }

            .values-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }

            .team-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }

            .timeline-item {
              width: 48%;
            }

            h2 {
              font-size: 1.75rem;
            }
          }

          /* Desktop styles (maintain single-column layout for about-grid) */
          @media (min-width: 1024px) {
            .about-grid {
              gap: 24px;
            }

            .about-content, .about-image {
              max-width: 800px; /* Wider for desktop */
            }

            .values-grid {
              grid-template-columns: repeat(4, 1fr);
            }

            .team-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>

      <Header />
      <PageHeader 
        title="About Us" 
        subtitle="Learn more about StudyVista and our mission to help students achieve their dreams" 
        backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />
      
      <section className="about-intro" style={aboutIntroStyle}>
        <div className="container">
          <div className="about-grid" style={aboutGridStyle}>
            <div className="about-content" style={aboutContentStyle} data-aos="fade-right">
              <h2 style={sectionTitleStyle}>Our Story</h2>
              <p>StudyVista was founded in 2010 with a simple mission: to make quality international education accessible to students around the world. What started as a small team of passionate educators has grown into a leading educational consultancy with a global presence.</p>
              <p>Our journey has been guided by our commitment to excellence, integrity, and student success. We believe that every student deserves the opportunity to receive a world-class education that aligns with their aspirations and potential.</p>
              <p>Over the years, we have helped thousands of students navigate the complex process of studying abroad, from selecting the right university to settling into their new environment. Our success is measured by the achievements of our students who have gone on to build successful careers and fulfilling lives.</p>
            </div>
            <div className="about-image" style={aboutImageStyle} data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="StudyVista team"
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Rest of the sections remain unchanged */}
      <section className="our-mission" style={ourMissionStyle}>
        <div className="container">
          <div className="mission-content" style={missionContentStyle} data-aos="fade-up">
            <h2 style={{ ...sectionTitleStyle, textAlign: 'center', color: 'white' }}>Our Mission</h2>
            <p style={{ textAlign: 'center', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
              Our mission is to empower students to achieve their academic and career goals through personalized guidance, comprehensive support, and unwavering commitment to their success. We strive to be the bridge that connects ambitious students with world-class educational opportunities.
            </p>
          </div>
          
          <div className="values-grid" style={valuesGridStyle}>
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card" 
                style={valueCardStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="value-icon" style={valueIconStyle}>
                  <i className={value.icon}></i>
                </div>
                <h3 style={valueNameStyle}>{value.name}</h3>
                <p style={valueDescStyle}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="team-section" style={teamSectionStyle}>
        <div className="container">
          <h2 style={{ ...sectionTitleStyle, textAlign: 'center' }} data-aos="fade-up">Our Expert Team</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-xl)' }} data-aos="fade-up">
            Our team consists of experienced education consultants, career advisors, and international education specialists who are dedicated to helping students achieve their dreams.
          </p>
          
          <div className="team-grid" style={teamGridStyle}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card" 
                style={teamCardStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="team-image" style={teamImageStyle}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="team-info" style={teamInfoStyle}>
                  <h3 style={teamNameStyle}>{member.name}</h3>
                  <p style={teamPositionStyle}>{member.position}</p>
                  <div className="team-social" style={teamSocialStyle}>
                    <a href="#" style={teamSocialLinkStyle}><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" style={teamSocialLinkStyle}><i className="fab fa-twitter"></i></a>
                    <a href="#" style={teamSocialLinkStyle}><i className="far fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="achievements" style={achievementsStyle}>
        <div className="container">
          <h2 style={{ ...sectionTitleStyle, textAlign: 'center', color: 'white' }} data-aos="fade-up">Our Achievements</h2>
          <div className="achievements-timeline" style={achievementsTimelineStyle}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="timeline-item" 
                style={{
                  ...timelineItemStyle,
                  alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  textAlign: index % 2 === 0 ? 'right' : 'left'
                }}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className="timeline-content" style={timelineContentStyle}>
                  <div className="timeline-year" style={timelineYearStyle}>{achievement.year}</div>
                  <h3 style={achievementTitleStyle}>{achievement.title}</h3>
                  <p style={achievementDescStyle}>{achievement.description}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line" style={timelineLineStyle}></div>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

// Data and Styles remain unchanged
const values = [
  {
    icon: 'fas fa-handshake',
    name: 'Integrity',
    description: 'We uphold the highest ethical standards in all our interactions, providing honest and transparent guidance to our students.'
  },
  {
    icon: 'fas fa-user-graduate',
    name: 'Excellence',
    description: 'We strive for excellence in everything we do, constantly improving our services to meet the evolving needs of our students.'
  },
  {
    icon: 'fas fa-users',
    name: 'Student-Centered',
    description: 'We place our students at the heart of our work, customizing our approach to meet their unique needs and aspirations.'
  },
  {
    icon: 'fas fa-globe-americas',
    name: 'Global Perspective',
    description: 'We embrace diversity and foster a global perspective, preparing our students for success in an interconnected world.'
  }
];

const teamMembers = [
  {
    name: 'Lorem',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Lorem',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Lorem',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Lorem',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  }
];

const achievements = [
  {
    year: '2010',
    title: 'Foundation',
    description: 'StudyVista was founded with a vision to transform international education consultancy.'
  },
  {
    year: '2013',
    title: 'First 1,000 Students',
    description: 'Reached the milestone of helping 1,000 students achieve their dreams of studying abroad.'
  },
  {
    year: '2015',
    title: 'International Expansion',
    description: 'Opened our first international offices in Canada, Australia, and the UK.'
  },
  {
    year: '2018',
    title: 'Excellence Award',
    description: 'Received the International Education Consultant of the Year award.'
  },
  {
    year: '2020',
    title: '10,000 Success Stories',
    description: 'Celebrated 10,000 successful student placements in universities worldwide.'
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Launched innovative digital platforms to enhance student experience and accessibility.'
  }
];

const aboutIntroStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const aboutGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xl)',
  alignItems: 'center',
};

const aboutContentStyle: React.CSSProperties = {};

const aboutImageStyle: React.CSSProperties = {
  position: 'relative',
  perspective: '1000px',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
  position: 'relative',
  paddingBottom: 'var(--spacing-sm)',
};

const ourMissionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--primary)',
  color: 'white',
};

const missionContentStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-xl)',
};

const valuesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--spacing-lg)',
};

const valueCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  cursor: 'pointer',
};

const valueIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: 'var(--secondary)',
  marginBottom: 'var(--spacing-sm)',
};

const valueNameStyle: React.CSSProperties = {
  color: 'white',
  marginBottom: 'var(--spacing-xs)',
};

const valueDescStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.95rem',
};

const teamSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const teamGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: 'var(--spacing-lg)',
};

const teamCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
  transition: 'transform var(--transition-medium), box-shadow var(--transition-medium)',
  cursor: 'pointer',
};

const teamImageStyle: React.CSSProperties = {
  height: '300px',
  width: '100%',
  overflow: 'hidden',
};

const teamInfoStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
  textAlign: 'center',
};

const teamNameStyle: React.CSSProperties = {
  margin: '0 0 var(--spacing-xs)',
  color: 'var(--primary)',
};

const teamPositionStyle: React.CSSProperties = {
  color: 'var(--dark-bg)',
  marginBottom: 'var(--spacing-sm)',
  fontSize: '0.9rem',
};

const teamSocialStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 'var(--spacing-sm)',
};

const teamSocialLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: 'var(--light-bg)',
  color: 'var(--primary)',
  transition: 'all var(--transition-fast)',
};

const achievementsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xxl) 0',
  backgroundColor: 'var(--primary)',
  color: 'white',
  position: 'relative',
};

const achievementsTimelineStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  margin: 'var(--spacing-xl) 0',
};

const timelineItemStyle: React.CSSProperties = {
  width: '45%',
  marginBottom: 'var(--spacing-xl)',
  position: 'relative',
};

const timelineContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  color: 'var(--text-dark)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  boxShadow: 'var(--shadow-md)',
  position: 'relative',
};

const timelineYearStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-30px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'var(--secondary)',
  color: 'white',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--border-radius-md)',
  fontWeight: 'bold',
};

const timelineLineStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '50%',
  width: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  transform: 'translateX(-50%)',
};

const achievementTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginTop: 'var(--spacing-md)',
  marginBottom: 'var(--spacing-xs)',
};

const achievementDescStyle: React.CSSProperties = {
  fontSize: '0.95rem',
};

export default About;