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
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="StudyVista team" style={{borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)'}} />
            </div>
          </div>
        </div>
      </section>
      
      <section className="our-mission" style={ourMissionStyle}>
        <div className="container">
          <div className="mission-content" style={missionContentStyle} data-aos="fade-up">
            <h2 style={{...sectionTitleStyle, textAlign: 'center', color: 'white'}}>Our Mission</h2>
            <p style={{textAlign: 'center', color: 'white', maxWidth: '800px', margin: '0 auto'}}>
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
          <h2 style={{...sectionTitleStyle, textAlign: 'center'}} data-aos="fade-up">Our Expert Team</h2>
          <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-xl)'}} data-aos="fade-up">
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
                  <img src={member.image} alt={member.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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
          <h2 style={{...sectionTitleStyle, textAlign: 'center', color: 'white'}} data-aos="fade-up">Our Achievements</h2>
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

// Data
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
    name: 'Dr. Sarah Williams',
    position: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Michael Chen',
    position: 'Head of Academic Counseling',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Priya Sharma',
    position: 'Visa Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'James Thompson',
    position: 'Career Advisor',
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

// Styles
const aboutIntroStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const aboutGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--spacing-xl)',
  alignItems: 'center',
};

const aboutContentStyle: React.CSSProperties = {
  
};

const aboutImageStyle: React.CSSProperties = {
  
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
  transition: 'transform var(--transition-medium)',
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