// src/components/Header.tsx
// Site header with primary navigation

import Link from 'next/link';
import config from '../../site.config';

export default function Header() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header className="header">
        <div className="header-container">
          <Link href="/" className="logo" aria-label={`${config.business.name} homepage`}>
            {config.business.logo ? (
              <img src={config.business.logo} alt={`${config.business.name} logo`} />
            ) : (
              config.business.name
            )}
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/locations">Service Areas</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <a href={`tel:${config.business.phone}`} className="header-phone">
            {config.business.phone}
          </a>
        </div>
      </header>
    </>
  );
}
