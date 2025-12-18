// src/components/FormEmbed.tsx
// Embeds a third-party form via iframe (e.g., Jotform, Typeform, Google Forms)
// Configure the iframe URL in site.config.js under embeds.formIframeUrl

'use client';

import { useState } from 'react';
import config from '../../site.config';

interface FormEmbedProps {
  /** Override the default form URL from config */
  formUrl?: string;
  /** Height of the iframe (default: 600px) */
  height?: number | string;
  /** Width of the iframe (default: 100%) */
  width?: number | string;
  /** Title for accessibility */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show loading state */
  showLoading?: boolean;
  /** Custom loading message */
  loadingMessage?: string;
  /** Fallback content if no form URL provided */
  fallback?: React.ReactNode;
}

export default function FormEmbed({
  formUrl,
  height = 600,
  width = '100%',
  title = 'Contact Form',
  className = '',
  showLoading = true,
  loadingMessage = 'Loading form...',
  fallback,
}: FormEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use provided URL or fall back to config
  const embedUrl = formUrl || config.embeds?.formIframeUrl;

  // If no URL provided, show fallback or nothing
  if (!embedUrl) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return null;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Convert height/width to string with px if number
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      className={`form-embed-container ${className}`}
      style={{
        position: 'relative',
        width: widthStyle,
        minHeight: heightStyle,
      }}
    >
      {/* Loading state */}
      {showLoading && isLoading && (
        <div
          className="form-embed-loading"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}
          role="status"
          aria-live="polite"
        >
          <div style={{ textAlign: 'center' }}>
            <div
              className="form-embed-spinner"
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e5e7eb',
                borderTopColor: config.branding?.colors?.primary || '#2563eb',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 12px',
              }}
              aria-hidden="true"
            />
            <p style={{ color: '#6b7280', margin: 0 }}>{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div
          className="form-embed-error"
          style={{
            padding: '24px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            textAlign: 'center',
          }}
          role="alert"
        >
          <p style={{ color: '#991b1b', margin: '0 0 12px' }}>
            Unable to load the form. Please try again later.
          </p>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Or call us directly at{' '}
            <a
              href={`tel:${config.business.phone}`}
              style={{ color: config.branding?.colors?.primary || '#2563eb' }}
            >
              {config.business.phone}
            </a>
          </p>
        </div>
      )}

      {/* Iframe */}
      {!hasError && (
        <iframe
          src={embedUrl}
          title={title}
          width={widthStyle}
          height={heightStyle}
          style={{
            border: 'none',
            borderRadius: '8px',
            display: isLoading ? 'none' : 'block',
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          allow="geolocation"
          aria-label={title}
        />
      )}

      {/* CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT: Form in a card/section
// ═══════════════════════════════════════════════════════════════

interface FormSectionProps extends FormEmbedProps {
  /** Section heading */
  heading?: string;
  /** Section description */
  description?: string;
  /** Background color */
  backgroundColor?: string;
}

export function FormSection({
  heading = 'Get Your Free Estimate',
  description,
  backgroundColor = '#f9fafb',
  ...formProps
}: FormSectionProps) {
  return (
    <section
      className="form-section"
      style={{
        backgroundColor,
        padding: '48px 24px',
      }}
      aria-labelledby="form-section-heading"
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {heading && (
          <h2
            id="form-section-heading"
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '12px',
              color: config.branding?.colors?.dark || '#1f2937',
            }}
          >
            {heading}
          </h2>
        )}
        {description && (
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '24px',
            }}
          >
            {description}
          </p>
        )}
        <FormEmbed {...formProps} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT: Inline form (no styling wrapper)
// ═══════════════════════════════════════════════════════════════

export function InlineFormEmbed(props: FormEmbedProps) {
  return <FormEmbed {...props} showLoading={false} />;
}
