// src/components/TopBar.tsx
// Top bar with contact info, hours, and financing badge

import config from '../../site.config';

export default function TopBar() {
  const { business, address } = config;

  // Format hours for display
  const getHoursDisplay = () => {
    if (config.hours?.display) return config.hours.display;
    if (config.hours?.monday) {
      return `Mon-Fri: ${config.hours.monday}`;
    }
    return null;
  };

  const hoursDisplay = getHoursDisplay();

  return (
    <div className="top-bar bg-gray-900 text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
        {/* Left side - Address */}
        <div className="flex items-center gap-6">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${address.street}, ${address.city}, ${address.state} ${address.zip}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span>📍</span>
            <span>{address.street}, {address.city}, {address.state} {address.zip}</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${business.phone}`}
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <span>📞</span>
            <span>{business.phone}</span>
          </a>
        </div>

        {/* Right side - Hours & Financing */}
        <div className="flex items-center gap-6">
          {/* Hours */}
          {hoursDisplay && (
            <span className="hidden md:flex items-center gap-1">
              <span>🕐</span>
              <span>{hoursDisplay}</span>
            </span>
          )}

          {/* Financing Badge */}
          {config.financing?.available && (
            <a
              href={config.financing.url || '/financing'}
              className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full hover:bg-primary/30 transition-colors"
            >
              <span>💳</span>
              <span className="font-medium">Financing Available</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
