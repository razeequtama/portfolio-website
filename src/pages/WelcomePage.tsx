import React from 'react';
import { developerProfile } from '../data/portfolioData';

interface WelcomePageProps {
  onNavigate: (sectionIndex: number) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="page-welcome">
      {/* === CHANGE HERE: Main Hero Intro & Heading === */}
      <section className="welcome-hero">
        <h2 className="hero-main-title">
          Hi, I am <span className="hero-highlight-name">{developerProfile.name}</span>.
          <br />
          {developerProfile.role}.
        </h2>

        {/* === CHANGE HERE: Bio Summary Text === */}
        <p className="hero-bio">
          I design and build resilient distributed systems, high-performance web applications,
          and robust developer tooling. Focused on deterministic architectures, strict typing,
          and fluid interactive experiences.
        </p>

        {/* Action Buttons to Jump Directly to Other Sections */}
        <div className="welcome-actions">
          {/* Jump to Projects (index 1) */}
          <button
            type="button"
            className="btn-primary"
            onClick={() => onNavigate(1)}
          >
            Explore Projects →
          </button>

          {/* Jump to Contact (index 6) */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onNavigate(6)}
          >
            Get In Touch
          </button>

          {/* Direct CV Download Link */}
          <a
            href="#cv-download"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              alert('CV download placeholder. Replace with your hosted resume PDF link!');
            }}
          >
            Download CV ↓
          </a>
        </div>
      </section>

      {/* Metrics / At-a-Glance Statistics Grid */}
      <section className="metrics-grid" aria-label="Key Highlights and Metrics">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Metric Card === */}
        <div className="surface-card metric-card">
          <div className="metric-value">{developerProfile.yearsExperience}</div>
          <div className="metric-label">Engineering Experience</div>
        </div>

        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Metric Card === */}
        <div className="surface-card metric-card">
          <div className="metric-value">{developerProfile.projectsShipped}</div>
          <div className="metric-label">Shipped to Production</div>
        </div>

        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Metric Card === */}
        <div className="surface-card metric-card">
          <div className="metric-value">{developerProfile.systemReliability}</div>
          <div className="metric-label">Uptime & Reliability SLA</div>
        </div>
      </section>

      {/* Quick Callouts Grid */}
      <section className="welcome-callouts" aria-label="Engineering Focus Callouts">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Callout Card === */}
        <div className="surface-card callout-card">
          <div className="callout-icon-title">
            <span>⚡</span>
            <span>Frontend & Interactive Systems</span>
          </div>
          <p className="callout-desc">
            Deep expertise in React 19, TypeScript, state synchronization, canvas rendering,
            and 60fps gesture-driven interfaces like the turntable dock below.
          </p>
        </div>

        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Callout Card === */}
        <div className="surface-card callout-card">
          <div className="callout-icon-title">
            <span>🛡️</span>
            <span>System Design & Architecture</span>
          </div>
          <p className="callout-desc">
            Proven track record designing scalable microservices, event-driven CQRS pipelines,
            and caching tiers that handle high concurrency with predictable latency.
          </p>
        </div>

        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Callout Card === */}
        <div className="surface-card callout-card">
          <div className="callout-icon-title">
            <span>🔧</span>
            <span>Developer Tooling & DX</span>
          </div>
          <p className="callout-desc">
            Obsessed with fast iteration loops: AST transforms, monorepos, automated regression suites,
            and comprehensive architectural RFCs.
          </p>
        </div>
      </section>
    </div>
  );
};
