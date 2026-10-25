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
        suit={aboutMeta.cardSuit}
      />

      <div className="surface-card about-intro-card">
        {aboutData.bioParagraphs.map((paragraph, idx) => (
          <p key={idx} className="about-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
