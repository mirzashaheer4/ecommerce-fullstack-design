import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Contact.css';

const CONTACT_INFO = [
  { icon: MapPin, title: 'Address', text: '123 Commerce Street, Islamabad, Pakistan' },
  { icon: Mail, title: 'Email', text: 'support@ecommerce.com' },
  { icon: Phone, title: 'Phone', text: '+92 300 0000000' },
  { icon: Clock, title: 'Hours', text: 'Mon–Sat, 9AM–6PM' },
];

const Contact = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | E-commerce Store';
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast("Message sent! We'll get back to you soon.", 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="contact-page page-animate">
      <div className="container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Have a question or feedback? We'd love to hear from you.</p>

        <div className="contact-layout">
          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="5" value={form.message} onChange={handleChange} placeholder="Write your message..." />
            </div>
            <button type="submit" className="btn-primary contact-submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Info cards */}
          <div className="contact-info">
            {CONTACT_INFO.map((item) => (
              <div key={item.title} className="info-card">
                <div className="info-icon">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
