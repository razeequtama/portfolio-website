import React from 'react';
import { developerProfile } from '../data/portfolioData';
import mePhoto from '../assets/Me.png';
import { HeroTechGlows } from '../components/welcome/HeroTechGlows';
import { FlipCardName } from '../components/welcome/FlipCardName';
import { HeroPortrait } from '../components/welcome/HeroPortrait';
import { handleDownloadCV } from '../utils/downloadCV';

interface WelcomePageProps {
  onNavigate: (sectionIndex: number) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="page-welcome">
      {/* === CHANGE HERE: Main Hero Intro & Heading === */}
      <section className="welcome-hero">
        {/* Subtle Interactive Tech Logo Background Glows */}
        <HeroTechGlows />

        <div className="welcome-hero-content">
          <h2 className="hero-main-title">
            <span className="hero-title-greeting">Hi, I'm</span>
            <span className="hero-title-space"> </span>
            <br className="hero-title-break-mobile" />
            <span className="hero-title-name">
              <FlipCardName name={developerProfile.name} suffix="." />
            </span>
            <br />
            <span className="hero-title-role">{developerProfile.role}.</span>
          </h2>

          {/* Hero Bio Summary */}
          <p className="hero-bio">
            Aspiring Software Engineer focused on building robust full-stack web applications,
            scalable backend APIs, and efficient systems. Passionate about clean code, strong typing,
            and continuous learning — eager to contribute, deliver impact, and grow as a software engineering intern.
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
              href="#download-cv"
              className="btn-secondary"
              onClick={handleDownloadCV}
            >
              Download CV ↓
            </a>
          </div>
        </div>

        {/* Hero Portrait: Profile image positioned to the right with vintage speech bubble */}
        <HeroPortrait imageSrc={mePhoto} alt={developerProfile.name} />
      </section>
    </div>
  );
};
