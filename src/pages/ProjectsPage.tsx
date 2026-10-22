import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

export const ProjectsPage: React.FC = () => {
  const projectsMeta = portfolioSections[2];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list for quick filtering
  const categories = ['All', 'Full Stack', 'Cloud', 'Systems', 'Frontend'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="page-projects">
      <SectionHeader
        number={projectsMeta.number}
        title={projectsMeta.title}
        subtitle={projectsMeta.subtitle}
        suit={projectsMeta.cardSuit}
      />

      {/* Filter Tabs */}
      <div className="projects-filter-bar" role="tablist" aria-label="Project Categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selectedCategory === category}
            className={`filter-chip ${selectedCategory === category ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Project Card === */}
        {filteredProjects.map((project: ProjectItem) => (
          <article key={project.id} className="surface-card project-card">
            {/* Visual Preview Placeholder */}
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

            {/* Title & Subtitle */}
            <h2 className="project-title">{project.title}</h2>
            <div className="project-subtitle">{project.subtitle}</div>

            {/* Description */}
            <p className="project-desc">{project.description}</p>

            {/* Tech Stack Tags */}
            <div className="project-tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag-badge">
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links (Live & GitHub) */}
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
          </article>
        ))}
        {/* === END OF PROJECT CARD BLOCK === */}
      </div>
    </div>
  );
};
