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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const formRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? 'var(--spacing-sm)' : 'var(--spacing-md)',
    marginBottom: isMobile ? 'var(--spacing-sm)' : 'var(--spacing-md)',
  };

  const faqGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile
      ? '1fr'
      : isTablet
      ? 'repeat(auto-fill, minmax(300px, 1fr))'
      : 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '3fr 2fr' : '2fr 1fr',
    gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-xl)',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isMobile ? '0 var(--spacing-xs)' : '0 var(--spacing-sm)',
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
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
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
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
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      setSubmitting(false);
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
        agreeToTerms: false,
      });
      window.scrollTo({
        top: document.getElementById('inquiry-form')?.offsetTop || 0,
        behavior: 'smooth',
      });
    }, 1500);
  };

  return (
    <div className="inquiry-page" >
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
                <h2 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Thank You!</h2>
                <p>
                  Your inquiry has been successfully submitted. One of our education consultants will contact you within
                  24 hours to discuss your study abroad options.
                </p>
                <button style={submitAnotherButtonStyle} onClick={() => setFormSubmitted(false)}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="form-header" style={formHeaderStyle} data-aos="fade-up">
                  <h2 style={{ color: 'var(--primary)' }}>Start Your International Education Journey</h2>
                  <p>
                    Fill out the form below and our education consultants will contact you with personalized guidance
                    based on your academic goals and preferences.
                  </p>
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
                          borderColor: formErrors.firstName ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.lastName ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.email ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.phone ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.educationLevel ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.interestedCountry ? 'var(--error)' : 'var(--gray-300)',
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
                          borderColor: formErrors.interestedProgram ? 'var(--error)' : 'var(--gray-300)',
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

                  <div className="form-group" style={{ ...formGroupStyle, marginBottom: 'var(--spacing-md)' }}>
                    <label htmlFor="message" style={labelStyle}>
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={isMobile ? 3 : 4}
                      style={textareaStyle}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide any specific questions or information that will help us provide better guidance."
                    ></textarea>
                  </div>

                  <div className="form-row" style={formRowStyle}>
                    <div className="form-group" style={formGroupStyle}>
                      <label style={{ ...labelStyle, marginBottom: 'var(--spacing-xs)' }}>
                        Preferred Contact Method
                      </label>
                      <div style={{ ...radioGroupStyle, flexDirection: isMobile ? 'column' : 'row' }}>
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

                  <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        style={checkboxInputStyle}
                      />
                      <span style={checkboxTextStyle}>
                        I agree to the <a href="#" style={linkStyle}>Terms & Conditions</a> and{' '}
                        <a href="#" style={linkStyle}>Privacy Policy</a>. <span style={requiredStyle}>*</span>
                      </span>
                    </label>
                    {formErrors.agreeToTerms && (
                      <div className="error-message" style={errorMessageStyle}>
                        {formErrors.agreeToTerms}
                      </div>
                    )}
                  </div>

                  <button type="submit" style={submitButtonStyle} disabled={submitting}>
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

          <div className="info-sidebar" style={{ ...infoSidebarStyle, order: isMobile ? -1 : 0 }} data-aos="fade-left">
            <div className="contact-info" style={contactInfoStyle}>
              <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Contact Information</h3>
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
  <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>Connect With Us</h3>
  <div className="social-icons" style={{ ...socialIconsStyle, flexWrap: 'wrap' }}>
    <a href="#" style={socialIconStyle} className="social-icon" aria-label="Facebook">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="#" style={socialIconStyle} className="social-icon" aria-label="Instagram">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="#" style={socialIconStyle} className="social-icon" aria-label="Twitter">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="#" style={socialIconStyle} className="social-icon" aria-label="LinkedIn">
      <i className="fab fa-linkedin-in"></i>
    </a>
    <a href="#" style={socialIconStyle} className="social-icon" aria-label="WhatsApp">
      <i className="fab fa-whatsapp"></i>
    </a>
  </div>
</div>

            <div className="testimonial-sidebar" style={testimonialSidebarStyle}>
              <div className="quote-icon" style={quoteIconStyle}>
                <i className="fas fa-quote-left"></i>
              </div>
              <p style={testimonialTextStyle}>
                StudyVista guided me through every step of my application to MIT. Their counselors were incredibly
                supportive and knowledgeable, making the complex process much easier.
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
          <h2 style={{ ...sectionTitleStyle, textAlign: 'center' }} data-aos="fade-up">
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
        <style>
          {
            `
            .social-icon:hover {
  background-color: #f97316 !important; /* Orange */
  transform: scale(1.1);
}
            
            /* Inquiry.css */
.inquiry-page {
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden !important;
}

.inquiry-form-section,
.inquiry-faq {
  width: 100%;
}

/* Mobile devices (up to 768px) */
@media (max-width: 768px) {
  .inquiry-form-section .container {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }

  .form-container {
    padding: 16px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .form-header p {
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .form-row {
    gap: 12px;
  }

  input,
  select,
  textarea {
    font-size: 0.85rem;
    padding: 8px;
  }

  .submit-button {
    padding: 10px;
    font-size: 0.9rem;
  }

  .info-sidebar {
    gap: 16px;
  }

  .contact-info,
  .social-connect,
  .testimonial-sidebar {
    padding: 16px;
  }

  .contact-item {
    font-size: 0.85rem;
  }

  .social-icons {
    gap: 8px;
    justify-content: center;
  }

  .social-icon {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .testimonial-text {
    font-size: 0.9rem;
  }

  .testimonial-image {
    width: 36px;
    height: 36px;
  }

  .inquiry-faq h2 {
    font-size: 1.25rem;
  }

  .faq-grid {
    gap: 16px;
  }

  .faq-item {
    padding: 16px;
  }

  .faq-question {
    font-size: 0.95rem;
  }

  .faq-answer {
    font-size: 0.85rem;
  }
}

/* Tablet devices (769px to 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .inquiry-form-section .container {
    grid-template-columns: 3fr 2fr;
    padding: 0 24px;
  }

  .form-container {
    padding: 24px;
  }

  .form-header h2 {
    font-size: 1.75rem;
  }

  .form-header p {
    font-size: 1rem;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-row {
    gap: 16px;
  }

  input,
  select,
  textarea {
    font-size: 0.9rem;
    padding: 10px;
  }

  .submit-button {
    padding: 12px;
    font-size: 0.95rem;
  }

  .info-sidebar {
    gap: 20px;
  }

  .contact-info,
  .social-connect,
  .testimonial-sidebar {
    padding: 20px;
  }

  .contact-item {
    font-size: 0.9rem;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }

  .testimonial-text {
    font-size: 0.95rem;
  }

  .inquiry-faq h2 {
    font-size: 1.5rem;
  }

  .faq-grid {
    gap: 20px;
  }

  .faq-item {
    padding: 20px;
  }

  .faq-question {
    font-size: 1rem;
  }

  .faq-answer {
    font-size: 0.9rem;
  }
}

/* Desktop and larger screens (1025px and up) */
@media (min-width: 1025px) {
  .inquiry-form-section .container {
    grid-template-columns: 2fr 1fr;
    padding: 0 32px;
  }

  .form-container {
    padding: 32px;
  }

  .form-header h2 {
    font-size: 2rem;
  }

  .form-header p {
    font-size: 1.1rem;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-row {
    gap: 20px;
  }

  input,
  select,
  textarea {
    font-size: 1rem;
    padding: 12px;
  }

  .submit-button {
    padding: 14px;
    font-size: 1rem;
  }

  .info-sidebar {
    gap: 24px;
  }

  .contact-info,
  .social-connect,
  .testimonial-sidebar {
    padding: 24px;
  }

  .contact-item {
    font-size: 0.95rem;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .inquiry-faq h2 {
    font-size: 1.75rem;
  }

  .faq-grid {
    gap: 24px;
  }

  .faq-item {
    padding: 24px;
  }

  .faq-question {
    font-size: 1.1rem;
  }

  .faq-answer {
    font-size: 0.95rem;
  }
}

/* Ensure inputs are touch-friendly */
input,
select,
textarea,
button {
  min-height: 44px;
  touch-action: manipulation;
}

/* Hover effects for non-touch devices */
@media (hover: hover) {
  .submit-button:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }

  .social-icon:hover {
    background-color: var(--primary-dark);
    transform: scale(1.1);
  }

  .submit-another-button:hover {
    background-color: var(--primary-dark);
  }
}

/* Accessibility adjustments */
:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
            `
          }
        </style>
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
    answer: "Our education consultants typically respond within 24 hours on business days. You'll receive a personalized email or call based on your preferred contact method.",
  },
  {
    question: "Are there any fees for the initial consultation?",
    answer: "No, the initial consultation is completely free. We believe in providing accessible guidance to help you make informed decisions about your education.",
  },
  {
    question: "What information should I prepare for the consultation?",
    answer: "Having your academic transcripts, test scores (if available), and a clear idea of your preferences and goals will help our consultants provide more targeted advice during the consultation.",
  },
  {
    question: "Can I change my preferred study destination after the initial consultation?",
    answer: "Absolutely! Our goal is to help you find the best fit for your goals. Your preferences may change as you learn more about different options, and we're here to support you throughout that journey.",
  },
  {
    question: "Do you provide visa application assistance?",
    answer: "Yes, our services include comprehensive visa guidance, from document preparation to interview coaching, ensuring you're well-prepared for the visa application process.",
  },
  {
    question: "I'm not sure what program is right for me. Can you help?",
    answer: "Yes, our expert counselors can help you explore different academic programs based on your interests, skills, and career goals to find the best match for your aspirations.",
  },
];

// Styles
const inquiryFormSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-lg) 0',
  backgroundColor: 'white',
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-md)',
  boxShadow: 'var(--shadow-md)',
};

const formHeaderStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-lg)',
  textAlign: 'center',
};

const inquiryFormStyle: React.CSSProperties = {};

const formGroupStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-sm)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--spacing-xs)',
  color: 'var(--text-dark)',
  fontWeight: 500,
  fontSize: '0.95rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-xs)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '0.9rem',
  transition: 'border-color var(--transition-fast)',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-xs)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '0.9rem',
  backgroundColor: 'white',
  transition: 'border-color var(--transition-fast)',
  appearance: 'none',
  backgroundImage:
    'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23667085\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
  backgroundSize: '0.9rem',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-xs)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  fontSize: '0.9rem',
  resize: 'vertical',
  minHeight: '100px',
  transition: 'border-color var(--transition-fast)',
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-sm)',
};

const radioLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const radioInputStyle: React.CSSProperties = {
  marginRight: 'var(--spacing-xs)',
  width: '14px',
  height: '14px',
  accentColor: 'var(--primary)',
};

const radioTextStyle: React.CSSProperties = {
  fontSize: '0.9rem',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
};

const checkboxInputStyle: React.CSSProperties = {
  marginRight: 'var(--spacing-xs)',
  marginTop: '3px',
  width: '14px',
  height: '14px',
  accentColor: 'var(--primary)',
};

const checkboxTextStyle: React.CSSProperties = {
  fontSize: '0.9rem',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-xs) var(--spacing-lg)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontSize: '0.95rem',
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
  width: '14px',
  height: '14px',
  border: '2px solid rgba(255,255,255,0.3)',
  borderRadius: '50%',
  borderTopColor: 'white',
  animation: 'spin 1s ease-in-out infinite',
  marginRight: 'var(--spacing-xs)',
};

const infoSidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-md)',
};

const contactInfoStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-md)',
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
  marginBottom: 'var(--spacing-sm)',
};

const contactIconStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginRight: 'var(--spacing-xs)',
  fontSize: '1rem',
  marginTop: '2px',
};

const contactLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: '2px',
  fontSize: '0.9rem',
};

const socialConnectStyle: React.CSSProperties = {
  backgroundColor: 'var(--light-bg)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-md)',
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
  width: '36px',
  height: '36px',
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderRadius: '50%',
  fontSize: '1rem',
  transition: 'all var(--transition-fast)',
};

const testimonialSidebarStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--spacing-md)',
  boxShadow: 'var(--shadow-md)',
  position: 'relative',
};

const quoteIconStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.1)',
  fontSize: '3rem',
  position: 'absolute',
  top: 'var(--spacing-xs)',
  left: 'var(--spacing-xs)',
};

const testimonialTextStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  lineHeight: 1.5,
  fontStyle: 'italic',
  marginBottom: 'var(--spacing-sm)',
  position: 'relative',
  zIndex: 1,
};

const testimonialAuthorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const testimonialImageStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: 'var(--spacing-xs)',
  objectFit: 'cover',
  border: '2px solid white',
};

const testimonialNameStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: '2px',
  fontSize: '0.9rem',
};

const testimonialInfoStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  opacity: 0.8,
};

const formSuccessStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: 'var(--spacing-lg) var(--spacing-md)',
};

const successIconStyle: React.CSSProperties = {
  fontSize: '3rem',
  color: 'var(--success)',
  marginBottom: 'var(--spacing-md)',
};

const submitAnotherButtonStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-xs) var(--spacing-md)',
  borderRadius: 'var(--border-radius-md)',
  border: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
  marginTop: 'var(--spacing-md)',
};

const inquiryFaqStyle: React.CSSProperties = {
  padding: 'var(--spacing-lg) 0',
  backgroundColor: 'var(--light-bg)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-lg)',
  fontSize: '1.5rem',
};

const faqItemStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 'var(--border-radius-md)',
  padding: 'var(--spacing-md)',
  boxShadow: 'var(--shadow-sm)',
};

const faqQuestionStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-sm)',
  fontSize: '1rem',
};

const faqAnswerStyle: React.CSSProperties = {
  color: 'var(--text-dark)',
  lineHeight: 1.5,
  fontSize: '0.9rem',
};

const errorMessageStyle: React.CSSProperties = {
  color: 'var(--error)',
  fontSize: '0.8rem',
  marginTop: '4px',
};

const requiredStyle: React.CSSProperties = {
  color: 'var(--error)',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--primary)',
  textDecoration: 'underline',
};

export default Inquiry;