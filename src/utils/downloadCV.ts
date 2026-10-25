import { contactData } from '../data/portfolioData';


export const handleDownloadCV = async (e?: React.MouseEvent): Promise<void> => {
  if (e) e.preventDefault();
  const url = contactData.resumeUrl || '/CV.pdf';

  if (url.startsWith('/')) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && !contentType.includes('text/html')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    } catch (err) {
      void err;
    }

    alert(
      "CV download placeholder. Replace your link in 'src/data/portfolioData.ts' or place your 'CV.pdf' in the 'public/' folder once ready!"
    );
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
};

