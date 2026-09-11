import React from 'react';
import { ArrowLeft, Home, RotateCw, ShieldAlert, Terminal } from 'lucide-react';

export type ErrorStatus = 401 | 403 | 404 | 405 | 429 | 500 | 503;

const errorContent: Record<ErrorStatus, { title: string; message: string; icon: typeof ShieldAlert; retry: boolean }> = {
  401: { title: 'Authentication required', message: 'Please sign in to continue.', icon: ShieldAlert, retry: false },
  403: { title: 'Access restricted', message: 'You do not have permission to access this resource.', icon: ShieldAlert, retry: false },
  404: { title: 'Signal not found', message: 'The requested resource could not be found.', icon: Terminal, retry: false },
  405: { title: 'Method not supported', message: 'This request method is not supported.', icon: ShieldAlert, retry: false },
  429: { title: 'Slow down a moment', message: 'Too many requests. Please wait a moment and try again.', icon: RotateCw, retry: true },
  500: { title: 'Something went sideways', message: 'Something went wrong on our side. Please try again later.', icon: Terminal, retry: true },
  503: { title: 'Service temporarily offline', message: 'This service is temporarily unavailable. Please try again shortly.', icon: RotateCw, retry: true },
};

interface ErrorPageProps {
  status: ErrorStatus;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ status }) => {
  const content = errorContent[status];
  const Icon = content.icon;
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign('/');
  };

  return (
    <main className="portfolio-error-page" aria-labelledby="error-title">
      <div className="portfolio-error-grid" aria-hidden="true" />
      <div className="portfolio-error-card">
        <div className="portfolio-error-orbit" aria-hidden="true"><span /></div>
        <div className="portfolio-error-icon" aria-hidden="true"><Icon size={22} /></div>
        <p className="portfolio-error-kicker">ABINASH OS / SYSTEM RESPONSE</p>
        <p className="portfolio-error-code" aria-label={`Error ${status}`}>{status}</p>
        <h1 id="error-title">{content.title}</h1>
        <p className="portfolio-error-message">{content.message}</p>
        <div className="portfolio-error-actions">
          <button type="button" className="portfolio-error-primary" onClick={() => window.location.assign('/')}>
            <Home size={16} aria-hidden="true" /> Back to Home
          </button>
          <button type="button" className="portfolio-error-secondary" onClick={goBack}>
            <ArrowLeft size={16} aria-hidden="true" /> Go Back
          </button>
          {content.retry && <button type="button" className="portfolio-error-quiet" onClick={() => window.location.reload()}>Try Again</button>}
        </div>
        <p className="portfolio-error-status" aria-live="polite">status://{status} · connection remains secure</p>
      </div>
    </main>
  );
};

export class PortfolioErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Portfolio UI error:', error);
  }

  render() {
    return this.state.hasError ? <ErrorPage status={500} /> : this.props.children;
  }
}

export const getPathErrorStatus = (): ErrorStatus | null => {
  const match = window.location.pathname.match(/^\/(401|403|404|405|429|500|503)\/?$/);
  if (match) return Number(match[1]) as ErrorStatus;
  return window.location.pathname === '/' ? null : 404;
};
