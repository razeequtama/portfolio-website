import { useState, useEffect, useRef, useCallback } from 'react';
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
  // Active card index tracks the currently-visible section (driven by scroll + IntersectionObserver)
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

  // Refs to each section DOM element for scroll-into-view navigation
  const sectionRefs = useRef<(HTMLElement | null)[]>(
    portfolioSections.map(() => null)
  );

  // Scroll the viewport to a section smoothly
  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Navigation handlers: scroll-based
  const handleNext = useCallback(() => {
    const next = Math.min(activeIndex + 1, portfolioSections.length - 1);
    setActiveIndex(next);
    scrollToSection(next);
  }, [activeIndex, scrollToSection]);

  const handlePrev = useCallback(() => {
    const prev = Math.max(activeIndex - 1, 0);
    setActiveIndex(prev);
    scrollToSection(prev);
  }, [activeIndex, scrollToSection]);

  const handleSelectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    scrollToSection(index);
  }, [scrollToSection]);

  // IntersectionObserver: keep activeIndex in sync with the most-visible section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    portfolioSections.forEach((_, i) => {
      const el = sectionRefs.current[i];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        {
          // Trigger when a section occupies at least 30% of the viewport
          threshold: 0.3,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const currentSection = portfolioSections[activeIndex];

  const pages = [
    <WelcomePage onNavigate={handleSelectIndex} />,
    <ProjectsPage />,
    <EngineeringPage />,
    <ExperiencePage />,
    <TechStackPage />,
    <AboutPage />,
    <ContactPage />,
  ];

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
      {pages.map((page, i) => (
        <section
          key={portfolioSections[i].id}
          id={portfolioSections[i].id}
          ref={(el) => { sectionRefs.current[i] = el; }}
          className="portfolio-section-block"
          aria-label={portfolioSections[i].title}
        >
          {page}
        </section>
      ))}
    </Layout>
  );
}

export default App;
