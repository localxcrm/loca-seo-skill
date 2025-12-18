// src/components/Footer.tsx
import Link from 'next/link';
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

  return (
    <footer className="footer bg-gray-900 text-white">
      <div className="footer-container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Business Info */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">{businessName}</h3>
            <p className="text-gray-400 mb-4">{config.business.description}</p>
            <div className="space-y-2">
              <p>
                <a 
                  href={`tel:${config.business.phone}`}
                  className="text-white hover:text-primary transition-colors"
                >
                  📞 {config.business.phone}
                </a>
              </p>
              <p>
                <a 
                  href={`mailto:${config.business.email}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✉️ {config.business.email}
                </a>
              </p>
              <p className="text-gray-400">
                📍 {config.address.street}, {config.address.city}, {config.address.state} {config.address.zip}
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="mt-6">
              <SocialIcons size="md" className="text-gray-400" />
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.slice(0, 10).map((area) => (
                <li key={area.slug}>
                  <Link 
                    href={`/locations/${area.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {area.city}
                  </Link>
                </li>
              ))}
              {serviceAreas.length > 10 && (
                <li>
                  <Link 
                    href="/locations"
                    className="text-primary hover:underline"
                  >
                    View All Locations →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* GMB Map Embed */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <GMBMapEmbed height="200" className="rounded-lg overflow-hidden" />
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Serving {config.address.city} and surrounding areas
              </p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${businessName} ${config.address.city} ${config.address.state}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {businessName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
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
