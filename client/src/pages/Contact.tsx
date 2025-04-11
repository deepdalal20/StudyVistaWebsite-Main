import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import BackToTop from '../components/BackToTop';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - StudyVista';
    window.scrollTo(0, 0);
  }, []);
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Handle resize for responsive design
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if user is typing
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormData];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      setSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="contact-page">
      <Header />
      <PageHeader 
        title="Contact Us" 
        subtitle="Have a question or need assistance? We're here to help." 
        backgroundImage="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />
      
      <section className="contact-section" style={contactSectionStyle}>
        <div className="container">
          <div className="contact-intro" style={contactIntroStyle} data-aos="fade-up">
            <h2 style={sectionTitleStyle}>Get in Touch</h2>
            <p>
              Whether you have questions about our services, need guidance on study abroad options, or want to schedule a consultation, we're ready to assist you. Reach out through the form below or contact our office directly.
            </p>
          </div>
          
          <div className="contact-content" style={contactContentStyle}>
            <div className="contact-info-cards" style={contactInfoCardsStyle} data-aos="fade-right">
              <div className="info-card" style={infoCardStyle}>
                <div className="info-icon" style={infoIconStyle}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3 style={infoTitleStyle}>Visit Us</h3>
                <p style={infoTextStyle}>
                  StudyVista Headquarters<br />
                  123 Education Street, Suite 500<br />
                  New York, NY 10001
                </p>
              </div>
              
              <div className="info-card" style={infoCardStyle}>
                <div className="info-icon" style={infoIconStyle}>
                  <i className="fas fa-envelope"></i>
                </div>
                <h3 style={infoTitleStyle}>Email Us</h3>
                <p style={infoTextStyle}>
                  General Inquiries: info@studyvista.com<br />
                  Admissions: admissions@studyvista.com<br />
                  Support: support@studyvista.com
                </p>
              </div>
              
              <div className="info-card" style={infoCardStyle}>
                <div className="info-icon" style={infoIconStyle}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 style={infoTitleStyle}>Call Us</h3>
                <p style={infoTextStyle}>
                  Main Line: +1 (555) 123-4567<br />
                  Toll-Free: 1-800-STUDY-ABROAD<br />
                  Fax: +1 (555) 765-4321
                </p>
              </div>
              
              <div className="info-card" style={infoCardStyle}>
                <div className="info-icon" style={infoIconStyle}>
                  <i className="fas fa-clock"></i>
                </div>
                <h3 style={infoTitleStyle}>Business Hours</h3>
                <p style={infoTextStyle}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="contact-form-container" style={contactFormContainerStyle} data-aos="fade-left">
              {formSubmitted ? (
                <div className="form-success" style={formSuccessStyle}>
                  <div className="success-icon" style={successIconStyle}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 style={{marginBottom: 'var(--spacing-sm)'}}>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                  <button 
                    style={sendAnotherButtonStyle}
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" style={contactFormStyle} onSubmit={handleSubmit}>
                  <h3 style={formTitleStyle}>Send Us a Message</h3>
                  
                  <div className="form-group" style={formGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>
                      Your Name <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      style={{
                        ...inputStyle,
                        borderColor: formErrors.name ? 'var(--error)' : 'var(--gray-300)'
                      }}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group" style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>
                      Your Email <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      style={{
                        ...inputStyle,
                        borderColor: formErrors.email ? 'var(--error)' : 'var(--gray-300)'
                      }}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                    />
                    {formErrors.email && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group" style={formGroupStyle}>
                    <label htmlFor="subject" style={labelStyle}>
                      Subject <span style={requiredStyle}>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      style={{
                        ...inputStyle,
                        borderColor: formErrors.subject ? 'var(--error)' : 'var(--gray-300)'
                      }}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                    {formErrors.subject && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.subject}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group" style={formGroupStyle}>
                    <label htmlFor="message" style={labelStyle}>
                      Message <span style={requiredStyle}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      style={{
                        ...textareaStyle,
                        borderColor: formErrors.message ? 'var(--error)' : 'var(--gray-300)'
                      }}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                    ></textarea>
                    {formErrors.message && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.message}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    style={submitButtonStyle}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner" style={spinnerStyle}></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section" style={mapSectionStyle} data-aos="fade-up">
        <div className="container">
          <h2 style={{...sectionTitleStyle, textAlign: 'center', marginBottom: 'var(--spacing-lg)'}}>Find Us</h2>
          <div className="map-container" style={mapContainerStyle}>
            <div style={mapStyle}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157256098687!2d-73.98784742384198!3d40.747951971488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1680052196368!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border: 0, borderRadius: 'var(--border-radius-lg)'}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="StudyVista Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <section className="global-offices" style={globalOfficesStyle}>
        <div className="container">
          <h2 style={{...sectionTitleStyle, textAlign: 'center'}} data-aos="fade-up">Our Global Offices</h2>
          <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-xl)'}} data-aos="fade-up">
            With offices around the world, we're ready to assist you no matter where you are. Visit one of our international locations for in-person guidance.
          </p>
          
          <div className="offices-grid" style={officesGridStyle}>
            {globalOffices.map((office, index) => (
              <div 
                key={index} 
                className="office-card" 
                style={officeCardStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="office-header" style={officeHeaderStyle}>
                  <img 
                    src={`https://flagcdn.com/w80/${office.countryCode.toLowerCase()}.png`} 
                    alt={`${office.country} flag`} 
                    style={officeFlagStyle}
                  />
                  <h3 style={officeNameStyle}>{office.city}, {office.country}</h3>
                </div>
                <div className="office-details" style={officeDetailsStyle}>
                  <p style={officeAddressStyle}>{office.address}</p>
                  <p><strong>Phone:</strong> {office.phone}</p>
                  <p><strong>Email:</strong> {office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="contact-cta" style={contactCtaStyle}>
        <div className="container">
          <div className="cta-content" style={ctaContentStyle} data-aos="fade-up">
            <h2>Ready to Begin Your Study Abroad Journey?</h2>
            <p>Schedule a free consultation with our expert education counselors to explore your options.</p>
            <a href="/inquiry" style={ctaButtonStyle}>
              Schedule Consultation <i className="fas fa-arrow-right" style={{marginLeft: '8px'}}></i>
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
const globalOffices = [
  {
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    address: '123 Oxford Street, London W1D 2HG',
    phone: '+44 20 7123 4567',
    email: 'uk@studyvista.com'
  },
  {
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    address: '45 George Street, Sydney NSW 2000',
    phone: '+61 2 9876 5432',
    email: 'australia@studyvista.com'
  },
  {
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    address: '789 Yonge Street, Toronto ON M4W 2G8',
    phone: '+1 416 555 7890',
    email: 'canada@studyvista.com'
  },
  {
    city: 'New Delhi',
    country: 'India',
    countryCode: 'IN',
    address: '567 Connaught Place, New Delhi 110001',
    phone: '+91 11 2345 6789',
    email: 'india@studyvista.com'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    address: '123 Orchard Road, #05-01, Singapore 238893',
    phone: '+65 6123 4567',
    email: 'singapore@studyvista.com'
  },
  {
    city: 'Dubai',
    country: 'UAE',
    countryCode: 'AE',
    address: 'Sheikh Zayed Road, Dubai, UAE',
    phone: '+971 4 123 4567',
    email: 'uae@studyvista.com'
  }
];

// Styles
const contactSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const contactIntroStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto var(--spacing-xl)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
  position: 'relative',
  paddingBottom: 'var(--spacing-sm)',
};

const contactContentStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
  gap: 'var(--spacing-xl)',
  maxWidth: '1200px',
  margin: '0 auto',
};

const contactInfoCardsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--spacing-md)',
};

const infoCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  textAlign: 'center',
  transition: 'transform var(--transition-medium), box-shadow var(--transition-medium)',
};

const infoIconStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-sm)',
};

const infoTitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xs)',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  lineHeight: 1.6,
};

const contactFormContainerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-md)',
  padding: 'var(--spacing-lg)',
};

const contactFormStyle: React.CSSProperties = {
  
};

const formTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
  textAlign: 'center',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--spacing-xs)',
  color: 'var(--text-dark)',
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-sm)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '1rem',
  transition: 'border-color var(--transition-fast)',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-sm)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '1rem',
  resize: 'vertical',
  transition: 'border-color var(--transition-fast)',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-xl)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: '2px solid rgba(255,255,255,0.3)',
  borderRadius: '50%',
  borderTopColor: 'white',
  animation: 'spin 1s ease-in-out infinite',
  marginRight: 'var(--spacing-sm)',
};

const formSuccessStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: 'var(--spacing-xl) var(--spacing-lg)',
};

const successIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  color: 'var(--success)',
  marginBottom: 'var(--spacing-md)',
};

const sendAnotherButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
  marginTop: 'var(--spacing-md)',
};

const mapSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const mapContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const mapStyle: React.CSSProperties = {
  height: '500px',
  borderRadius: 'var(--border-radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
};

const globalOfficesStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const officesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 'var(--spacing-lg)',
  maxWidth: '1200px',
  margin: '0 auto',
};

const officeCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-md)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
  transition: 'transform var(--transition-medium), box-shadow var(--transition-medium)',
};

const officeHeaderStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-md)',
  display: 'flex',
  alignItems: 'center',
};

const officeFlagStyle: React.CSSProperties = {
  width: '30px',
  marginRight: 'var(--spacing-sm)',
  borderRadius: '3px',
};

const officeNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
};

const officeDetailsStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
};

const officeAddressStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-sm)',
  fontWeight: 500,
};

const contactCtaStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--primary)',
  color: 'white',
};

const ctaContentStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '700px',
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

const errorMessageStyle: React.CSSProperties = {
  color: 'var(--error)',
  fontSize: '0.85rem',
  marginTop: '5px',
};

const requiredStyle: React.CSSProperties = {
  color: 'var(--error)',
};

export default Contact;