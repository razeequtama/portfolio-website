import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { getPortfolioSections, getExperienceData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import type { ExperienceItem } from '../types/portfolio';

export const ExperiencePage: React.FC = () => {
  const { language } = useLanguage();
  const experienceMeta = getPortfolioSections(language)[3];
  const experiences = getExperienceData(language);

  return (
    <div className="page-experience">
      <SectionHeader
        number={experienceMeta.number}
        title={experienceMeta.title}
        suit={experienceMeta.cardSuit}
      />

      <div className="timeline-container">
        {experiences.map((item: ExperienceItem) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />

            <div className="surface-card timeline-content-card">
              <div className="timeline-header">
                <h2 className="timeline-role">{item.role}</h2>
              </div>

              <div className="timeline-location">{item.location}</div>

              {item.image && (
                <div className="timeline-image-container">
                  <img
                    src={item.image}
                    alt={item.role}
                    className="timeline-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <div className="timeline-period-badge">{item.period}</div>

              <ul className="timeline-achievements">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="timeline-achievement-item">
                    <span className="timeline-achievement-icon" aria-hidden="true">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {item.techStack && item.techStack.length > 0 && (
                <div className="project-tags" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
                  {item.techStack.map((tech) => (
                    <span key={tech} className="tag-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
