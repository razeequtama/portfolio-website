import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { portfolioSections } from '../data/portfolioData';

const forecastApiChecks = [
  'HTTP status',
  'Response schema',
  'Forecast periods',
  'Expected values',
  'Error handling',
  'Integration behavior',
];

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

      <section className="engineering-focus" aria-labelledby="engineering-focus-heading">
        <header className="engineering-intro">
          <h2 id="engineering-focus-heading">
            Make it <span>fit</span>. Make it <span>work</span>.
          </h2>
          <p>
            I start with the behavior a problem calls for, then look for an implementation
            that is correct, understandable, and practical. Not complexity for its own sake.
          </p>
        </header>

        <div className="engineering-grid">
          <article className="surface-card engineering-card">
            <div className="engineering-card-heading">
              <span className="engineering-card-number">01</span>
              <h3>Fit the problem, not the pattern.</h3>
            </div>
            <p>
              Technical sophistication is not the goal. The constraints and intended
              behavior should shape the solution.
            </p>
            <div className="engineering-sequence" aria-label="Start with the need, account for constraints, and check the behavior">
              <span>Need</span>
              <span aria-hidden="true">→</span>
              <span>Constraints</span>
              <span aria-hidden="true">→</span>
              <span>Behavior</span>
            </div>
          </article>

          <article className="surface-card engineering-card">
            <div className="engineering-card-heading">
              <span className="engineering-card-number">02</span>
              <h3>Pay attention to the joins.</h3>
            </div>
            <p>
              I’ve worked across these parts of projects, and I’m interested in how each
              responsibility affects the next without assuming one structure fits every system.
            </p>
          </article>

          <article className="surface-card engineering-card engineering-evidence">
            <div className="engineering-evidence-copy">
              <div className="engineering-card-heading">
                <span className="engineering-card-number">03</span>
                <h3>Check what the API promises.</h3>
              </div>
              <p>
                I’ve worked on verifying Mercury’s, Aegis', and Lux's forecast API. Their automated tests compare
                responses with known expected outputs across these behaviors.
              </p>
            </div>

            <div className="engineering-evidence-details">
              <div className="engineering-checks">
                <p className="engineering-detail-label">API contract checks</p>
                <ul>
                  {forecastApiChecks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
              <p className="engineering-scope-note">
                <span>Different question</span>
                A correct API response does not establish real-world forecast accuracy.
                Model accuracy is not evaluated here.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
