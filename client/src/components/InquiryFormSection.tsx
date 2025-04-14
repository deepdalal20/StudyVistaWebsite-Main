import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  destination: string;
  message: string;
}

const InquiryFormSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    destination: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Phone validation (simple)
    const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError('Please enter a valid phone number');
      return;
    }
    
    // Form submission would normally go to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    setFormError('');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      destination: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section className="cta-section" id="inquiry-form" style={ctaSectionStyle}>
      <div className="container">
        <div className="cta-content" style={ctaContentStyle} data-aos="fade-up">
          <h2>Start Your Journey Today</h2>
          <p>Fill out the form below to get personalized guidance from our expert counselors.</p>
        </div>
        <form className="cta-form" style={ctaFormStyle} onSubmit={handleSubmit} data-aos="fade-up">
          <h3 className="form-title" style={formTitleStyle}>
lorem Ipsum Emet.
          </h3>
          
          {formSubmitted && (
            <div className="form-success" style={formSuccessStyle}>
              Thank you for your inquiry! Our counselors will contact you shortly.
            </div>
          )}
          
          {formError && (
            <div className="form-error" style={formErrorStyle}>
              {formError}
            </div>
          )}
          
          <div className="form-grid" style={formGridStyle}>
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="firstName" className="form-label" style={formLabelStyle}>First Name</label>
              <input 
                type="text" 
                id="firstName" 
                className="form-control" 
                style={formControlStyle} 
                placeholder="Your first name" 
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="lastName" className="form-label" style={formLabelStyle}>Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                className="form-control" 
                style={formControlStyle} 
                placeholder="Your last name" 
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="email" className="form-label" style={formLabelStyle}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                style={formControlStyle} 
                placeholder="Your email address" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="phone" className="form-label" style={formLabelStyle}>Mobile Number</label>
              <input 
                type="tel" 
                id="phone" 
                className="form-control" 
                style={formControlStyle} 
                placeholder="Your phone number" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="city" className="form-label" style={formLabelStyle}>City</label>
              <input 
                type="text" 
                id="city" 
                className="form-control" 
                style={formControlStyle} 
                placeholder="Your city" 
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="destination" className="form-label" style={formLabelStyle}>Preferred Destination</label>
              <select 
                id="destination" 
                className="form-control" 
                style={formControlStyle} 
                value={formData.destination}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Please select an option...</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="new-zealand">New Zealand</option>
                <option value="singapore">Singapore</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group full-width" style={{ ...formGroupStyle, gridColumn: '1 / -1' }}>
              <label htmlFor="message" className="form-label" style={formLabelStyle}>Message</label>
              <textarea 
                id="message" 
                className="form-control" 
                style={formControlStyle} 
                rows={4} 
                placeholder="Write your comment here..." 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          <button type="submit" className="btn-submit" style={btnSubmitStyle}>
            Submit Now
          </button>
        </form>
      </div>
    </section>
  );
};

// Styles
const ctaSectionStyle: React.CSSProperties = {
  padding: 'var(--spacing-xl) 0',
  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
  color: 'white',
  textAlign: 'center',
};

const ctaContentStyle: React.CSSProperties = {
  maxWidth: '700px',
  margin: '0 auto',
};

const ctaFormStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: 'white',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-lg)',
};

const formTitleStyle: React.CSSProperties = {
  color: 'var(--primary)',
  marginBottom: 'var(--spacing-md)',
  textAlign: 'center',
};

const formSuccessStyle: React.CSSProperties = {
  backgroundColor: 'var(--success)',
  color: 'white',
  padding: 'var(--spacing-sm)',
  borderRadius: 'var(--border-radius-md)',
  marginBottom: 'var(--spacing-md)',
  textAlign: 'center',
};

const formErrorStyle: React.CSSProperties = {
  backgroundColor: 'var(--error)',
  color: 'white',
  padding: 'var(--spacing-sm)',
  borderRadius: 'var(--border-radius-md)',
  marginBottom: 'var(--spacing-md)',
  textAlign: 'center',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--spacing-md)',
  marginBottom: 'var(--spacing-md)',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
};

const formLabelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--spacing-xs)',
  color: 'var(--text-dark)',
  fontWeight: 500,
};

const formControlStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-sm)',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--border-radius-md)',
  transition: 'border-color var(--transition-fast)',
  '&:focus': {
    outline: 'none',
    borderColor: 'var(--accent)',
  },
};

const btnSubmitStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  padding: 'var(--spacing-sm) var(--spacing-md)',
  border: 'none',
  borderRadius: 'var(--border-radius-md)',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color var(--transition-fast)',
  width: '100%',
  '&:hover': {
    backgroundColor: 'var(--primary-light)',
  }
};

export default InquiryFormSection;
