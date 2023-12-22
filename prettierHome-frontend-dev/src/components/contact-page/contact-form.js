import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './contact-form.scss';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    recaptchaValue: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRecaptchaChange = (value) => {
    setFormData({
      ...formData,
      recaptchaValue: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.recaptchaValue) {
      console.error('reCAPTCHA doğrulaması başarısız.');
      return;
    }
    console.log('Form Gönderildi:', formData);
  };
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h5>Have a question? Get in touch!</h5>
      <label>
        First Name
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </label>
      <label>
        Last Name
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </label>
      <label>
        Email
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Message
        <textarea name="message" value={formData.message} onChange={handleInputChange} />
      </label>
        {/* reCAPTCHA bileşeni */}
        <ReCAPTCHA  className=' mb-3' 
          sitekey="6Lcl5R0pAAAAALmw9VGsPrJGtskYgAar9pb21RAJ"
          onChange={handleRecaptchaChange}
        />
      <button type="submit">Send</button>
    </form>
  );
};
export default ContactForm;