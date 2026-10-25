import React from 'react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 18, className = '' }) => {
  const norm = name.toLowerCase().trim();

  switch (norm) {
    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#3776AB"
            d="M11.91 2c-3.15 0-2.95 1.36-2.95 1.36l.01 1.41h3.01v.42H6.38s-2.02.23-2.02 2.96c0 2.72 1.76 2.83 1.76 2.83h1.05v-1.48s-.06-1.76 1.73-1.76h2.99s1.67-.02 1.67-1.63V4.44s.24-2.44-3.66-2.44zm-1.68 1.45a.65.65 0 1 1 0 1.3.65.65 0 0 1 0-1.3z"
          />
          <path
            fill="#FFD43B"
            d="M12.09 22c3.15 0 2.95-1.36 2.95-1.36l-.01-1.41h-3.01v-.42h5.6s2.02-.23 2.02-2.96c0-2.72-1.76-2.83-1.76-2.83h-1.05v1.48s.06 1.76-1.73 1.76h-2.99s-1.67.02-1.67 1.63v1.67s-.24 2.44 3.66 2.44zm1.68-1.45a.65.65 0 1 1 0-1.3.65.65 0 0 1 0 1.3z"
          />
        </svg>
      );

    case 'c':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#659AD2" d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <path
            fill="#FFFFFF"
            d="M12.3 8.2c-2.3 0-3.8 1.6-3.8 3.8s1.5 3.8 3.8 3.8c1.4 0 2.5-.6 3.1-1.4l-1.3-1c-.5.6-1.1.9-1.8.9-1.3 0-2.2-.9-2.2-2.3s.9-2.3 2.2-2.3c.7 0 1.3.3 1.8.9l1.3-1c-.6-.8-1.7-1.4-3.1-1.4z"
          />
        </svg>
      );

    case 'c++':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#00599C" d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <path
            fill="#FFFFFF"
            d="M9.8 8.5c-1.9 0-3.1 1.4-3.1 3.5s1.2 3.5 3.1 3.5c1.2 0 2.1-.5 2.6-1.2l-1.1-.8c-.4.5-.9.7-1.5.7-1.1 0-1.8-.8-1.8-2.2s.7-2.2 1.8-2.2c.6 0 1.1.2 1.5.7l1.1-.8c-.5-.7-1.4-1.2-2.6-1.2zm4.2 2.7h-.8v1.6h.8v.8h1.6v-.8h.8v-1.6h-.8v-.8H14v.8zm3.6 0h-.8v1.6h.8v.8h1.6v-.8h.8v-1.6h-.8v-.8h-1.6v.8z"
          />
        </svg>
      );

    case 'java':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#5382A1"
            d="M9.4 17.5c-2.3.2-4.2.3-4.2.3s1.7.9 4.3.9c3 0 5.4-.5 5.4-.5s-2.1-.9-5.5-.7zm.4 2.8c-1.5.1-2.9.2-2.9.2s1.2.6 3.1.6 3.8-.4 3.8-.4-1.6-.5-4-.4zm-2.1 2.3c-1.1.1-1.9.1-1.9.1s.9.4 2.2.4c1.7 0 2.8-.3 2.8-.3s-1.4-.3-3.1-.2z"
          />
          <path
            fill="#EA2D2E"
            d="M13.6 13.7c1.3.1 2.4-.6 2.4-.6s-1.1-.4-2.5-.3c-2 .2-3.3 1.1-3.3 1.1s1.5-.3 3.4-.2zm2.1-3.6s-1.8.8-3.6.9c-2.3.1-4.3-.8-4.3-.8s1.6 1.3 4.5 1.1c3.2-.2 5-1.2 5-1.2s-.7-.2-1.6 0zm-4-4.2c.6 1.1 1.7 1.8 1.7 1.8s-1-.2-2-.8c-1.2-.7-1.5-1.9-.9-2.9.8-1.2 2.5-1.9 2.5-1.9s-1.1.7-1.5 1.5c-.3.7-.1 1.6.2 2.3zm3.7 2.2c.4.6.6 1.4.3 2-.3.6-.8 1-1.4 1.3-.7.3-1.6.4-1.6.4s.8-.2 1.3-.4c.5-.2.8-.5 1-.9.2-.5.1-1.1-.2-1.6-.3-.5-.7-.9-1.2-1.4-.5-.5-.9-1.1-.9-1.8 0-.4.1-.7.4-1-.4.4-.6.9-.6 1.5 0 .6.3 1.1.8 1.6.4.5.7.8 1.1 1.3z"
          />
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect fill="#F7DF1E" width="24" height="24" rx="3.5" />
          <path
            fill="#000000"
            d="M6.8 18.5c.7.4 1.5.6 2.4.6 1.9 0 3.1-1 3.1-2.9v-6.9H9.7v6.8c0 .8-.4 1.2-1.1 1.2-.4 0-.8-.1-1.1-.3l-.7 1.5zm8.4-.1c1 .6 2.2.9 3.4.9 2.2 0 3.6-1.1 3.6-2.9 0-1.6-.9-2.4-2.5-3.1-.9-.4-1.3-.7-1.3-1.2 0-.5.4-.9 1.2-.9.7 0 1.3.2 1.8.5l.7-1.6c-.6-.4-1.4-.6-2.4-.6-2.1 0-3.4 1.2-3.4 2.8 0 1.5 1 2.4 2.5 3.1.9.4 1.3.8 1.3 1.3 0 .6-.5 1-1.4 1-.8 0-1.6-.3-2.2-.7l-.8 1.4z"
          />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect fill="#3178C6" width="24" height="24" rx="3.5" />
          <path
            fill="#FFFFFF"
            d="M4 8.5h6.4V10H7.8v8.5H5.7V10H4V8.5zm11.3 10c-2.1 0-3.4-1.1-3.4-2.8l1.8-.4c.2 1 .8 1.6 1.8 1.6.9 0 1.5-.5 1.5-1.2 0-.7-.5-1-1.5-1.4l-.8-.3c-1.7-.7-2.6-1.5-2.6-2.8 0-1.8 1.4-2.9 3.3-2.9 1.8 0 3 1 3.3 2.5l-1.8.4c-.2-.8-.7-1.3-1.5-1.3-.8 0-1.3.4-1.3 1.1 0 .6.4.9 1.3 1.3l.8.3c1.9.7 2.8 1.6 2.8 3 0 1.8-1.4 2.9-3.4 2.9z"
          />
        </svg>
      );

    case 'sql':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00BCF2" />
          <path d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="none" stroke="#00758F" strokeWidth="2" />
          <path d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" fill="none" stroke="#00BCF2" strokeWidth="2" />
        </svg>
      );

    case 'php':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
          <path
            fill="#FFFFFF"
            d="M5.5 14h1.4l.4-1.6h1.2c1.4 0 2.2-.8 2.2-2.1 0-1.3-.8-1.9-2.1-1.9H5.5L4 14h1.5zm1.5-4.2h1.1c.5 0 .8.2.8.7s-.3.7-.8.7H6.7l.3-1.4zm6.2 4.2h1.4l.4-1.6h1.2c1.4 0 2.2-.8 2.2-2.1 0-1.3-.8-1.9-2.1-1.9h-3.1L11.7 14h1.5zm1.5-4.2h1.1c.5 0 .8.2.8.7s-.3.7-.8.7h-1.2l.3-1.4zm-4.7 4.2l1.3-5.6h-1.4l-.5 2.2H9.2l.5-2.2H8.3L7 14h1.4l.5-2.1h1.7l-.5 2.1h1.4z"
          />
        </svg>
      );

    case 'html5':
    case 'html':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#E34F26" d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" />
          <path fill="#EF652A" d="M12 3.8v17.3l5.8-2.2 1.3-15.1H12z" />
          <path fill="#EBEBEB" d="M12 7.7H7.7l.3 3.6h4V7.7zm0 5.4H7.9l.4 4.5 3.7 1v-2.2l-1.9-.5-.1-1.4h1.9v-1.4z" />
          <path fill="#FFFFFF" d="M12 7.7v3.6h4.1l-.4 4.5-3.7 1v2.2l5.7-1.6.5-6.1H12z" />
        </svg>
      );

    case 'css3':
    case 'css':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#1572B6" d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" />
          <path fill="#33A9DC" d="M12 3.8v17.3l5.8-2.2 1.3-15.1H12z" />
          <path fill="#EBEBEB" d="M12 7.7H7.7l.2 2.3h4.1V7.7zm0 4.1H8.1l.3 3.5 3.6 1v-2.2l-1.8-.5-.1-1.4h1.9v-.4z" />
          <path fill="#FFFFFF" d="M12 7.7v2.3h3.9l-.3 3.6-3.6 1v2.2l5.6-1.6.7-7.5H12z" />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'next.js':
    case 'nextjs':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#444444" strokeWidth="1" />
          <path fill="#FFFFFF" d="M15.5 17.5h-1.8l-5.4-7.2v7.2H6.5V6.5h1.8l5.4 7.2V6.5h1.8v11z" />
        </svg>
      );

    case 'vite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="viteGradA" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="viteGradB" x1="10" y1="3" x2="15" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA83" />
              <stop offset=".5" stopColor="#FFDD35" />
              <stop offset="1" stopColor="#FFA800" />
            </linearGradient>
          </defs>
          <path fill="url(#viteGradA)" d="M21.5 3.8L12.5 20.3 3.5 3.8l9 1.8 9-1.8z" />
          <path fill="url(#viteGradB)" d="M14.5 3.5L12 8.5l2.5 1-4.5 8 1.5-6-2.5-.5 5.5-7.5z" />
        </svg>
      );

    case 'tailwind css':
    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#38BDF8" className={className} aria-hidden="true">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      );

    case 'alpine.js':
    case 'alpinejs':
    case 'alpine':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#8BC0D0" d="M18.7 13.5l-5.3-5.3 5.3-5.3 5.3 5.3-5.3 5.3zM5.3 18.7L0 13.4l5.3-5.3 5.3 5.3-5.3 5.3zm8.1 0L8.1 13.4l5.3-5.3 5.3 5.3-5.3 5.3z" />
        </svg>
      );

    case 'react flow':
    case 'reactflow':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="2" y="3" width="7" height="6" rx="1.5" fill="#FF0072" />
          <rect x="15" y="3" width="7" height="6" rx="1.5" fill="#0041D0" />
          <rect x="8.5" y="15" width="7" height="6" rx="1.5" fill="#FF0072" />
          <path d="M5.5 9v3.5a1 1 0 001 1H12m6.5-4.5v3.5a1 1 0 01-1 1H12m0 0v2.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'node.js':
    case 'nodejs':
    case 'node':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#5FA04E" d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.2L5 8.2v7.6l7 4 7-4V8.2l-7-4z" />
          <path fill="#5FA04E" d="M12 6.5l4.5 2.6v5.2L12 16.9l-4.5-2.6V9.1L12 6.5z" />
        </svg>
      );

    case 'express.js':
    case 'expressjs':
    case 'express':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10.5" fill="#222222" stroke="#555" strokeWidth="1" />
          <text x="12" y="15.5" fill="#EEEEEE" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
        </svg>
      );

    case 'fastapi':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#05998B" />
          <path fill="#FFFFFF" d="M13 3L6 13h5l-2 8 8-11h-5l1-7z" />
        </svg>
      );

    case 'sqlalchemy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#D71F00" d="M12 2a9 9 0 00-9 9c0 4.1 2.8 7.6 6.7 8.7l1.1-2.2c-2.7-.9-4.6-3.4-4.6-6.5a6.8 6.8 0 1113.6 0c0 3.1-1.9 5.6-4.6 6.5l1.1 2.2A9 9 0 0012 2zm-1.5 7.5a1.5 1.5 0 113 0v4a1.5 1.5 0 11-3 0v-4z" />
        </svg>
      );

    case 'networkx':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="6" stroke="#1F77B4" strokeWidth="2" />
          <line x1="6" y1="6" x2="12" y2="18" stroke="#1F77B4" strokeWidth="2" />
          <line x1="18" y1="6" x2="12" y2="18" stroke="#1F77B4" strokeWidth="2" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="#FF7F0E" strokeWidth="2" />
          <circle cx="6" cy="6" r="3.5" fill="#1F77B4" />
          <circle cx="18" cy="6" r="3.5" fill="#FF7F0E" />
          <circle cx="12" cy="18" r="3.5" fill="#2CA02C" />
          <circle cx="18" cy="18" r="3.5" fill="#D62728" />
        </svg>
      );

    case 'postgresql':
    case 'postgres':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#4169E1"
            d="M18.8 8.6c-.3-.8-.9-1.5-1.7-2-.8-.5-1.8-.7-2.8-.7-.6 0-1.2.1-1.8.3-.5-.7-1.3-1.3-2.1-1.6-.9-.3-1.8-.4-2.8-.2-1.3.3-2.5 1.1-3.2 2.2C3.7 7.7 3.4 9 3.5 10.3c.1 1.6.8 3.1 1.9 4.2.4.4.9.8 1.4 1-.1.7-.1 1.4.1 2.1.2.6.5 1.2.9 1.7.5.5 1.1.9 1.8 1.1.7.2 1.4.1 2.1-.1.7-.2 1.4-.7 1.9-1.2.4-.4.8-.9 1-1.5.8.3 1.6.4 2.5.3 1.1-.1 2.2-.6 3-1.4.8-.8 1.3-1.9 1.4-3.1.2-1.6-.2-3.3-1.1-4.8h.4z"
          />
        </svg>
      );

    case 'mysql':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.8c-1.3.8-2.9 1-4.4.7-1.8-.4-3.2-1.7-3.9-3.4-.6-1.5-.5-3.1.3-4.5.9-1.5 2.4-2.5 4.1-2.7 1.4-.2 2.8.2 4 .9l-1 1.7c-.8-.5-1.7-.7-2.6-.6-1.1.1-2.1.8-2.7 1.8-.5 1-.6 2.1-.2 3.1.5 1.2 1.4 2.1 2.6 2.4 1 .2 2.1.1 3-.5l.8 1.6z" />
          <path fill="#F29111" d="M17 9.5c.8.6 1.4 1.5 1.6 2.5s0 2.1-.6 3l1.7.9c.8-1.2 1.1-2.6.9-4-.2-1.4-1-2.6-2.1-3.4L17 9.5z" />
        </svg>
      );

    case 'sqlite (wal mode)':
    case 'sqlite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#003B57" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path fill="#0080CD" d="M7 8h10v2.5H7V8zm0 4h7v2.5H7V12zm0 4h10v2.5H7V16z" />
        </svg>
      );

    case 'redis':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#DC382D" d="M2 8l10-5 10 5-10 5L2 8z" />
          <path fill="#A3241C" d="M2 8v8l10 5V13L2 8z" />
          <path fill="#B82B22" d="M22 8v8l-10 5V13l10-5z" />
          <circle cx="12" cy="7" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'neon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#0A0D10" />
          <path fill="#00E599" d="M7 6h3.2l4.8 7.5V6H18v12h-3.2L10 10.5V18H7V6z" />
        </svg>
      );

    case 'scikit-learn':
    case 'scikitlearn':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="8" cy="12" r="5.5" fill="#3499CD" />
          <circle cx="16" cy="12" r="5.5" fill="#F7931E" />
          <path fill="#FFFFFF" d="M12 9a5.5 5.5 0 00-2 3c.4 1.2 1.1 2.2 2 3a5.5 5.5 0 002-3c-.4-1.2-1.1-2.2-2-3z" />
        </svg>
      );

    case 'pytorch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#EE4C2C" d="M13.5 2.5a6.5 6.5 0 014.6 11.1l-2.1-2.1a3.5 3.5 0 00-2.5-6v-3zm3.7 1.4a1 1 0 110 2 1 1 0 010-2zM12 9a5 5 0 00-5 5c0 2.2 1.4 4 3.4 4.7L9.5 21a7 7 0 01-4.5-6.5A7 7 0 0112 7.5v1.5z" />
        </svg>
      );

    case 'tensorflow':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#FF6F00" d="M12 2l8.5 4.9v9.8L16.2 19V9.2L12 6.8l-4.2 2.4V19L3.5 16.7V6.9L12 2zm0 8.2l2.8 1.6v6.4L12 20l-2.8-1.6v-6.4L12 10.2z" />
        </svg>
      );

    case 'numpy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#013243" />
          <path fill="#4DABCF" d="M6 6h2.5l5 7.5V6H16v12h-2.5L8.5 10.5V18H6V6zm11 0h2v12h-2V6z" />
        </svg>
      );

    case 'pandas':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="4" y="4" width="3.5" height="16" rx="1.5" fill="#150458" />
          <rect x="10.25" y="8" width="3.5" height="12" rx="1.5" fill="#FF4336" />
          <rect x="16.5" y="4" width="3.5" height="16" rx="1.5" fill="#E70488" />
          <circle cx="5.75" cy="5.75" r="1.5" fill="#FFD43B" />
          <circle cx="12" cy="18.25" r="1.5" fill="#00D26A" />
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#F05032"
            d="M21.7 10.6L13.4 2.3c-.4-.4-1-.4-1.4 0L9.9 4.4l2.7 2.7c.4-.1.8 0 1.2.2.6.4.8 1.1.7 1.8l2.6 2.6c.7-.1 1.4.1 1.8.7.6.8.5 2-.3 2.6-.8.6-2 .5-2.6-.3-.4-.5-.5-1.2-.3-1.8l-2.4-2.4v5.3c.2.2.4.4.5.7.6.8.5 2-.3 2.6-.8.6-2 .5-2.6-.3-.6-.8-.5-2 .3-2.6.3-.2.7-.3 1.1-.3V8.8c-.4 0-.8-.1-1.1-.3-.6-.4-.8-1.1-.7-1.8L8 4.3 2.3 10c-.4.4-.4 1 0 1.4l8.3 8.3c.4.4 1 .4 1.4 0l9.7-9.7c.4-.4.4-1 0-1.4z"
          />
        </svg>
      );

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#FFFFFF"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
          />
        </svg>
      );

    case 'docker':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#2496ED"
            d="M22.5 11.5c-.3-.2-1.5-.7-2.7-.2-.2-.8-.7-1.5-1.4-2l-.6-.4-.4.6c-.5.8-.6 1.8-.3 2.7-.6.3-1.6.4-2.2.4H2c-.4 2.2.3 4.5 1.8 6.2 1.6 1.7 3.8 2.7 6.2 2.7 5.8 0 10.7-3.9 11.8-9.4.5 0 1.4-.1 1.7-.8l.2-.4-.2-.3zM4 10.5h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2H7V7.5zm3 0h2v2h-2V7.5zm3 0h2v2h-2V7.5zm3 0h2v2h-2V7.5zm-3-3h2v2h-2V4.5z"
          />
        </svg>
      );

    case 'linux':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#FCC624" d="M12 14c-1.5 0-2.5.5-2.5 1s1 1 2.5 1 2.5-.5 2.5-1-1-1-2.5-1zm-4 6c-1.5 0-2.5.8-2.5 1.5S6.5 23 8 23s2.5-.8 2.5-1.5S9.5 20 8 20zm8 0c-1.5 0-2.5.8-2.5 1.5S14.5 23 16 23s2.5-.8 2.5-1.5S17.5 20 16 20z" />
          <path fill="#FFFFFF" d="M12 3c-2.5 0-4 2-4 5v5c0 3 1.8 6 4 6s4-3 4-6V8c0-3-1.5-5-4-5z" />
          <circle cx="10" cy="8" r="1" fill="#000000" />
          <circle cx="14" cy="8" r="1" fill="#000000" />
          <path fill="#222222" d="M12 1c-3.3 0-5 2.5-5 6v6c0 3.8 2.2 7 5 7s5-3.2 5-7V7c0-3.5-1.7-6-5-6zm0 2c2.5 0 4 2 4 5v5c0 3-1.8 6-4 6s-4-3-4-6V8c0-3 1.5-5 4-5z" />
        </svg>
      );

    case 'pytest':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#0A9EDC" d="M9 3v4.5L5.5 15c-.9 1.6-.9 3.5 0 5.1.9 1.6 2.6 2.6 4.4 2.6h4.2c1.8 0 3.5-1 4.4-2.6.9-1.6.9-3.5 0-5.1L15 7.5V3H9zm2 2h2v3h-2V5zm-2.8 7h7.6l2.4 5.2c.4.8.4 1.8 0 2.6-.4.8-1.2 1.3-2.1 1.3H9.9c-.9 0-1.7-.5-2.1-1.3-.4-.8-.4-1.8 0-2.6L10.2 12z" />
          <circle cx="11" cy="16" r="1" fill="#FFA500" />
          <circle cx="14" cy="18" r="1.2" fill="#FFA500" />
        </svg>
      );

    case 'vitest':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#729B1B" d="M18.5 3L12 14.5 5.5 3H2l10 18 10-18h-3.5z" />
          <path fill="#FCC72B" d="M13.8 3.5L10 10.5h3.5L11 16l5-7h-3.5l1.3-5.5z" />
        </svg>
      );

    case 'railway':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#0B0D0E" />
          <path fill="#FFFFFF" d="M4 17.5l4-11h8l4 11H4zm3.5-2h9l-1.5-4h-6l-1.5 4zm3-6h3l-.7-2h-1.6l-.7 2z" />
        </svg>
      );

    case 'render':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#000000" />
          <path fill="#46E3B7" d="M12 4L4 8.5v7L12 20l8-4.5v-7L12 4zm0 2.3l5.7 3.2L12 12.7 6.3 9.5 12 6.3zM6 11l5 2.8v5L6 16v-5zm12 5l-5 2.8v-5l5-2.8v5z" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
};

