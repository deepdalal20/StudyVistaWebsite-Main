import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import BackToTop from '../components/BackToTop';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  educationLevel: string;
  interestedCountry: string;
  interestedProgram: string;
  message: string;
  preferredContact: string;
  source: string;
  agreeToTerms: boolean;
}

const Inquiry = () => {
  useEffect(() => {
    document.title = 'Inquiry - StudyVista';
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

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    educationLevel: '',
    interestedCountry: '',
    interestedProgram: '',
    message: '',
    preferredContact: 'email',
    source: '',
    agreeToTerms: false
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Responsive styles defined inside the component
  const formRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
  };
  
  const faqGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: 'var(--spacing-lg)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.educationLevel) errors.educationLevel = 'Please select your education level';
    if (!formData.interestedCountry) errors.interestedCountry = 'Please select a country';
    if (!formData.interestedProgram) errors.interestedProgram = 'Please select a program';
    
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms and conditions';
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error for this field if user is typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Scroll to the first error
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: '',
        educationLevel: '',
        interestedCountry: '',
        interestedProgram: '',
        message: '',
        preferredContact: 'email',
        source: '',
        agreeToTerms: false
      });
      
      // Scroll to top of form
      window.scrollTo({
        top: document.getElementById('inquiry-form')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 1500);
  };

  return (
    <div className="inquiry-page">
      <Header />
      <PageHeader 
        title="Inquiry Form" 
        subtitle="Complete this form to receive personalized guidance from our education consultants" 
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />
      
      <section className="inquiry-form-section" style={inquiryFormSectionStyle}>
        <div className="container" style={containerStyle}>
          <div className="form-container" style={formContainerStyle} id="inquiry-form">
            {formSubmitted ? (
              <div className="form-success" style={formSuccessStyle} data-aos="fade-up">
                <div className="success-icon" style={successIconStyle}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2 style={{color: 'var(--primary)', marginBottom: 'var(--spacing-md)'}}>Thank You!</h2>
                <p>Your inquiry has been successfully submitted. One of our education consultants will contact you within 24 hours to discuss your study abroad options.</p>
                <button 
                  style={submitAnotherButtonStyle}
                  onClick={() => setFormSubmitted(false)}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="form-header" style={formHeaderStyle} data-aos="fade-up">
                  <h2 style={{color: 'var(--primary)'}}>Start Your International Education Journey</h2>
                  <p>Fill out the form below and our education consultants will contact you with personalized guidance based on your academic goals and preferences.</p>
                </div>
                
                <form className="inquiry-form" style={inquiryFormStyle} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="firstName" style={labelStyle}>
                        First Name <span style={requiredStyle}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        style={{
                          ...inputStyle,
                          borderColor: formErrors.firstName ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {formErrors.firstName && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.firstName}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="lastName" style={labelStyle}>
                        Last Name <span style={requiredStyle}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        style={{
                          ...inputStyle,
                          borderColor: formErrors.lastName ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {formErrors.lastName && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="email" style={labelStyle}>
                        Email <span style={requiredStyle}>*</span>
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
                      />
                      {formErrors.email && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="phone" style={labelStyle}>
                        Phone Number <span style={requiredStyle}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        style={{
                          ...inputStyle,
                          borderColor: formErrors.phone ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {formErrors.phone && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="nationality" style={labelStyle}>
                        Nationality
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        style={inputStyle}
                        value={formData.nationality}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="educationLevel" style={labelStyle}>
                        Current Education Level <span style={requiredStyle}>*</span>
                      </label>
                      <select
                        id="educationLevel"
                        name="educationLevel"
                        style={{
                          ...selectStyle,
                          borderColor: formErrors.educationLevel ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.educationLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select your education level</option>
                        <option value="high-school">High School</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.educationLevel && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.educationLevel}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="interestedCountry" style={labelStyle}>
                        Interested Country <span style={requiredStyle}>*</span>
                      </label>
                      <select
                        id="interestedCountry"
                        name="interestedCountry"
                        style={{
                          ...selectStyle,
                          borderColor: formErrors.interestedCountry ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.interestedCountry}
                        onChange={handleChange}
                      >
                        <option value="">Select a country</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="new-zealand">New Zealand</option>
                        <option value="singapore">Singapore</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.interestedCountry && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.interestedCountry}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="interestedProgram" style={labelStyle}>
                        Interested Program <span style={requiredStyle}>*</span>
                      </label>
                      <select
                        id="interestedProgram"
                        name="interestedProgram"
                        style={{
                          ...selectStyle,
                          borderColor: formErrors.interestedProgram ? 'var(--error)' : 'var(--gray-300)'
                        }}
                        value={formData.interestedProgram}
                        onChange={handleChange}
                      >
                        <option value="">Select a program</option>
                        <option value="undergraduate">Undergraduate Degree</option>
                        <option value="graduate">Graduate Degree</option>
                        <option value="mba">MBA</option>
                        <option value="phd">PhD</option>
                        <option value="certificate">Certificate Program</option>
                        <option value="language">Language Course</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.interestedProgram && (
                        <div className="error-message" style={errorMessageStyle}>
                          {formErrors.interestedProgram}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-group" style={{...formGroupStyle, marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="message" style={labelStyle}>
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      style={textareaStyle}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide any specific questions or information that will help us provide better guidance."
                    ></textarea>
                  </div>
                  
                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label style={{...labelStyle, marginBottom: 'var(--spacing-xs)'}}>
                        Preferred Contact Method
                      </label>
                      <div style={radioGroupStyle}>
                        <label style={radioLabelStyle}>
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleChange}
                            style={radioInputStyle}
                          />
                          <span style={radioTextStyle}>Email</span>
                        </label>
                        <label style={radioLabelStyle}>
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleChange}
                            style={radioInputStyle}
                          />
                          <span style={radioTextStyle}>Phone</span>
                        </label>
                        <label style={radioLabelStyle}>
                          <input
                            type="radio"
                            name="preferredContact"
                            value="whatsapp"
                            checked={formData.preferredContact === 'whatsapp'}
                            onChange={handleChange}
                            style={radioInputStyle}
                          />
                          <span style={radioTextStyle}>WhatsApp</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group" style={formGroupStyle}>
                      <label htmlFor="source" style={labelStyle}>
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        style={selectStyle}
                        value={formData.source}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        <option value="google">Google Search</option>
                        <option value="social-media">Social Media</option>
                        <option value="friend">Friend or Family</option>
                        <option value="event">Educational Fair/Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group" style={{marginBottom: 'var(--spacing-lg)'}}>
                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        style={checkboxInputStyle}
                      />
                      <span style={checkboxTextStyle}>
                        I agree to the <a href="#" style={linkStyle}>Terms & Conditions</a> and <a href="#" style={linkStyle}>Privacy Policy</a>. <span style={requiredStyle}>*</span>
                      </span>
                    </label>
                    {formErrors.agreeToTerms && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.agreeToTerms}
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
                        Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
          
          <div className="info-sidebar" style={infoSidebarStyle} data-aos="fade-left">
            <div className="contact-info" style={contactInfoStyle}>
              <h3 style={{color: 'var(--primary)', marginBottom: 'var(--spacing-md)'}}>Contact Information</h3>
              <ul style={contactListStyle}>
                <li style={contactItemStyle}>
                  <i className="fas fa-map-marker-alt" style={contactIconStyle}></i>
                  <div>
                    <p style={contactLabelStyle}>Main Office:</p>
                    <p>123 Education Street, Suite 500<br />New York, NY 10001</p>
                  </div>
                </li>
                <li style={contactItemStyle}>
                  <i className="fas fa-phone-alt" style={contactIconStyle}></i>
                  <div>
                    <p style={contactLabelStyle}>Phone:</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </li>
                <li style={contactItemStyle}>
                  <i className="fas fa-envelope" style={contactIconStyle}></i>
                  <div>
                    <p style={contactLabelStyle}>Email:</p>
                    <p>info@studyvista.com</p>
                  </div>
                </li>
                <li style={contactItemStyle}>
                  <i className="fas fa-clock" style={contactIconStyle}></i>
                  <div>
                    <p style={contactLabelStyle}>Hours:</p>
                    <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 2PM</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="social-connect" style={socialConnectStyle}>
              <h3 style={{color: 'var(--primary)', marginBottom: 'var(--spacing-md)'}}>Connect With Us</h3>
              <div className="social-icons" style={socialIconsStyle}>
                <a href="#" style={socialIconStyle} aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" style={socialIconStyle} aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" style={socialIconStyle} aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" style={socialIconStyle} aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" style={socialIconStyle} aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
            
            <div className="testimonial-sidebar" style={testimonialSidebarStyle}>
              <div className="quote-icon" style={quoteIconStyle}>
                <i className="fas fa-quote-left"></i>
              </div>
              <p style={testimonialTextStyle}>
                StudyVista guided me through every step of my application to MIT. Their counselors were incredibly supportive and knowledgeable, making the complex process much easier.
              </p>
              <div className="testimonial-author" style={testimonialAuthorStyle}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Student Testimonial" 
                  style={testimonialImageStyle}
                />
                <div>
                  <p style={testimonialNameStyle}>Michael Chen</p>
                  <p style={testimonialInfoStyle}>Computer Science, MIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="inquiry-faq" style={inquiryFaqStyle}>
        <div className="container">
          <h2 style={{...sectionTitleStyle, textAlign: 'center'}} data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <div className="faq-grid" style={faqGridStyle}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item" 
                style={faqItemStyle}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 style={faqQuestionStyle}>{faq.question}</h3>
                <p style={faqAnswerStyle}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

// Data
const faqs = [
  {
    question: "How long will it take to get a response after submitting my inquiry?",
    answer: "Our education consultants typically respond within 24 hours on business days. You'll receive a personalized email or call based on your preferred contact method."
  },
  {
    question: "Are there any fees for the initial consultation?",
    answer: "No, the initial consultation is completely free. We believe in providing accessible guidance to help you make informed decisions about your education."
  },
  {
    question: "What information should I prepare for the consultation?",
    answer: "Having your academic transcripts, test scores (if available), and a clear idea of your preferences and goals will help our consultants provide more targeted advice during the consultation."
  },
  {
    question: "Can I change my preferred study destination after the initial consultation?",
    answer: "Absolutely! Our goal is to help you find the best fit for your goals. Your preferences may change as you learn more about different options, and we're here to support you throughout that journey."
  },
  {
    question: "Do you provide visa application assistance?",
    answer: "Yes, our services include comprehensive visa guidance, from document preparation to interview coaching, ensuring you're well-prepared for the visa application process."
  },
  {
    question: "I'm not sure what program is right for me. Can you help?",
    answer: "Yes, our expert counselors can help you explore different academic programs based on your interests, skills, and career goals to find the best match for your aspirations."
  }
];

// Styles
const inquiryFormSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'white',
};

const containerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 'var(--spacing-xl)',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 var(--spacing-sm)',
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
};

const formHeaderStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
  textAlign: 'center',
};

const inquiryFormStyle: React.CSSProperties = {
  
};

// We'll define this inside the component to use isMobile state

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

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-sm)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '1rem',
  backgroundColor: 'white',
  transition: 'border-color var(--transition-fast)',
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23667085\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  backgroundSize: '1rem',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-sm)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '1rem',
  resize: 'vertical',
  minHeight: '120px',
  transition: 'border-color var(--transition-fast)',
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-md)',
};

const radioLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const radioInputStyle: React.CSSProperties = {
  marginRight: 'var(--spacing-xs)',
  width: '16px',
  height: '16px',
  accentColor: 'var(--primary)',
};

const radioTextStyle: React.CSSProperties = {
  fontSize: '0.95rem',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
};

const checkboxInputStyle: React.CSSProperties = {
  marginRight: 'var(--spacing-xs)',
  marginTop: '3px',
  width: '16px',
  height: '16px',
  accentColor: 'var(--primary)',
};

const checkboxTextStyle: React.CSSProperties = {
  fontSize: '0.95rem',
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

const infoSidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-lg)',
};

const contactInfoStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
};

const contactListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const contactItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 'var(--spacing-md)',
};

const contactIconStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginRight: 'var(--spacing-sm)',
  fontSize: '1.2rem',
  marginTop: '2px',
};

const contactLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: '2px',
};

const socialConnectStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
};

const socialIconsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const socialIconStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderRadius: '50%',
  fontSize: '1.2rem',
  transition: 'all var(--transition-fast)',
};

const testimonialSidebarStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-md)',
  position: 'relative',
};

const quoteIconStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.1)',
  fontSize: '4rem',
  position: 'absolute',
  top: 'var(--spacing-sm)',
  left: 'var(--spacing-sm)',
};

const testimonialTextStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  lineHeight: 1.6,
  fontStyle: 'italic',
  marginBottom: 'var(--spacing-md)',
  position: 'relative',
  zIndex: 1,
};

const testimonialAuthorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const testimonialImageStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: 'var(--spacing-sm)',
  objectFit: 'cover',
  border: '2px solid white',
};

const testimonialNameStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: '2px',
};

const testimonialInfoStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  opacity: 0.8,
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

const submitAnotherButtonStyle: React.CSSProperties = {
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

const inquiryFaqStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  backgroundColor: 'var(--light-bg)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-xl)',
};

// We'll define this inside the component to use isMobile state

const faqItemStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-md)',
  padding: 'var(--spacing-lg)',
  boxShadow: 'var(--shadow-sm)',
};

const faqQuestionStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-sm)',
  fontSize: '1.1rem',
};

const faqAnswerStyle: React.CSSProperties = {
  color: 'var(--text-dark)',
  lineHeight: 1.6,
};

const errorMessageStyle: React.CSSProperties = {
  color: 'var(--error)',
  fontSize: '0.85rem',
  marginTop: '5px',
};

const requiredStyle: React.CSSProperties = {
  color: 'var(--error)',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--primary)',
  textDecoration: 'underline',
};

export default Inquiry;