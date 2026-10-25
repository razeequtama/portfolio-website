import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectItem } from '../../types/portfolio';
import { GitHubIcon } from '../common/GitHubIcon';
import '../../styles/videoModal.css';

interface VideoDemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scrolling while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount for quick keyboard access
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !project.videoDemoUrl) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid closing if click was on the scrollbar track
    if (e.clientX > e.currentTarget.clientWidth) {
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="video-modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="video-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Modal Header */}
        <div className="video-modal-header">
          <div className="video-modal-title-wrap">
            <h2 id="video-modal-title" className="video-modal-title">
              {project.title.toUpperCase()} VIDEO DEMO
            </h2>
          </div>

          <div className="video-modal-actions">
            <span className="video-modal-kbd" aria-hidden="true">
              ESC
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className="video-modal-close-btn"
              onClick={onClose}
              aria-label="Close demo video"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="video-player-container">
          <video
            ref={videoRef}
            key={project.videoDemoUrl}
            className="video-player-element"
            controls
            autoPlay
            playsInline
            preload="auto"
            poster={project.snapshotUrl}
          >
            <source src={project.videoDemoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer */}
        <div className="video-modal-footer">
          <div className="video-modal-meta">
            <span className="video-modal-subtitle">{project.subtitle}</span>
            <div className="video-modal-tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="video-modal-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="video-modal-footer-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                <GitHubIcon />
                <span>Source Code ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
