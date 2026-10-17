import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, skillCategories } from '../data/portfolioData';
import type { SkillCategory } from '../types/portfolio';

export const TechStackPage: React.FC = () => {
  const techStackMeta = portfolioSections[4];

  return (
    <div className="page-tech-stack">
      <SectionHeader
        number={techStackMeta.number}
        title={techStackMeta.title}
        subtitle={techStackMeta.subtitle}
        badge={techStackMeta.badge}
      />

      {/* Categorized Skills Grid */}
      <div className="tech-stack-grid">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category Card === */}
        {skillCategories.map((category: SkillCategory) => (
          <div key={category.id} className="surface-card stack-category-card">
            <div className="stack-category-header">
              <h2 className="stack-category-name">{category.name}</h2>
              <span className="card-badge">{category.skills.length} Tools</span>
            </div>
            <p className="stack-category-desc">{category.description}</p>

            {/* Skills List with Proficiency Meters */}
            <div className="skills-list">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-exp">{skill.experienceYears}</span>
                  </div>

                  {/* Proficiency Bar Track */}
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>

                  {skill.highlight && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      ↳ {skill.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* === END OF SKILL CATEGORY BLOCK === */}
      </div>
    </div>
  );
};
