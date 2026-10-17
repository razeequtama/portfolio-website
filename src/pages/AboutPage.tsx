import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, aboutData } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const aboutMeta = portfolioSections[5];

  return (
    <div className="page-about">
      <SectionHeader
        number={aboutMeta.number}
        title={aboutMeta.title}
        subtitle={aboutMeta.subtitle}
        badge={aboutMeta.badge}
      />

      <div className="about-layout">
        {/* === CHANGE HERE: Bio Narrative Paragraphs === */}
        <section className="surface-card about-intro-card">
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {aboutData.headline}
          </h2>
          {aboutData.bioParagraphs.map((paragraph, idx) => (
            <p key={idx} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Interests & Pursuits Outside Code */}
        <section>
          <h3 className="about-section-heading">Personal Pursuits & Craft</h3>
          <div className="interests-grid">
            {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Personal Interest === */}
            {aboutData.personalInterests.map((interest, idx) => (
              <div key={idx} className="surface-card interest-card">
                <span className="interest-tag">{interest.tag}</span>
                <div className="interest-title">{interest.title}</div>
                <p className="interest-desc">{interest.description}</p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 'auto' }}>
                  {interest.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h3 className="about-section-heading">Core Engineering Values</h3>
          <div className="values-grid">
            {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Core Value === */}
            {aboutData.coreValues.map((value, idx) => (
              <div key={idx} className="surface-card value-card">
                <h4 className="value-title">{value.title}</h4>
                <div className="value-tagline">{value.tagline}</div>
                <p className="value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Trajectory */}
        <section className="surface-card">
          <h3 className="about-section-heading" style={{ marginBottom: '0.75rem' }}>
            Current Horizons & Trajectory
          </h3>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {aboutData.careerTrajectory.map((item, idx) => (
              <li key={idx} style={{ fontSize: 'var(--text-sm)' }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

