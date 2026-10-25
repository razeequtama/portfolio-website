import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectCardBack } from '../components/projects/ProjectCardBack';
import { getProjectCardMeta } from '../utils/cardUtils';
import mercuryLogo from '../assets/projects_logos/mercury_logo.svg';
import aegisLogo from '../assets/projects_logos/aegis_logo.svg';
import luxLogoText from '../assets/projects_logos/lux_logo_text.svg';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const renderProjectBrand = (project: ProjectItem) => {
  const titleUpper = project.title.toUpperCase();

  if (titleUpper.includes('MERCURY') || project.id === 'omnitrack-task-hub') {
    return (
      <div className="project-brand-showcase">
        <div className="project-brand-glow glow-mercury" aria-hidden="true" />
        <div className="project-brand-lockup">
          <img
            src={mercuryLogo}
            alt="Mercury logo"
            className="brand-logo-mercury"
            loading="lazy"
            decoding="async"
          />
          <span className="brand-text-mercury">MERCURY</span>
        </div>
      </div>
    );
  }

  if (titleUpper.includes('AEGIS') || project.id === 'fastapi-pulse-service') {
    return (
      <div className="project-brand-showcase">
        <div className="project-brand-glow glow-aegis" aria-hidden="true" />
        <div className="project-brand-lockup">
          <img
            src={aegisLogo}
            alt="Aegis logo"
            className="brand-logo-aegis"
            loading="lazy"
            decoding="async"
          />
          <span className="brand-text-aegis">AEGIS</span>
        </div>
      </div>
    );
  }

  if (titleUpper.includes('LUX') || project.id === 'corecraft-memory-engine') {
    return (
      <div className="project-brand-showcase">
        <div className="project-brand-glow glow-lux" aria-hidden="true" />
        <div className="project-brand-lockup">
          <img
            src={luxLogoText}
            alt="LUX logo and wordmark"
            className="brand-logo-lux"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="project-preview-mock">
      <span>{project.techStack.slice(0, 3).join(' • ')}</span>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLElement>(null);
  const throwTimerRef = useRef<number | null>(null);
  const flipTimerRef = useRef<number | null>(null);

  const [isThrown, setIsThrown] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isFlipped, setIsFlipped] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const handleReveal = useCallback(() => {
    if (throwTimerRef.current !== null) {
      window.clearTimeout(throwTimerRef.current);
      throwTimerRef.current = null;
    }
    if (flipTimerRef.current !== null) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    setIsThrown(true);
    setIsFlipped(true);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const card = cardRef.current;
    if (!card || !('IntersectionObserver' in window)) {
      setIsThrown(true);
      const frame = window.requestAnimationFrame(() => setIsFlipped(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          // 1. Staggered card throw: thrown from outside the screen on the left, one by one
          throwTimerRef.current = window.setTimeout(() => {
            setIsThrown(true);
          }, 80 + index * 340);

          // 2. Staggered flip reveal: once landed, flip one by one
          flipTimerRef.current = window.setTimeout(() => {
            setIsFlipped(true);
          }, 1150 + index * 480);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      if (throwTimerRef.current !== null) {
        window.clearTimeout(throwTimerRef.current);
      }
      if (flipTimerRef.current !== null) {
        window.clearTimeout(flipTimerRef.current);
      }
    };
  }, [index]);

  const meta = getProjectCardMeta(project, index);

  // Flight trajectory parameters per card column (increasing distance & rotation)
  const throwConfigs = [
    { initialY: '-20px', initialRot: '-26deg', overshootX: '12px', overshootRot: '1.6deg' },
    { initialY: '-35px', initialRot: '-30deg', overshootX: '16px', overshootRot: '2.0deg' },
    { initialY: '-45px', initialRot: '-34deg', overshootX: '20px', overshootRot: '2.4deg' },
  ];
  const config = throwConfigs[index % throwConfigs.length];

  return (
    <article
      ref={cardRef}
      className={`surface-card project-card ${isThrown ? 'is-thrown' : 'is-waiting-throw'}`}
      style={{
        '--throw-initial-y': config.initialY,
        '--throw-initial-rot': config.initialRot,
        '--throw-overshoot-x': config.overshootX,
        '--throw-overshoot-rot': config.overshootRot,
      } as React.CSSProperties}
      aria-label={`${project.title} project`}
    >
      <div className={`project-card-inner${isFlipped ? ' is-flipped' : ''}`}>
        <ProjectCardBack
          project={project}
          meta={meta}
          onReveal={handleReveal}
        />

        <div className="project-card-front" inert={!isFlipped}>
          <div
            className="project-preview"
            style={{ background: project.previewGradient }}
          >
            <div className="preview-badge-row">
              <span className="project-category-badge">{project.category}</span>
              {project.featured && (
                <span className="project-category-badge" style={{ borderColor: 'var(--accent-color)' }}>
                  ★ Featured
                </span>
              )}
            </div>
            {renderProjectBrand(project)}
          </div>

          <h2 className="project-title sr-only">{project.title}</h2>
          <div className="project-subtitle">{project.subtitle}</div>
          <p className="project-desc">{project.description}</p>

          <div className="project-tags">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag-badge">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                <span>Live Demo ↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                <span>Source Code [GH] ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProjectsPage: React.FC = () => {
  const projectsMeta = portfolioSections[2];

  return (
    <div className="page-projects">
      <SectionHeader
        number={projectsMeta.number}
        title={projectsMeta.title}
        subtitle={projectsMeta.subtitle}
        suit={projectsMeta.cardSuit}
      />

      <div className="projects-grid">
        {projectsData.map((project: ProjectItem, index: number) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};
