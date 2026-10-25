import { useState, useEffect, useRef, useCallback } from 'react';
import { getPortfolioSections } from './data/portfolioData';
import { useLanguage } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { TurntableDock } from './components/turntable/TurntableDock';

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
import './styles/scrollReveal.css';

export function App() {
  const { language } = useLanguage();
  const sections = getPortfolioSections(language);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const sectionRefs = useRef<(HTMLElement | null)[]>(
    sections.map(() => null)
  );

  const isProgrammaticScrollRef = useRef<boolean>(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);

  const scrollToSection = useCallback((index: number) => {
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current !== null) {
      clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      programmaticScrollTimerRef.current = null;
    }, 1000);

    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleNext = () => {
    const next = Math.min(activeIndex + 1, sections.length - 1);
    setActiveIndex(next);
    scrollToSection(next);
  };

  const handlePrev = () => {
    const prev = Math.max(activeIndex - 1, 0);
    setActiveIndex(prev);
    scrollToSection(prev);
  };

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
    scrollToSection(index);
  };

  useEffect(() => {
    const revealObservers: IntersectionObserver[] = [];

    sections.forEach((section, i) => {
      if (section.id === 'welcome') return;
      const el = sectionRefs.current[i];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            obs.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      revealObservers.push(obs);
    });

    return () => revealObservers.forEach((obs) => obs.disconnect());
  }, [sections]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((_, i) => {
      const el = sectionRefs.current[i];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isProgrammaticScrollRef.current) {
            setActiveIndex(i);
          }
        },
        {
          threshold: 0.3,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sections]);

  const currentSection = sections[activeIndex];

  const pages = [
    <WelcomePage onNavigate={handleSelectIndex} />,
    <EngineeringPage />,
    <ProjectsPage />,
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
          key={sections[i].id}
          id={sections[i].id}
          ref={(el) => { sectionRefs.current[i] = el; }}
          className={`portfolio-section-block${sections[i].id !== 'welcome' ? ' will-reveal' : ''}`}
          aria-label={sections[i].title}
        >
          {page}
        </section>
      ))}
    </Layout>
  );
}

export default App;
