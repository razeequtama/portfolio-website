import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, contactData } from '../data/portfolioData';
import { handleDownloadCV } from '../utils/downloadCV';

export const ContactPage: React.FC = () => {
  const contactMeta = portfolioSections[6];

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formElement = e.currentTarget;
      const data = new FormData(formElement);
      data.append('access_key', 'b77b5cba-89ec-4564-89ba-da731f6ad43c');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const res = await response.json();
      if (res.success) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        formElement.reset();
        setTimeout(() => {
          setFormSubmitted(false);
        }, 6000);
      } else {
        setErrorMessage(res.message || 'Something went wrong. Please try again or reach out directly via email.');
      }
    } catch {
      setErrorMessage('Unable to send message. Please check your connection or reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-contact">
      <SectionHeader
        number={contactMeta.number}
        title={contactMeta.title}
        subtitle={contactMeta.subtitle}
        suit={contactMeta.cardSuit}
      />

      <div className="contact-layout">
        <div className="contact-info-panel">
          <div className="surface-card">
            <div className="contact-meta-row" style={{ marginBottom: '1.25rem' }}>
              <span className="contact-meta-label">Direct Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${contactData.email}`}
                  className="contact-meta-value"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {contactData.email}
                </a>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.2rem 0.6rem', fontSize: 'var(--text-xs)' }}
                  onClick={handleCopyEmail}
                >
                  {copiedEmail ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="contact-meta-row" style={{ marginBottom: '1.25rem' }}>
              <span className="contact-meta-label">Location</span>
              <span className="contact-meta-value">{contactData.location}</span>
            </div>

            <div className="contact-meta-row" style={{ marginBottom: '1.25rem' }}>
              <span className="contact-meta-label">Availability</span>
              <span className="contact-meta-value">{contactData.availability}</span>
            </div>

            <div className="contact-meta-row" style={{ marginBottom: '1.25rem' }}>
              <span className="contact-meta-label">Expected Response</span>
              <span className="contact-meta-value">{contactData.responseTime}</span>
            </div>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleDownloadCV}
              >
                <span>Download Curriculum Vitae (PDF) ↓</span>
              </button>
            </div>
          </div>
          <div className="social-links-list">
            {contactData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <div className="social-link-info">
                  <span className="social-platform-name">{social.platform}</span>
                  <span className="social-handle">{social.handle}</span>
                </div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-color)' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="surface-card">
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Send a Direct Message
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Interested in discussing an internship opportunity, collaboration, or software project?
            Send a message below.
          </p>

          {errorMessage && (
            <div
              className="form-status-alert"
              style={{
                borderColor: '#ef4444',
                color: '#f87171',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                marginBottom: '1rem',
              }}
            >
              {errorMessage}
            </div>
          )}

          {formSubmitted ? (
            <div className="form-status-alert">
              <strong>Message Received!</strong> Thank you for reaching out. I will get back to you shortly.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Software Engineering Internship Opportunity"
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Feel free to share details about the opportunity or what you'd like to collaborate on..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
