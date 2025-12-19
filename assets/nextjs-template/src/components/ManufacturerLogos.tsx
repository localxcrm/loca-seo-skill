// src/components/ManufacturerLogos.tsx
// Display manufacturer/partner logos in a grid or slider

import Image from 'next/image';
import config from '../../site.config';

interface ManufacturerLogosProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ManufacturerLogos({
  title = 'We Work With The Best Manufacturers',
  subtitle,
  className = '',
}: ManufacturerLogosProps) {
  const manufacturers = config.manufacturers || config.partners || [];

  if (manufacturers.length === 0) {
    return null;
  }

  return (
    <section className={`manufacturer-logos py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {manufacturers.map((manufacturer, index) => (
            <div
              key={manufacturer.name || index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              {manufacturer.logo ? (
                <Image
                  src={manufacturer.logo}
                  alt={`${manufacturer.name} logo`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-gray-500 font-medium text-center">
                  {manufacturer.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Optional certification note */}
        {config.business.certifications && config.business.certifications.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Certified installer for {config.business.certifications.join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
