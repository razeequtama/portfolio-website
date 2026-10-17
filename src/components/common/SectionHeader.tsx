import React from 'react';

interface SectionHeaderProps {
  number?: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
}) => {
  return (
    <header className="section-header">
      {badge && (
        <div className="section-number-pill">
          <span>{badge}</span>
        </div>
      )}
      <h1 className="section-title">{title}</h1>
      <p className="section-subtitle">{subtitle}</p>
    </header>
  );
};
