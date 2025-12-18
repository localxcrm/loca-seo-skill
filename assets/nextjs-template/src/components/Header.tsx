// src/components/Header.tsx
import Link from 'next/link';
import config from '../../site.config';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          {config.business.name}
        </Link>
        
        <nav className="nav">
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
  );
}
