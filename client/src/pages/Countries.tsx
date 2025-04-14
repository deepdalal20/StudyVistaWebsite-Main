import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import BackToTop from '../components/BackToTop';

// Interface for country data
interface Country {
  id: number;
  name: string;
  code: string;
  image: string;
  description: string;
  highlights: string[];
  universities: { name: string; ranking: number; programs: string[] }[];
  averageTuition: string;
  averageLiving: string;
  visaRequirements: string[];
  scholarships: string[];
}

const Countries = () => {
  useEffect(() => {
    document.title = 'Study Destinations - StudyVista';
    window.scrollTo(0, 0);
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
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

  const openCountryDetails = (country: Country) => {
    setSelectedCountry(country);
    setActiveTab('overview');
    setTimeout(() => {
      const detailsSection = document.getElementById('country-details');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="countries-page">
      {/* *** CHANGE 1: Moved <style> tag to root *** */}
      <style>
      {`
    .country-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      perspective: 1000px;
      -webkit-perspective: 1000px;
    }

    .country-card:hover {
      transform: translateY(-10px) scale(1.05) rotateX(5deg) !important;
      -webkit-transform: translateY(-10px) scale(1.05) rotateX(5deg);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2) important; 
      z-index: 10;
    }
  `}
      </style>
      <Header />
      <PageHeader 
        title="Study Destinations" 
        subtitle="Explore top destinations for international education" 
        backgroundImage="https://media.istockphoto.com/id/510152502/photo/art-summer-vacation-ocean-beach.jpg?s=612x612&w=0&k=20&c=g5IKeiawhv7vdhkdNavEYT8q_6PpVNikf_p9vkICIv0="
      />
      
      <section className="countries-intro" style={countriesIntroStyle}>
        <div className="container">
          <div className="countries-intro-content" style={countriesIntroContentStyle} data-aos="fade-up">
            <h2 style={sectionTitleStyle}>Your Gateway to Global Education</h2>
            <p>
              Choosing the right destination for your international education is a crucial decision that can shape your academic journey and future career. Each country offers unique advantages, from world-renowned universities to diverse cultural experiences and post-graduation opportunities.
            </p>
            <p>
              At StudyVista, we provide comprehensive guidance on top education destinations worldwide. Our experts analyze each country's education system, visa policies, cost of living, work opportunities, and cultural aspects to help you make an informed decision that aligns with your goals and preferences.
            </p>
          </div>
          
          <div className="countries-grid" style={countriesGridStyle}>
            {countries.map((country, index) => (
              <div
                key={country.id}
                className="country-card"
                style={countryCardStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => openCountryDetails(country)}
              >
                <div className="country-image" style={countryImageStyle}>
                  <img
                    src={country.image}
                    alt={`${country.name} education`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="country-overlay" style={countryOverlayStyle}>
                    <div className="country-flag" style={countryFlagStyle}>
                      <img
                        src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                        alt={`${country.name} flag`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="country-info" style={countryInfoStyle}>
                  <h3 style={countryNameStyle}>{country.name}</h3>
                  <p style={countryDescStyle}>{country.description.substring(0, 100)}...</p>
                  <button style={countryButtonStyle}>
                    Explore {country.name} <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {selectedCountry && (
        <section id="country-details" className="country-details" style={countryDetailsStyle}>
          <div className="container">
            <div className="country-header" style={countryHeaderStyle} data-aos="fade-up">
              <div className="country-title" style={countryTitleStyle}>
                <div className="country-flag-large" style={countryFlagLargeStyle}>
                  <img 
                    src={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png`} 
                    alt={`${selectedCountry.name} flag`} 
                  />
                </div>
                <h2>{selectedCountry.name}</h2>
              </div>
              
              <div className="country-tabs" style={countryTabsStyle}>
                <button 
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                  style={{
                    ...countryTabStyle,
                    backgroundColor: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'overview' ? 'white' : 'var(--text-dark)',
                  }}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab ${activeTab === 'universities' ? 'active' : ''}`}
                  style={{
                    ...countryTabStyle,
                    backgroundColor: activeTab === 'universities' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'universities' ? 'white' : 'var(--text-dark)',
                  }}
                  onClick={() => setActiveTab('universities')}
                >
                  Universities
                </button>
                <button 
                  className={`tab ${activeTab === 'visa' ? 'active' : ''}`}
                  style={{
                    ...countryTabStyle,
                    backgroundColor: activeTab === 'visa' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'visa' ? 'white' : 'var(--text-dark)',
                  }}
                  onClick={() => setActiveTab('visa')}
                >
                  Visa Requirements
                </button>
                <button 
                  className={`tab ${activeTab === 'costs' ? 'active' : ''}`}
                  style={{
                    ...countryTabStyle,
                    backgroundColor: activeTab === 'costs' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'costs' ? 'white' : 'var(--text-dark)',
                  }}
                  onClick={() => setActiveTab('costs')}
                >
                  Costs & Scholarships
                </button>
              </div>
            </div>
            
            <div className="country-content" style={countryContentStyle}>
              {activeTab === 'overview' && (
                <div className="overview-tab" data-aos="fade">
                  <div className="country-description" style={countryDescriptionStyle}>
                    <p>{selectedCountry.description}</p>
                  </div>
                  <div className="country-highlights" style={countryHighlightsStyle}>
                    <h3 style={tabSubtitleStyle}>Key Highlights</h3>
                    <ul style={highlightListStyle}>
                      {selectedCountry.highlights.map((highlight, index) => (
                        <li key={index} style={highlightItemStyle}>
                          <i className="fas fa-check-circle" style={highlightIconStyle}></i>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="country-image-gallery" style={countryImageGalleryStyle}>
                    <img 
                      src={selectedCountry.image} 
                      alt={`Education in ${selectedCountry.name}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--border-radius-lg)' }}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'universities' && (
                <div className="universities-tab" data-aos="fade">
                  <h3 style={tabSubtitleStyle}>Top Universities in {selectedCountry.name}</h3>
                  <div className="universities-list" style={universitiesListStyle}>
                    {selectedCountry.universities.map((university, index) => (
                      <div key={index} className="university-card" style={universityCardStyle}>
                        <div className="university-header" style={universityHeaderStyle}>
                          <h4 style={universityNameStyle}>{university.name}</h4>
                          <span style={universityRankingStyle}>
                            Ranking: #{university.ranking}
                          </span>
                        </div>
                        <div className="university-programs" style={universityProgramsStyle}>
                          <h5 style={programsTitleStyle}>Popular Programs:</h5>
                          <ul style={programsListStyle}>
                            {university.programs.map((program, idx) => (
                              <li key={idx} style={programItemStyle}>{program}</li>
                            ))}
                          </ul>
                        </div>
                        <button style={universityButtonStyle}>
                          View Details <i className="fas fa-external-link-alt" style={{ marginLeft: '5px' }}></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'visa' && (
                <div className="visa-tab" data-aos="fade">
                  <h3 style={tabSubtitleStyle}>Visa Requirements for {selectedCountry.name}</h3>
                  <div className="visa-requirements" style={visaRequirementsStyle}>
                    <div className="visa-process" style={visaProcessStyle}>
                      <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Student Visa Process</h4>
                      <ol style={visaStepsStyle}>
                        {selectedCountry.visaRequirements.map((requirement, index) => (
                          <li key={index} style={visaStepItemStyle}>
                            <div className="step-number" style={stepNumberStyle}>{index + 1}</div>
                            <div className="step-content" style={stepContentStyle}>
                              <p>{requirement}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="visa-support" style={visaSupportStyle}>
                      <h4>How StudyVista Can Help</h4>
                      <p>Our visa counselors provide comprehensive support throughout the visa application process:</p>
                      <ul style={{ paddingLeft: 'var(--spacing-md)', marginTop: 'var(--spacing-sm)' }}>
                        <li>Document preparation guidance</li>
                        <li>Application review</li>
                        <li>Interview preparation</li>
                        <li>Visa status tracking</li>
                        <li>Pre-departure briefing</li>
                      </ul>
                      <Link
                        to="/inquiry"
                        style={{
                          ...countryButtonStyle,
                          marginTop: 'var(--spacing-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        Get Visa Assistance <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'costs' && (
                <div className="costs-tab" data-aos="fade">
                  <h3 style={tabSubtitleStyle}>Costs & Scholarships</h3>
                  <div className="costs-overview" style={costsOverviewStyle}>
                    <div className="cost-card" style={costCardStyle}>
                      <h4 style={costCardTitleStyle}>Average Tuition Fees</h4>
                      <div style={costCardValueStyle}>{selectedCountry.averageTuition}</div>
                      <p style={costCardDescStyle}>per academic year</p>
                    </div>
                    <div className="cost-card" style={costCardStyle}>
                      <h4 style={costCardTitleStyle}>Living Expenses</h4>
                      <div style={costCardValueStyle}>{selectedCountry.averageLiving}</div>
                      <p style={countryDescStyle}>per year including accommodation</p>
                    </div>
                  </div>
                  <div className="scholarships-section" style={scholarshipsSectionStyle}>
                    <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Available Scholarships</h4>
                    <div className="scholarships-list" style={scholarshipsListStyle}>
                      {selectedCountry.scholarships.map((scholarship, index) => (
                        <div key={index} className="scholarship-item" style={scholarshipItemStyle}>
                          <i className="fas fa-award" style={scholarshipIconStyle}></i>
                          <div>
                            <p>{scholarship}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
                    <p>Need help finding the right scholarship opportunities?</p>
                    <Link
                      to="/contact"
                      style={{
                        ...countryButtonStyle,
                        marginTop: 'var(--spacing-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        width: 'auto',
                        height: 'auto',
                      }}
                    >
                      Schedule a Consultation <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      <section className="cta-section" style={ctaSectionStyle}>
        <div className="container">
          <div className="cta-content" style={ctaContentStyle} data-aos="fade-up">
            <h2>Ready to Begin Your Journey?</h2>
            <p>Take the first step towards studying in your dream destination. Our expert counselors are ready to guide you.</p>
            <Link
              to="/inquiry"
              style={{
                ...ctaButtonStyle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              Contact Us Today <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </Link>
          </div>
        </div>
        {/* *** CHANGE 2: Removed duplicate <style> tag from here *** */}
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

// Data
const countries: Country[] = [
  {
    id: 1,
    name: 'USA',
    code: 'US',
    image: 'https://images.unsplash.com/photo-1507992781348-310259076fe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'The United States offers a diverse range of educational opportunities across its 50 states, with world-renowned universities, cutting-edge research facilities, and a flexible education system that encourages creativity and innovation. Home to the Ivy League and many other prestigious institutions, the USA provides students with access to state-of-the-art resources and a multicultural environment that prepares them for the global workforce.',
    highlights: [
      'Home to over 4,000 accredited higher education institutions',
      'Flexible education system allowing students to explore multiple interests',
      'Strong focus on research and innovation',
      'Diverse campus communities with students from around the world',
      'Abundant post-graduation employment opportunities through OPT'
    ],
    universities: [
      {
        name: 'Harvard University',
        ranking: 1,
        programs: ['Business Administration', 'Law', 'Medicine', 'Computer Science']
      },
      {
        name: 'Stanford University',
        ranking: 2,
        programs: ['Engineering', 'Computer Science', 'Business', 'Environmental Science']
      },
      {
        name: 'Massachusetts Institute of Technology (MIT)',
        ranking: 3,
        programs: ['Engineering', 'Mathematics', 'Physics', 'Artificial Intelligence']
      }
    ],
    averageTuition: '$25,000 - $55,000',
    averageLiving: '$10,000 - $20,000',
    visaRequirements: [
      'Acceptance letter from a SEVP-approved institution',
      'Complete the I-20 form provided by your school',
      'Pay the SEVIS fee',
      'Complete the DS-160 form online',
      'Schedule and attend a visa interview at a U.S. Embassy or Consulate',
      'Provide financial documents showing ability to cover expenses'
    ],
    scholarships: [
      'Fulbright Foreign Student Program',
      'Hubert Humphrey Fellowship Program',
      'University-specific scholarships (vary by institution)',
      'American Association of University Women International Fellowships',
      'Aga Khan Foundation International Scholarship Program'
    ]
  },
  {
    id: 2,
    name: 'UK',
    code: 'GB',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'The United Kingdom offers a rich tradition of academic excellence, with some of the oldest and most prestigious universities in the world. Known for its rigorous and specialized education system, the UK provides internationally recognized qualifications, diverse course options, and a vibrant multicultural environment. Students benefit from shorter program durations, which can be more cost-effective, along with opportunities to work during and after studies.',
    highlights: [
      "Home to four of the world's top ten universities",
      "Shorter, more intensive degree programs (typically 3 years for undergraduate)",
      "Strong research orientation with cutting-edge facilities",
      "Rich cultural heritage and vibrant student cities",
      "Graduate Route visa allowing 2-3 years of post-study work"
    ],
    universities: [
      {
        name: 'University of Oxford',
        ranking: 1,
        programs: ['Politics, Philosophy & Economics', 'English Literature', 'Medical Sciences', 'International Relations']
      },
      {
        name: 'University of Cambridge',
        ranking: 2,
        programs: ['Mathematics', 'Natural Sciences', 'Engineering', 'Law']
      },
      {
        name: 'Imperial College London',
        ranking: 6,
        programs: ['Engineering', 'Medicine', 'Science', 'Business']
      }
    ],
    averageTuition: '£10,000 - £38,000',
    averageLiving: '£12,000 - £15,000',
    visaRequirements: [
      'Unconditional offer from a UK educational institution',
      'Proof of financial ability to cover tuition and living costs',
      'Complete the online application form',
      'Pay the application fee and immigration health surcharge',
      'Provide biometric information (fingerprints and photo)',
      'Attend an interview if required'
    ],
    scholarships: [
      'Chevening Scholarships',
      'Commonwealth Scholarships',
      'GREAT Scholarships',
      'Royal Society Grants',
      'University-specific scholarships (vary by institution)'
    ]
  },
  {
    id: 3,
    name: 'Australia',
    code: 'AU',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Australia offers a world-class education system combined with an excellent quality of life. Known for its innovative approach to learning, Australian universities emphasize practical skills and research capabilities. The country provides a safe, welcoming environment with diverse landscapes, vibrant cities, and a multicultural society. Students benefit from strong industry connections, extensive support services, and post-study work opportunities.',
    highlights: [
      "Seven of Australia's universities rank in the world's top 100",
      'Strong focus on employability and practical skills',
      'Safe and welcoming environment for international students',
      'High quality of life and stunning natural environments',
      'Post-study work visa opportunities for up to 4 years'
    ],
    universities: [
      {
        name: 'University of Melbourne',
        ranking: 31,
        programs: ['Business', 'Law', 'Medicine', 'Creative Arts']
      },
      {
        name: 'Australian National University',
        ranking: 35,
        programs: ['Political Science', 'Anthropology', 'Physics', 'Environmental Studies']
      },
      {
        name: 'University of Sydney',
        ranking: 40,
        programs: ['Engineering', 'Architecture', 'Health Sciences', 'Education']
      }
    ],
    averageTuition: 'AUD 20,000 - AUD 45,000',
    averageLiving: 'AUD 21,000 - AUD 27,000',
    visaRequirements: [
      'Letter of offer from an Australian educational institution',
      'Confirmation of Enrollment (CoE) from your institution',
      'Meet the Genuine Temporary Entrant (GTE) requirement',
      'Proof of sufficient funds for tuition and living expenses',
      'Health insurance (Overseas Student Health Cover)',
      'English language proficiency evidence',
      'Meet health and character requirements'
    ],
    scholarships: [
      'Australia Awards',
      'Destination Australia Scholarships',
      'Australian Government Research Training Program',
      'University-specific international scholarships',
      'Australia APEC Women in Research Fellowship'
    ]
  },
  {
    id: 4,
    name: 'Canada',
    code: 'CA',
    image: 'https://media.istockphoto.com/id/525508231/photo/moraine-lake-rocky-mountains-canada.jpg?s=612x612&w=0&k=20&c=a4pWewQGlZSblXWROA5o5ayaN5R7XPfDGOQ43B88IzY=',
    description: 'Canada is known for its high-quality education system, affordable tuition fees compared to many other English-speaking countries, and welcoming immigration policies. Canadian institutions emphasize research and practical learning, equipping students with skills valued by employers worldwide. The country offers a safe, stable environment with stunning natural landscapes and culturally diverse cities. Graduates benefit from excellent post-study work opportunities and pathways to permanent residency.',
    highlights: [
      'World-renowned for quality education at affordable tuition rates',
      'Bilingual education opportunities (English and French)',
      'Safe, politically stable environment with high quality of life',
      'Strong emphasis on research and innovation',
      'Post-Graduation Work Permit (PGWP) and clear pathway to permanent residency'
    ],
    universities: [
      {
        name: 'University of Toronto',
        ranking: 18,
        programs: ['Business', 'Medicine', 'Engineering', 'Arts & Science']
      },
      {
        name: 'McGill University',
        ranking: 31,
        programs: ['Medicine', 'Law', 'Engineering', 'Agriculture & Environmental Sciences']
      },
      {
        name: 'University of British Columbia',
        ranking: 37,
        programs: ['Forestry', 'Mining Engineering', 'Education', 'Ocean Sciences']
      }
    ],
    averageTuition: 'CAD 14,000 - CAD 35,000',
    averageLiving: 'CAD 12,000 - CAD 18,000',
    visaRequirements: [
      'Acceptance letter from a Designated Learning Institution (DLI)',
      'Proof of financial support (tuition + CAD 10,000 for living expenses)',
      'Complete study permit application online or on paper',
      'Provide biometrics (fingerprints and photo)',
      'Medical examination if required',
      'Attend an interview if requested'
    ],
    scholarships: [
      'Vanier Canada Graduate Scholarships',
      'Banting Postdoctoral Fellowships',
      "Canada Graduate Scholarships – Master's Program",
      'Provincial Government Scholarships',
      'University-specific scholarships for international students'
    ]
  },
  {
    id: 5,
    name: 'New Zealand',
    code: 'NZ',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    description: 'New Zealand offers a forward-thinking education system that encourages innovative thinking and promotes research-based teaching. The country is known for its friendly, welcoming culture, stunning natural environments, and high quality of life. New Zealand institutions provide globally recognized qualifications with a strong focus on student welfare and support services. Students enjoy a balanced lifestyle with opportunities for adventure, cultural experiences, and career development.',
    highlights: [
      'All eight universities rank within the top 3% globally',
      'Innovative, research-based teaching methods',
      'Safe country with stunning natural environments',
      'Strong student support services and welfare focus',
      'Post-study work rights of up to 3 years'
    ],
    universities: [
      {
        name: 'University of Auckland',
        ranking: 81,
        programs: ['Business', 'Engineering', 'Medicine', 'Arts']
      },
      {
        name: 'University of Otago',
        ranking: 184,
        programs: ['Health Sciences', 'Sciences', 'Humanities', 'Business']
      },
      {
        name: 'Victoria University of Wellington',
        ranking: 223,
        programs: ['Law', 'Architecture & Design', 'Science', 'Humanities & Social Sciences']
      }
    ],
    averageTuition: 'NZD 22,000 - NZD 35,000',
    averageLiving: 'NZD 15,000 - NZD 20,000',
    visaRequirements: [
      'Offer of place from an educational institution',
      'Evidence of sufficient funds for tuition and living expenses',
      'Return air ticket or evidence of sufficient funds to purchase one',
      'Health insurance (medical and travel)',
      'Police certificates to prove good character',
      'Medical certificates if staying more than 12 months'
    ],
    scholarships: [
      'New Zealand International Doctoral Research Scholarships',
      'New Zealand Excellence Awards',
      'New Zealand Commonwealth Scholarships',
      'University-specific scholarships for international students',
      'New Zealand Development Scholarships'
    ]
  },
  {
    id: 6,
    name: 'Singapore',
    code: 'SG',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
    description: "Singapore is a global education hub in Asia, offering world-class universities and a unique blend of Eastern and Western cultures. The city-state provides a safe, clean environment with excellent infrastructure and a strategic location in the heart of Asia. Singapore's education system emphasizes academic rigor, technological advancement, and industry connections, preparing graduates for the global job market. Students benefit from the multicultural experience and extensive networking opportunities.",
    highlights: [
      "Home to two of Asia's top universities",
      "Strategic location as a gateway to Asia",
      "Safe, clean environment with excellent infrastructure",
      "Multicultural society with English as the primary language of instruction",
      "Strong industry connections and internship opportunities"
    ],
    universities: [
      {
        name: 'National University of Singapore',
        ranking: 11,
        programs: ['Business', 'Computing', 'Medicine', 'Engineering']
      },
      {
        name: 'Nanyang Technological University',
        ranking: 13,
        programs: ['Engineering', 'Business', 'Science', 'Art & Design']
      },
      {
        name: 'Singapore Management University',
        ranking: 511,
        programs: ['Business', 'Law', 'Information Systems', 'Social Sciences']
      }
    ],
    averageTuition: 'SGD 20,000 - SGD 45,000',
    averageLiving: 'SGD 10,000 - SGD 15,000',
    visaRequirements: [
      "Acceptance letter from a Singapore educational institution",
      "Student's Pass application through the Student's Pass Online Application & Registration (SOLAR)",
      "eForm 16 and passport-sized photograph",
      "Medical examination report if required",
      "Proof of financial ability to support studies",
      "Payment of Student's Pass issuance fee"
    ],
    scholarships: [
      "Singapore International Graduate Award (SINGA)",
      "ASEAN Scholarships",
      "Science & Technology Undergraduate Scholarship",
      "Tuition Grant Scheme (subsidized tuition fees with service obligation)",
      "University-specific scholarships for international students"
    ]
  }
];

// Styles
const countriesIntroStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const countriesIntroContentStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto var(--spacing-xl)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
  position: 'relative',
  paddingBottom: 'var(--spacing-sm)',
};

const countriesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 'var(--spacing-lg)',
};

// *** CHANGE 3: Ensured countryCardStyle is correct ***
const countryCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
  cursor: 'pointer',
  position: 'relative',
  transform: 'translateY(0) rotateX(0deg)',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  perspective: '1000px', // Enhances 3D effect
};

const countryImageStyle: React.CSSProperties = {
  height: '200px',
  position: 'relative',
  overflow: 'hidden',
};

const countryOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 'var(--spacing-sm)',
  right: 'var(--spacing-sm)',
  zIndex: 1,
};

const countryFlagStyle: React.CSSProperties = {
  width: '40px',
  height: '30px',
  borderRadius: 'var(--border-radius-sm)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
};

const countryInfoStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
};

const countryNameStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xs)',
};

const countryDescStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  marginBottom: 'var(--spacing-md)',
  color: 'var(--dark-bg)',
};

const countryButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-xs) var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
  display: 'inline-block',
};

const countryDetailsStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const countryHeaderStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
};

const countryTitleStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 'var(--spacing-md)',
};

const countryFlagLargeStyle: React.CSSProperties = {
  width: '60px',
  height: '40px',
  marginRight: 'var(--spacing-sm)',
  borderRadius: 'var(--border-radius-sm)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
};

const countryTabsStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-xs)',
};

const countryTabStyle: React.CSSProperties = {
  padding: 'var(--spacing-xs) var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
};

const countryContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-md)',
};

const countryDescriptionStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
};

const countryHighlightsStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
};

const tabSubtitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
};

const highlightListStyle: React.CSSProperties = {
  listStyle: 'none',
};

const highlightItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-sm)',
};

const highlightIconStyle: React.CSSProperties = {
  color: 'var(--success)',
  marginRight: 'var(--spacing-sm)',
  marginTop: '5px',
};

const countryImageGalleryStyle: React.CSSProperties = {
  height: '300px',
  overflow: 'hidden',
};

const universitiesListStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 'var(--spacing-md)',
};

const universityCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-md)',
  padding: 'var(--spacing-md)',
  boxShadow: 'var(--shadow-sm)',
};

const universityHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-sm)',
};

const universityNameStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xs)',
};

const universityRankingStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: '3px 8px',
  borderRadius: 'var(--border-radius-sm)',
  fontSize: '0.8rem',
  fontWeight: 500,
};

const universityProgramsStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
};

const programsTitleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 500,
  marginBottom: 'var(--spacing-xs)',
};

const programsListStyle: React.CSSProperties = {
  paddingLeft: 'var(--spacing-md)',
  fontSize: '0.9rem',
};

const programItemStyle: React.CSSProperties = {
  marginBottom: '4px',
};

const universityButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'var(--primary)',
  border: '1px solid var(--primary)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--border-radius-sm)',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
};

const visaRequirementsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--spacing-lg)',
};

const visaProcessStyle: React.CSSProperties = {};

const visaStepsStyle: React.CSSProperties = {
  listStyle: 'none',
  counterReset: 'step-counter',
  paddingLeft: 0,
};

const visaStepItemStyle: React.CSSProperties = {
  display: 'flex',
  marginBottom: 'var(--spacing-md)',
};

const stepNumberStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'var(--spacing-sm)',
  flexShrink: 0,
};

const stepContentStyle: React.CSSProperties = {
  flex: 1,
};

const visaSupportStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
};

const costsOverviewStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-md)',
  marginBottom: 'var(--spacing-lg)',
};

const costCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  textAlign: 'center',
};

const costCardTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xs)',
};

const costCardValueStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--secondary)',
  marginBottom: 'var(--spacing-xs)',
};

const costCardDescStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--dark-bg)',
};

const scholarshipsSectionStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
};

const scholarshipsListStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: 'var(--spacing-sm)',
};

const scholarshipItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: 'var(--light-bg)',
  padding: 'var(--spacing-sm)',
  borderRadius: 'var(--border-radius-sm)',
};

const scholarshipIconStyle: React.CSSProperties = {
  color: 'var(--secondary)',
  marginRight: 'var(--spacing-sm)',
  marginTop: '5px',
};

const ctaSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--primary)',
  color: 'white',
  marginTop: 'var(--spacing-xl)',
};

const ctaContentStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
};

const ctaButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--secondary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  fontWeight: 600,
  marginTop: 'var(--spacing-md)',
  transition: 'all var(--transition-fast)',
};

export default Countries;