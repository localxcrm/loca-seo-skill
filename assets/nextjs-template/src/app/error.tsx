// src/app/error.tsx
// Global error boundary for runtime errors
// Provides a user-friendly error page with contact CTA

'use client';

import { useEffect } from 'react';
import config from '../../site.config';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const primaryColor = config.branding?.colors?.primary || '#2563eb';
  const darkColor = config.branding?.colors?.dark || '#1f2937';

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          textAlign: 'center',
        }}
      >
        {/* Error Icon */}
        <div
          style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 24px',
            backgroundColor: '#fef3c7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <svg
            style={{ width: '50px', height: '50px', color: '#d97706' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: darkColor,
            marginBottom: '16px',
          }}
        >
          Something Went Wrong
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#6b7280',
            marginBottom: '32px',
          }}
        >
          We encountered an unexpected error. Please try again, or contact us
          directly if the problem persists.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            <svg
              style={{ width: '20px', height: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
          <a
            href={`tel:${config.business.phone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#fff',
              color: darkColor,
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <svg
              style={{ width: '20px', height: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Us
          </a>
        </div>

        {/* Contact Info */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <p style={{ fontWeight: 600, color: darkColor, marginBottom: '8px' }}>
            Need immediate assistance?
          </p>
          <p style={{ color: '#6b7280', marginBottom: '4px' }}>
            Call:{' '}
            <a
              href={`tel:${config.business.phone}`}
              style={{ color: primaryColor }}
            >
              {config.business.phone}
            </a>
          </p>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Email:{' '}
            <a
              href={`mailto:${config.business.email}`}
              style={{ color: primaryColor }}
            >
              {config.business.email}
            </a>
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details
            style={{
              marginTop: '32px',
              textAlign: 'left',
              backgroundColor: '#fef2f2',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                color: '#991b1b',
              }}
            >
              Error Details (Development Only)
            </summary>
            <pre
              style={{
                marginTop: '12px',
                fontSize: '0.75rem',
                overflow: 'auto',
                color: '#7f1d1d',
              }}
            >
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
