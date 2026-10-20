import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, contactData } from '../data/portfolioData';
import { handleDownloadCV } from '../utils/downloadCV';

export const ContactPage: React.FC = () => {
  const contactMeta = portfolioSections[6];

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="page-contact">
      <SectionHeader
        number={contactMeta.number}
        title={contactMeta.title}
        subtitle={contactMeta.subtitle}
      />

      <div className="contact-layout">
        {/* Left Column: Direct Info & Social Profiles */}
        <div className="contact-info-panel">
          <div className="surface-card">
            {/* === CHANGE HERE: Primary Contact Email === */}
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

            {/* Download CV Button */}
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

          {/* Social Links List */}
          <div className="social-links-list">
            {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Social Profile === */}
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

        {/* Right Column: Contact Form Skeleton */}
        <div className="surface-card">
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Send a Direct Message
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Interested in discussing an internship opportunity, collaboration, or software project?
            Send a message below.
          </p>

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
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

