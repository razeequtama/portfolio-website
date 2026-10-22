import React, { useEffect, useState } from 'react';
import { developerProfile } from '../data/portfolioData';
import mePhoto from '../assets/Me.png';
import { HeroTechGlows } from '../components/welcome/HeroTechGlows';
import { FlipCardName } from '../components/welcome/FlipCardName';
import { HeroPortrait } from '../components/welcome/HeroPortrait';
import { handleDownloadCV } from '../utils/downloadCV';

const greetings = [
  '你好',
  'Hola',
  'Hi',
  'नमस्ते',
  'হ্যালো',
  'Olá',
  'Привет',
  'こんにちは',
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'नमस्कार',
  'నమస్కారం',
  'Bonjour',
  'Hallo',
  '안녕하세요',
  'Xin chào',
  'வணக்கம்',
  'Ciao',
  'مرحبًا',
  'Merhaba',
  'السلام علیکم',
  'Halo',
  'Jambo',
  'سلام',
  'Kumusta',
  'Cześć',
];
const initialGreetingIndex = 2;

interface WelcomePageProps {
  onNavigate: (sectionIndex: number) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  const [greeting, setGreeting] = useState(greetings[initialGreetingIndex]);
  const [isGreetingVisible, setIsGreetingVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let greetingIndex = initialGreetingIndex;
    let timer: number;

    const showNextGreeting = () => {
      setIsGreetingVisible(false);
      timer = window.setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        setGreeting(greetings[greetingIndex]);
        setIsGreetingVisible(true);
        timer = window.setTimeout(showNextGreeting, 2300);
      }, 250);
    };

    timer = window.setTimeout(showNextGreeting, 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-welcome">
      {/* === CHANGE HERE: Main Hero Intro & Heading === */}
      <section className="welcome-hero">
        {/* Subtle Interactive Tech Logo Background Glows */}
        <HeroTechGlows />

        <div className="welcome-hero-content">
          <h2 className="hero-main-title">
            <span className="hero-title-greeting" aria-label="Hi, I'm">
              <span
                className={`hero-title-greeting-word${isGreetingVisible ? '' : ' is-changing'}`}
                aria-hidden="true"
              >
                <bdi dir="auto">{greeting},</bdi>
              </span>{' '}
              I'm
            </span>
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
