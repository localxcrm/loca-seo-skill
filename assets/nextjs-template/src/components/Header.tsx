// src/components/Header.tsx
// Site header with dropdown navigation and CTA button

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../../site.config';
import TopBar from './TopBar';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Build navigation with service categories
  const buildNavigation = (): NavItem[] => {
    const services = config.services || [];
    const serviceAreas = config.serviceAreas || [];

    // Group services by category if available
    const servicesByCategory: Record<string, typeof services> = {};
    services.forEach(service => {
      const category = service.category || 'Services';
      if (!servicesByCategory[category]) {
        servicesByCategory[category] = [];
      }
      servicesByCategory[category].push(service);
    });

    // Build services dropdown
    const servicesNav: NavItem = {
      label: 'Services',
      href: '/services',
      children: Object.keys(servicesByCategory).length > 1
        ? Object.entries(servicesByCategory).map(([category, categoryServices]) => ({
            label: category,
            href: '/services',
            children: categoryServices.map(s => ({
              label: s.name,
              href: `/services/${s.slug}`,
            })),
          }))
        : services.map(s => ({
            label: s.name,
            href: `/services/${s.slug}`,
          })),
    };

    // Build areas dropdown (show first 10, link to full page)
    const areasNav: NavItem = {
      label: 'Areas We Serve',
      href: '/locations',
      children: [
        ...serviceAreas.slice(0, 10).map(area => ({
          label: area.city,
          href: `/locations/${area.slug}`,
        })),
        ...(serviceAreas.length > 10
          ? [{ label: 'View All Areas →', href: '/locations' }]
          : []),
      ],
    };

    return [
      servicesNav,
      areasNav,
      { label: 'About Us', href: '/about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ];
  };

  const navigation = buildNavigation();

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 z-50">
        Skip to main content
      </a>

      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <header className="header bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label={`${config.business.name} homepage`}>
              {config.business.logo ? (
                <Image
                  src={config.business.logo}
                  alt={`${config.business.name} logo`}
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              ) : (
                <span className="text-xl font-bold text-gray-900">{config.business.name}</span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                    {item.children && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[220px] border border-gray-100">
                      {item.children.map((child) => (
                        <div key={child.label} className="relative group">
                          {child.children ? (
                            <>
                              <div className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer">
                                <span className="font-medium">{child.label}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              {/* Nested Dropdown */}
                              <div className="absolute left-full top-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] border border-gray-100 hidden group-hover:block">
                                {child.children.map((subChild) => (
                                  <Link
                                    key={subChild.href}
                                    href={subChild.href}
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary"
                                  >
                                    {subChild.label}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                {config.ui?.ctaButtonText || 'Get a Free Quote'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.slice(0, 6).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-gray-600 hover:text-primary text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {config.ui?.ctaButtonText || 'Get a Free Quote'}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
