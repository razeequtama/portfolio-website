import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { getPortfolioSections, getAboutData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const aboutMeta = getPortfolioSections(language)[5];
  const about = getAboutData(language);

  return (
    <div className="page-about">
      <SectionHeader
        number={aboutMeta.number}
        title={aboutMeta.title}
        suit={aboutMeta.cardSuit}
      />

      <div className="surface-card about-intro-card">
        {about.bioParagraphs.map((paragraph, idx) => (
          <p key={idx} className="about-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};
