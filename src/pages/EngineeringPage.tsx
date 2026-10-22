import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections, engineeringPatterns } from '../data/portfolioData';
import type { ArchitecturePattern } from '../types/portfolio';

export const EngineeringPage: React.FC = () => {
  const engineeringMeta = portfolioSections[1];

  return (
    <div className="page-engineering">
      <SectionHeader
        number={engineeringMeta.number}
        title={engineeringMeta.title}
        subtitle={engineeringMeta.subtitle}
        suit={engineeringMeta.cardSuit}
      />

      {/* Engineering Philosophy Summary */}
      <section className="surface-card engineering-philosophy">
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem', fontWeight: 700 }}>
          Engineering & Architecture Principles
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Writing clean, sustainable software requires thoughtful modularity, disciplined typing, and
          clear trade-off evaluation. Below are architectural case studies and design patterns
          implemented across recent full-stack applications and interactive systems.
        </p>
      </section>

      {/* Architecture Patterns Deep Dive List */}
      <div className="engineering-grid">
        {/* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Engineering Pattern === */}
        {engineeringPatterns.map((pattern: ArchitecturePattern) => (
          <article key={pattern.id} className="surface-card pattern-card">
            {/* Header */}
            <div className="pattern-header">
              <div>
                <h3 className="pattern-title">{pattern.title}</h3>
                <div className="pattern-tagline">{pattern.tagline}</div>
              </div>
              <span className="pattern-category">{pattern.category}</span>
            </div>

            {/* Overview */}
            <p className="pattern-overview">{pattern.overview}</p>

            {/* Key Decisions */}
            <div style={{ marginBottom: '0.75rem', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
              Key Architectural Decisions:
            </div>
            <ul className="pattern-decisions-list">
              {pattern.keyDecisions.map((decision, idx) => (
                <li key={idx} className="pattern-decision-item">
                  <span className="pattern-decision-bullet">→</span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>

            {/* Tradeoffs Pros & Cons */}
            <div className="tradeoffs-split">
              <div className="tradeoff-column">
                <div className="tradeoff-header tradeoff-pros-header">✓ Advantages & Upsides</div>
                <ul className="tradeoff-list">
                  {pattern.tradeoffs.pros.map((pro, idx) => (
                    <li key={idx}>+ {pro}</li>
                  ))}
                </ul>
              </div>

              <div className="tradeoff-column">
                <div className="tradeoff-header tradeoff-cons-header">⚠ Trade-offs & Complexities</div>
                <ul className="tradeoff-list">
                  {pattern.tradeoffs.cons.map((con, idx) => (
                    <li key={idx}>- {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Implementation Box */}
            {pattern.codeSample && (
              <div className="code-snippet-box">
                <div className="code-header">
                  <span>📄 {pattern.codeSample.filename}</span>
                  <span>{pattern.codeSample.language}</span>
                </div>
                <pre className="code-content">
                  <code>{pattern.codeSample.code}</code>
                </pre>
              </div>
            )}
          </article>
        ))}
        {/* === END OF ARCHITECTURE PATTERN BLOCK === */}
      </div>
    </div>
  );
};
