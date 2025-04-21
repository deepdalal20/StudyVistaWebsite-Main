import React, { useState } from 'react';
import styles from './InquiryFormSection.module.css';

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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError('Please enter a valid phone number');
      return;
    }

    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormError('');

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      destination: '',
      message: ''
    });

    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section className={styles.ctaSection} id="inquiry-form">
      <div className="container">
        <div className={styles.ctaContent} data-aos="fade-up">
          <h2>Start Your Journey Today</h2>
          <p>Fill out the form below to get personalized guidance from our expert counselors.</p>
        </div>

        <form className={styles.ctaForm} onSubmit={handleSubmit} data-aos="fade-up">
          <h3 className={styles.formTitle}>Lorem Ipsum Emet.</h3>

          {formSubmitted && <div className={styles.formSuccess}>Thank you for your inquiry! Our counselors will contact you shortly.</div>}
          {formError && <div className={styles.formError}>{formError}</div>}

          <div className={styles.formGrid}>
            {[
              { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'Your first name' },
              { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Your last name' },
              { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Your email address' },
              { id: 'phone', label: 'Mobile Number', type: 'tel', placeholder: 'Your phone number' },
              { id: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
            ].map(({ id, label, type, placeholder }) => (
              <div className={styles.formGroup} key={id}>
                <label htmlFor={id} className={styles.formLabel}>{label}</label>
                <input
                  id={id}
                  type={type}
                  className={styles.formControl}
                  placeholder={placeholder}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className={styles.formGroup}>
              <label htmlFor="destination" className={styles.formLabel}>Preferred Destination</label>
              <select
                id="destination"
                className={styles.formControl}
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

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="message" className={styles.formLabel}>Message</label>
              <textarea
                id="message"
                className={styles.formControl}
                rows={4}
                placeholder="Write your comment here..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Submit Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default InquiryFormSection;
