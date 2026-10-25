import React, { useEffect, useState } from 'react';
import { getDeveloperProfile } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import mePhoto from '../assets/Me.avif';
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
  const { language } = useLanguage();
  const profile = getDeveloperProfile(language);

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

  const greetingPrefix = language === 'id' ? 'Saya' : "I'm";

  const heroBio =
    language === 'id'
      ? 'Saya merancang dan membangun sistem terdistribusi yang tangguh, aplikasi web berkinerja tinggi, dan perangkat developer yang andal. Berfokus pada arsitektur deterministik, pengetikan ketat (strict typing), dan pengalaman interaktif yang mulus.'
      : 'I design and build resilient distributed systems, high-performance web applications, and robust developer tooling. Focused on deterministic architectures, strict typing, and fluid interactive experiences.';

  const btnExplore = language === 'id' ? 'Jelajahi Proyek →' : 'Explore Projects →';
  const btnContact = language === 'id' ? 'Hubungi Saya' : 'Get In Touch';
  const btnCV = language === 'id' ? 'Unduh CV ↓' : 'Download CV ↓';

  return (
    <div className="page-welcome">
      <section className="welcome-hero">
        <HeroTechGlows />

        <div className="welcome-hero-content">
          <h2 className="hero-main-title">
            <span className="hero-title-greeting" aria-label={`${greeting}, ${greetingPrefix}`}>
              <span
                className={`hero-title-greeting-word${isGreetingVisible ? '' : ' is-changing'}`}
                aria-hidden="true"
              >
                <bdi dir="auto">{greeting},</bdi>
              </span>{' '}
              {greetingPrefix}
            </span>
            <span className="hero-title-space"> </span>
            <br className="hero-title-break-mobile" />
            <span className="hero-title-name">
              <FlipCardName name={profile.name} suffix="." />
            </span>
            <br />
            <span className="hero-title-role">{profile.role}.</span>
          </h2>

          <p className="hero-bio">{heroBio}</p>

          <div className="welcome-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate(2)}
            >
              {btnExplore}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate(6)}
            >
              {btnContact}
            </button>

            <a
              href="#download-cv"
              className="btn-secondary"
              onClick={handleDownloadCV}
            >
              {btnCV}
            </a>
          </div>
        </div>

        <HeroPortrait imageSrc={mePhoto} alt={profile.name} />
      </section>
    </div>
  );
};
