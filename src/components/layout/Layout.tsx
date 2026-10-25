import React from 'react';
import type { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import type { SectionMeta } from '../../types/portfolio';

interface LayoutProps {
  currentSection: SectionMeta;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  children: ReactNode;
  dock?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentSection,
  theme,
  onToggleTheme,
  children,
  dock,
}) => {
  return (
    <div className="app-container">
      <div className="top-controls-bar">
        <LanguageToggle />
        <ThemeToggle
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>
      <main
        className="main-viewport"
        id="main-content"
        role="main"
        aria-label={`${currentSection.title} Section Content`}
      >
        {children}
      </main>
      {dock}
    </div>
  );
};
