import React from 'react';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
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
      <Navbar
        currentSection={currentSection}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main
        className="main-viewport"
        id="main-content"
        role="main"
        aria-label={`${currentSection.title} Section Content`}
      >
        <div key={currentSection.id} className="page-content-wrapper">
          {children}
        </div>
      </main>
      {dock}
    </div>
  );
};
