import { useState, useEffect } from 'react';
import { portfolioSections } from './data/portfolioData';
import { Layout } from './components/layout/Layout';
import { TurntableDock } from './components/turntable/TurntableDock';

// The 7 Dedicated Section Pages
import { WelcomePage } from './pages/WelcomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { TechStackPage } from './pages/TechStackPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import './styles/variables.css';
import './styles/global.css';
import './styles/turntable.css';
import './styles/pages.css';

export function App() {
  // Active card index in the turntable (Single Source of Truth)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Theme state: 'dark' (default) or 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Apply theme to html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Rotation Navigation Handlers (Circular 7-item loop)
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % portfolioSections.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + portfolioSections.length) % portfolioSections.length);
  };

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
  };

  // Page Synchronization: Scroll to top smoothly when active card changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndex]);

  const currentSection = portfolioSections[activeIndex];

  // Render the dedicated page for the selected section
  const renderCurrentPage = () => {
    switch (activeIndex) {
      case 0:
        return <WelcomePage onNavigate={handleSelectIndex} />;
      case 1:
        return <ProjectsPage />;
      case 2:
        return <EngineeringPage />;
      case 3:
        return <ExperiencePage />;
      case 4:
        return <TechStackPage />;
      case 5:
        return <AboutPage />;
      case 6:
        return <ContactPage />;
      default:
        return <WelcomePage onNavigate={handleSelectIndex} />;
    }
  };

  return (
    <Layout
      currentSection={currentSection}
      theme={theme}
      onToggleTheme={toggleTheme}
      dock={
        <TurntableDock
          activeIndex={activeIndex}
          onSelectIndex={handleSelectIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      }
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;
