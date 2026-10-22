import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isFlipped, setIsFlipped] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const card = cardRef.current;
    if (!card || !('IntersectionObserver' in window)) {
      const frame = window.requestAnimationFrame(() => setIsFlipped(true));
      return () => window.cancelAnimationFrame(frame);
    }

    let revealTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          revealTimer = window.setTimeout(() => setIsFlipped(true), 1500);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(card);
    return () => {
      observer.disconnect();
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="surface-card project-card"
      aria-label={`${project.title} project`}
    >
      <div className={`project-card-inner${isFlipped ? ' is-flipped' : ''}`}>
        <div className="project-card-back" aria-hidden="true">
          <span className="project-card-back-suit">♦</span>
          <span className="project-card-back-title">{project.title}</span>
        </div>

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
            <div className="project-preview-mock">
              <span>{project.techStack.slice(0, 3).join(' • ')}</span>
            </div>
          </div>

          <h2 className="project-title">{project.title}</h2>
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
        {projectsData.map((project: ProjectItem) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
