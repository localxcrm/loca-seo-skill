// src/app/not-found.tsx
// Custom 404 page with local business CTA
// This page helps retain visitors who land on broken links

import Link from 'next/link';
import config from '../../site.config';
import { getAllServices, getAllServiceAreas } from '../lib/site';

export const metadata = {
  title: `Page Not Found | ${config.business.name}`,
  description: `The page you're looking for doesn't exist. Contact ${config.business.name} for help.`,
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  const services = getAllServices().slice(0, 4);
  const areas = getAllServiceAreas().slice(0, 4);
  const primaryColor = config.branding?.colors?.primary || '#2563eb';
  const darkColor = config.branding?.colors?.dark || '#1f2937';

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
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        {/* 404 Icon */}
        <div
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <svg
            style={{ width: '60px', height: '60px', color: '#dc2626' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: darkColor,
            marginBottom: '16px',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '32px',
          }}
        >
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let us help you find what you need.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>
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
            Call {config.business.phone}
          </a>
        </div>

        {/* Quick Links */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: darkColor,
              marginBottom: '16px',
            }}
          >
            Looking for something specific?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {/* Services */}
            {services.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}
                >
                  Our Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {services.map(service => (
                    <li key={service.slug} style={{ marginBottom: '4px' }}>
                      <Link
                        href={`/services/${service.slug}`}
                        style={{
                          color: primaryColor,
                          textDecoration: 'none',
                          fontSize: '0.9375rem',
                        }}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas */}
            {areas.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}
                >
                  Service Areas
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {areas.map(area => (
                    <li key={area.slug} style={{ marginBottom: '4px' }}>
                      <Link
                        href={`/locations/${area.slug}`}
                        style={{
                          color: primaryColor,
                          textDecoration: 'none',
                          fontSize: '0.9375rem',
                        }}
                      >
                        {area.city}, {area.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Link */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#6b7280', marginBottom: '8px' }}>
              Can&apos;t find what you need?
            </p>
            <Link
              href="/contact"
              style={{
                color: primaryColor,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Contact us for help
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
