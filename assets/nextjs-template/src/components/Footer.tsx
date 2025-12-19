// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import {
  config,
  getAllServices,
  getAllServiceAreas,
  getBusinessName
} from '@/lib/site';
import GMBMapEmbed from './GMBMapEmbed';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const services = getAllServices();
  const serviceAreas = getAllServiceAreas();
  const businessName = getBusinessName();

  // Group services by category if available
  const servicesByCategory: Record<string, typeof services> = {};
  services.forEach(service => {
    const category = service.category || 'Services';
    if (!servicesByCategory[category]) {
      servicesByCategory[category] = [];
    }
    servicesByCategory[category].push(service);
  });

  const hasMultipleCategories = Object.keys(servicesByCategory).length > 1;

  return (
    <footer className="footer bg-gray-900 text-white">
      <div className="footer-container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Business Info */}
          <div className="footer-section lg:col-span-2">
            {/* Logo */}
            {config.business.logo ? (
              <Image
                src={config.business.logo}
                alt={`${businessName} logo`}
                width={180}
                height={60}
                className="h-12 w-auto mb-4"
              />
            ) : (
              <h3 className="text-xl font-bold mb-4">{businessName}</h3>
            )}

            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {config.business.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <p>
                <a
                  href={`tel:${config.business.phone}`}
                  className="text-white hover:text-primary transition-colors font-medium"
                >
                  📞 {config.business.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${config.business.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  ✉️ {config.business.email}
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                📍 {config.address.street}{config.address.suite ? `, ${config.address.suite}` : ''}, {config.address.city}, {config.address.state} {config.address.zip}
              </p>
            </div>

            {/* License Numbers - Visible */}
            {config.business.licenses && config.business.licenses.length > 0 && (
              <div className="mb-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2">Licensed & Insured</p>
                <div className="flex flex-wrap gap-3">
                  {config.business.licenses.map((license, index) => (
                    <span key={index} className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded">
                      {license.type}: {license.number}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Icons */}
            <div className="mt-4">
              <SocialIcons size="md" className="text-gray-400" />
            </div>
          </div>

          {/* Services by Category or Single List */}
          {hasMultipleCategories ? (
            // Show first 2 categories
            Object.entries(servicesByCategory).slice(0, 2).map(([category, categoryServices]) => (
              <div key={category} className="footer-section">
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {categoryServices.slice(0, 6).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.slice(0, 8).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Links */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Service Areas
                </Link>
              </li>
              {config.financing?.available && (
                <li>
                  <Link href={config.financing.url || '/financing'} className="text-gray-400 hover:text-white transition-colors text-sm">
                    Financing
                  </Link>
                </li>
              )}
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {area.city}
                  </Link>
                </li>
              ))}
              {serviceAreas.length > 8 && (
                <li>
                  <Link
                    href="/locations"
                    className="text-primary hover:underline text-sm"
                  >
                    View All →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* GMB Map Row */}
        {config.embeds?.gmbMap && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Find Us</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Serving {config.address.city} and {serviceAreas.length > 0 ? `${serviceAreas.length}+ surrounding areas` : 'surrounding areas'}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${businessName} ${config.address.city} ${config.address.state}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Get Directions →
                </a>
              </div>
              <GMBMapEmbed height="200" className="rounded-lg overflow-hidden" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-gray-500 text-sm">
                © {currentYear} {businessName}. All rights reserved.
              </p>
              {/* License numbers in bottom bar too */}
              {config.business.licenses && config.business.licenses.length > 0 && (
                <p className="text-gray-600 text-xs">
                  {config.business.licenses.map(l => `${l.type} ${l.number}`).join(' | ')}
                </p>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
