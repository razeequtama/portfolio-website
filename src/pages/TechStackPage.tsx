import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { getPortfolioSections, getSkillCategories } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { TechIcon } from '../components/tech/TechIcon';
import type { SkillCategory } from '../types/portfolio';

export const TechStackPage: React.FC = () => {
  const { language } = useLanguage();
  const techStackMeta = getPortfolioSections(language)[4];
  const categories = getSkillCategories(language);

  return (
    <div className="page-tech-stack">
      <SectionHeader
        number={techStackMeta.number}
        title={techStackMeta.title}
        suit={techStackMeta.cardSuit}
      />

      <div className="tech-stack-grid">
        {categories.map((category: SkillCategory) => (
          <div key={category.id} className="surface-card stack-category-card">
            <div className="stack-category-header">
              <h2 className="stack-category-name">{category.name}</h2>
            </div>

            <div className="tech-chips-wrap">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="tech-chip"
                  style={{ '--tech-color': skill.color || 'var(--accent-color)' } as React.CSSProperties}
                >
                  <span className="tech-chip-icon">
                    <TechIcon name={skill.name} size={18} />
                  </span>
                  <span className="tech-chip-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
