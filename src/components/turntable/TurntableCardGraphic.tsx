import React from 'react';
import type { SectionId } from '../../types/portfolio';

interface TurntableCardGraphicProps {
  sectionId: SectionId;
  isActive: boolean;
}

export const TurntableCardGraphic: React.FC<TurntableCardGraphicProps> = ({
  sectionId,
  isActive,
}) => {
  switch (sectionId) {
    case 'welcome':
      return (
        <div className={`card-graphic-container graphic-terminal ${isActive ? 'is-active' : ''}`}>
          <div className="terminal-topbar">
            <span className="terminal-dot dot-red" />
            <span className="terminal-dot dot-yellow" />
            <span className="terminal-dot dot-green" />
            <span className="terminal-title">zsh ~ developer</span>
          </div>
          <div className="terminal-screen">
            <div className="terminal-line">
              <span className="term-prompt">&gt;</span> <span className="term-cmd">whoami</span>
            </div>
            <div className="terminal-line term-output">
              <span className="term-accent">raziq.dev</span> <span className="term-dim">--active</span>
            </div>
            <div className="terminal-line">
              <span className="term-prompt">&gt;</span> <span className="term-status">available_for_hire</span>
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className={`card-graphic-container graphic-svg ${isActive ? 'is-active' : ''}`}>
          <svg viewBox="0 0 160 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg">
            <rect x="2" y="2" width="156" height="62" rx="6" className="bp-frame" />
            <line x1="2" y1="14" x2="158" y2="14" className="bp-divider" />
            <circle cx="8" cy="8" r="2" className="bp-dot" />
            <circle cx="15" cy="8" r="2" className="bp-dot" />
            <circle cx="22" cy="8" r="2" className="bp-dot" />
            <rect x="35" y="5" width="48" height="6" rx="2" className="bp-url-bar" />
            
            <line x1="42" y1="14" x2="42" y2="64" className="bp-divider" />
            <rect x="8" y="20" width="26" height="4" rx="1.5" className="bp-line-dim" />
            <rect x="8" y="28" width="20" height="4" rx="1.5" className="bp-line-dim" />
            <rect x="8" y="36" width="24" height="4" rx="1.5" className="bp-line-dim" />
            
            <rect x="50" y="20" width="102" height="18" rx="3" className="bp-card-hero" />
            <rect x="50" y="43" width="48" height="15" rx="3" className="bp-card-sub" />
            <rect x="104" y="43" width="48" height="15" rx="3" className="bp-card-sub" />
          </svg>
        </div>
      );

    case 'engineering':
      return (
        <div className={`card-graphic-container graphic-svg ${isActive ? 'is-active' : ''}`}>
          <svg viewBox="0 0 160 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg">
            <path d="M 24 33 L 52 33" className="bp-path" />
            <path d="M 76 33 L 104 20" className="bp-path-dashed" />
            <path d="M 76 33 L 104 46" className="bp-path-dashed" />
            <path d="M 124 20 L 142 33" className="bp-path" />
            <path d="M 124 46 L 142 33" className="bp-path" />

            <circle cx="20" cy="33" r="10" className="bp-node-outer" />
            <circle cx="20" cy="33" r="4" className="bp-node-core" />
            <text x="20" y="55" className="bp-label" textAnchor="middle">IN</text>

            <rect x="52" y="22" width="24" height="22" rx="4" className="bp-gateway" />
            <text x="64" y="36" className="bp-label-code" textAnchor="middle">API</text>
            <text x="64" y="55" className="bp-label" textAnchor="middle">GW</text>

            <circle cx="114" cy="20" r="8" className="bp-node-sub" />
            <text x="114" y="23" className="bp-label-tiny" textAnchor="middle">SVC</text>

            <circle cx="114" cy="46" r="8" className="bp-node-sub" />
            <text x="114" y="49" className="bp-label-tiny" textAnchor="middle">EVT</text>

            <circle cx="144" cy="33" r="7" className="bp-node-db" />
            <text x="144" y="55" className="bp-label" textAnchor="middle">DB</text>
          </svg>
        </div>
      );

    case 'experience':
      return (
        <div className={`card-graphic-container graphic-svg ${isActive ? 'is-active' : ''}`}>
          <svg viewBox="0 0 160 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg">
            <line x1="16" y1="30" x2="144" y2="30" className="bp-rail" />

            <circle cx="28" cy="30" r="5" className="bp-milestone-past" />
            <text x="28" y="47" className="bp-label-year" textAnchor="middle">'21</text>
            <text x="28" y="18" className="bp-label-role" textAnchor="middle">ENG</text>

            <circle cx="80" cy="30" r="6" className="bp-milestone-past" />
            <text x="80" y="47" className="bp-label-year" textAnchor="middle">'23</text>
            <text x="80" y="18" className="bp-label-role" textAnchor="middle">SR</text>

            <circle cx="132" cy="30" r="8" className="bp-milestone-halo" />
            <circle cx="132" cy="30" r="4.5" className="bp-milestone-active" />
            <text x="132" y="47" className="bp-label-year-active" textAnchor="middle">NOW</text>
            <text x="132" y="18" className="bp-label-role-active" textAnchor="middle">LEAD</text>
          </svg>
        </div>
      );

    case 'tech-stack':
      return (
        <div className={`card-graphic-container graphic-tech-matrix ${isActive ? 'is-active' : ''}`}>
          <div className="tech-matrix-grid">
            <span className="matrix-badge">TS</span>
            <span className="matrix-badge">REACT</span>
            <span className="matrix-badge">NODE</span>
            <span className="matrix-badge">GO</span>
            <span className="matrix-badge">DOCKER</span>
            <span className="matrix-badge">AWS</span>
          </div>
          <div className="tech-matrix-footer">
            <span className="matrix-status-dot" />
            <span className="matrix-label">28+ TOOLS LOADED</span>
          </div>
        </div>
      );

    case 'about':
      return (
        <div className={`card-graphic-container graphic-svg ${isActive ? 'is-active' : ''}`}>
          <svg viewBox="0 0 160 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg">
            <circle cx="80" cy="33" r="26" className="bp-compass-outer" />
            <circle cx="80" cy="33" r="18" className="bp-compass-inner" />
            <line x1="44" y1="33" x2="116" y2="33" className="bp-crosshair" />
            <line x1="80" y1="4" x2="80" y2="62" className="bp-crosshair" />

            <polygon points="80,24 88,33 80,42 72,33" className="bp-diamond" />
            <circle cx="80" cy="33" r="2" className="bp-diamond-core" />

            <text x="80" y="12" className="bp-compass-coord" textAnchor="middle">N</text>
            <text x="124" y="36" className="bp-compass-coord" textAnchor="middle">E</text>
            <text x="80" y="58" className="bp-compass-coord" textAnchor="middle">S</text>
            <text x="36" y="36" className="bp-compass-coord" textAnchor="middle">W</text>
          </svg>
        </div>
      );

    case 'contact':
      return (
        <div className={`card-graphic-container graphic-svg ${isActive ? 'is-active' : ''}`}>
          <svg viewBox="0 0 160 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg">
            <circle cx="40" cy="33" r="14" className="bp-radar-arc arc-1" />
            <circle cx="40" cy="33" r="24" className="bp-radar-arc arc-2" />
            <circle cx="40" cy="33" r="34" className="bp-radar-arc arc-3" />

            <circle cx="40" cy="33" r="6" className="bp-transmitter" />
            <circle cx="40" cy="33" r="2.5" className="bp-transmitter-core" />

            <rect x="84" y="18" width="68" height="30" rx="4" className="bp-hud-box" />
            <circle cx="94" cy="27" r="2" className="bp-hud-ping" />
            <text x="100" y="29" className="bp-hud-text">STATUS: OK</text>
            <text x="94" y="41" className="bp-hud-sub">PING: 18ms</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};

