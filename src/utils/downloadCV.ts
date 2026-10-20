import { contactData } from '../data/portfolioData';

/**
 * Handles CV download.
 * If 'CV.pdf' is placed in public/ (or a hosted URL is configured),
 * it initiates the download/opens the file.
 * Otherwise, displays a placeholder alert instructing how to provide the file.
 */
export const handleDownloadCV = async (e?: React.MouseEvent): Promise<void> => {
  if (e) e.preventDefault();
  const url = contactData.resumeUrl || '/CV.pdf';

  // If local path (default /CV.pdf)
  if (url.startsWith('/')) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type') || '';
      // Vite and SPA servers return 200 with text/html when static asset is not found
      if (res.ok && !contentType.includes('text/html')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    } catch {
      // Proceed to placeholder alert
    }

    alert(
      "CV download placeholder. Replace your link in 'src/data/portfolioData.ts' or place your 'CV.pdf' in the 'public/' folder once ready!"
    );
    return;
  }

  // If external URL
  window.open(url, '_blank', 'noopener,noreferrer');
};

