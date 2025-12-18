// src/components/ReviewEmbed.tsx
// Embeds a third-party review widget via iframe (e.g., Birdeye, Grade.us, EmbedSocial)
// Configure the iframe URL in site.config.js under embeds.reviewIframeUrl

'use client';

import { useState } from 'react';
import config from '../../site.config';

interface ReviewEmbedProps {
  /** Override the default review widget URL from config */
  reviewUrl?: string;
  /** Height of the iframe (default: 500px) */
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
  /** Fallback content if no review URL provided */
  fallback?: React.ReactNode;
}

export default function ReviewEmbed({
  reviewUrl,
  height = 500,
  width = '100%',
  title = 'Customer Reviews',
  className = '',
  showLoading = true,
  loadingMessage = 'Loading reviews...',
  fallback,
}: ReviewEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use provided URL or fall back to config
  const embedUrl = reviewUrl || config.embeds?.reviewIframeUrl;

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
      className={`review-embed-container ${className}`}
      style={{
        position: 'relative',
        width: widthStyle,
        minHeight: heightStyle,
      }}
    >
      {/* Loading state */}
      {showLoading && isLoading && (
        <div
          className="review-embed-loading"
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
              className="review-embed-spinner"
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
          className="review-embed-error"
          style={{
            padding: '24px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            textAlign: 'center',
          }}
          role="alert"
        >
          <p style={{ color: '#991b1b', margin: '0 0 12px' }}>
            Unable to load reviews. Please try again later.
          </p>
          {config.reviews?.google?.url && (
            <p style={{ color: '#6b7280', margin: 0 }}>
              View our reviews on{' '}
              <a
                href={config.reviews.google.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: config.branding?.colors?.primary || '#2563eb' }}
              >
                Google
              </a>
            </p>
          )}
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
// VARIANT: Reviews in a section with heading
// ═══════════════════════════════════════════════════════════════

interface ReviewSectionProps extends ReviewEmbedProps {
  /** Section heading */
  heading?: string;
  /** Section description */
  description?: string;
  /** Background color */
  backgroundColor?: string;
  /** Show aggregate rating badge */
  showAggregate?: boolean;
}

export function ReviewSection({
  heading = 'What Our Customers Say',
  description,
  backgroundColor = '#ffffff',
  showAggregate = true,
  ...reviewProps
}: ReviewSectionProps) {
  const aggregate = config.reviews?.aggregate;
  const hasValidAggregate =
    aggregate && aggregate.totalReviews >= 5 && aggregate.averageRating > 0;

  return (
    <section
      className="review-section"
      style={{
        backgroundColor,
        padding: '48px 24px',
      }}
      aria-labelledby="review-section-heading"
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {heading && (
          <h2
            id="review-section-heading"
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

        {/* Aggregate rating badge */}
        {showAggregate && hasValidAggregate && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px',
            }}
            aria-label={`Rated ${aggregate.averageRating} out of 5 stars based on ${aggregate.totalReviews} reviews`}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              aria-hidden="true"
            >
              {[1, 2, 3, 4, 5].map(star => (
                <svg
                  key={star}
                  style={{
                    width: '24px',
                    height: '24px',
                    color:
                      star <= Math.round(aggregate.averageRating)
                        ? '#fbbf24'
                        : '#d1d5db',
                  }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontWeight: 600,
                color: config.branding?.colors?.dark || '#1f2937',
              }}
            >
              {aggregate.averageRating.toFixed(1)}
            </span>
            <span style={{ color: '#6b7280' }}>
              ({aggregate.totalReviews} reviews)
            </span>
          </div>
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

        <ReviewEmbed {...reviewProps} />

        {/* Review platform links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}
        >
          {config.reviews?.google?.url && (
            <a
              href={config.reviews.google.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
              aria-label="Leave a review on Google"
            >
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Review on Google
            </a>
          )}
          {config.reviews?.yelp?.url && (
            <a
              href={config.reviews.yelp.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
              aria-label="Leave a review on Yelp"
            >
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                <path
                  fill="#FF1A1A"
                  d="M20.16 12.594l-4.995 1.433c-.96.276-1.11-.68-.93-1.12l2.37-5.79c.18-.44.93-.62 1.14-.07l2.67 4.36c.32.52.15 1.04-.26 1.19zm-5.79 3.2l4.72 2.39c.48.24.48.92.03 1.24l-3.57 2.53c-.45.32-1.04.05-1.12-.5l-.98-5.05c-.11-.61.43-1.07.92-.62zM9.23 9.58l3.05 4.3c.6.84-.16 1.26-.63 1.33l-6.08.87c-.48.07-.9-.36-.8-.88l1.33-5.17c.15-.58.76-.86 1.28-.6l1.85.15zm.41-3.65L12.1 10c.4.66-.2 1.1-.7 1.2l-5.54.55c-.5.05-.9-.37-.77-.9L6.7 5.5c.15-.58.75-.85 1.25-.6l1.69 1.03zm6.82-3.57l-2.28 5.37c-.42.98-.95.7-1.32.3L9.83 5.1c-.37-.4-.24-1.08.27-1.3l4.94-2.15c.52-.23 1.1.12 1.12.72l.3 0z"
                />
              </svg>
              Review on Yelp
            </a>
          )}
          {config.reviews?.facebook?.url && (
            <a
              href={config.reviews.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
              aria-label="Leave a review on Facebook"
            >
              <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Review on Facebook
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT: Compact review widget (sidebar, footer)
// ═══════════════════════════════════════════════════════════════

interface CompactReviewProps extends ReviewEmbedProps {
  /** Show rating only (no full widget) */
  ratingOnly?: boolean;
}

export function CompactReviewEmbed({
  ratingOnly = false,
  height = 200,
  ...props
}: CompactReviewProps) {
  const aggregate = config.reviews?.aggregate;
  const hasValidAggregate =
    aggregate && aggregate.totalReviews >= 5 && aggregate.averageRating > 0;

  if (ratingOnly && hasValidAggregate) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
        }}
        aria-label={`Rated ${aggregate.averageRating} out of 5 stars`}
      >
        <div style={{ display: 'flex', gap: '2px' }} aria-hidden="true">
          {[1, 2, 3, 4, 5].map(star => (
            <svg
              key={star}
              style={{
                width: '16px',
                height: '16px',
                color:
                  star <= Math.round(aggregate.averageRating)
                    ? '#fbbf24'
                    : '#d1d5db',
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>
          {aggregate.averageRating.toFixed(1)}
        </span>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          ({aggregate.totalReviews})
        </span>
      </div>
    );
  }

  return <ReviewEmbed height={height} {...props} />;
}
