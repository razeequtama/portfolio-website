import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, experienceData } from '../data/portfolioData';
import type { ExperienceItem } from '../types/portfolio';

export const ExperiencePage: React.FC = () => {
  const experienceMeta = portfolioSections[3];

  return (
    <div className="page-experience">
      <SectionHeader
        number={experienceMeta.number}
        title={experienceMeta.title}
        subtitle={experienceMeta.subtitle}
        suit={experienceMeta.cardSuit}
      />

      {/* Experience Timeline */}
      <div className="timeline-container">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Experience Milestone === */}
        {experienceData.map((item: ExperienceItem) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />

            <div className="surface-card timeline-content-card">
              <div className="timeline-header">
                <div>
                  <h2 className="timeline-role">{item.role}</h2>
                  <div className="timeline-company">{item.company}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {item.featuredBadge && (
                    <span className="card-badge" style={{ borderColor: 'var(--accent-color)' }}>
                      {item.featuredBadge}
                    </span>
                  )}
                  <span className="timeline-period-badge">{item.period}</span>
                </div>
              </div>

              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                📍 {item.location} • {item.type}
              </div>

              <p className="timeline-summary">{item.summary}</p>

              {/* Achievements Checklist */}
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Key Achievements:
              </div>
              <ul className="timeline-achievements">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="timeline-achievement-item">
                    <span className="timeline-achievement-icon">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Used */}
              <div className="project-tags" style={{ marginTop: '1rem', marginBottom: 0 }}>
                {item.techStack.map((tech) => (
                  <span key={tech} className="tag-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* === END OF TIMELINE MILESTONE BLOCK === */}
      </div>
    </div>
  );
};
