// src/components/TrustBadges.tsx
// Displays membership logos, certifications, and trust badges
// "Proud Member Of" section

import Image from 'next/image';
import { config } from '@/lib/site';

interface Badge {
  name: string;
  image: string;
  url?: string;        // Link to organization
  alt?: string;
}

interface TrustBadgesProps {
  badges?: Badge[];    // Override config badges
  title?: string;
  layout?: 'row' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
  className?: string;
}

export default function TrustBadges({
  badges: badgesProp,
  title = "Proud Member Of",
  layout = 'row',
  size = 'md',
  showTitle = true,
  className = '',
}: TrustBadgesProps) {
  // Get badges from config or props
  const badges = badgesProp || config.trustBadges || [];
  
  if (!badges || badges.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-8 md:h-10',
    md: 'h-12 md:h-16',
    lg: 'h-16 md:h-20',
  };

  const layoutClasses = {
    row: 'flex flex-wrap items-center justify-center gap-6 md:gap-10',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center',
  };

  return (
    <section className={`trust-badges ${className}`}>
      {showTitle && title && (
        <h3 className="text-center text-gray-500 text-sm uppercase tracking-wider mb-6">
          {title}
        </h3>
      )}
      
      <div className={layoutClasses[layout]}>
        {badges.map((badge, index) => (
          <BadgeItem 
            key={index} 
            badge={badge} 
            sizeClass={sizeClasses[size]}
          />
        ))}
      </div>
    </section>
  );
}

function BadgeItem({ 
  badge, 
  sizeClass 
}: { 
  badge: Badge; 
  sizeClass: string;
}) {
  const imageElement = (
    <div className={`relative ${sizeClass} w-auto`}>
      <Image
        src={badge.image}
        alt={badge.alt || `${badge.name} logo`}
        height={80}
        width={200}
        className={`${sizeClass} w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300`}
      />
    </div>
  );

  if (badge.url) {
    return (
      <a 
        href={badge.url}
        target="_blank"
        rel="noopener noreferrer"
        title={badge.name}
        className="block"
      >
        {imageElement}
      </a>
    );
  }

  return imageElement;
}

// Compact inline version for footer or sidebar
export function TrustBadgesInline({ 
  badges: badgesProp,
  className = '' 
}: { 
  badges?: Badge[];
  className?: string;
}) {
  const badges = badgesProp || config.trustBadges || [];
  
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {badges.slice(0, 3).map((badge, index) => (
        <Image
          key={index}
          src={badge.image}
          alt={badge.alt || badge.name}
          height={32}
          width={80}
          className="h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
        />
      ))}
    </div>
  );
}

// Full trust section with certifications and memberships
interface TrustSectionProps {
  className?: string;
}

export function TrustSection({ className = '' }: TrustSectionProps) {
  const badges = config.trustBadges || [];
  const certifications = config.trustSignals?.certifications || [];
  
  if (badges.length === 0 && certifications.length === 0) {
    return null;
  }

  return (
    <section className={`trust-section bg-gray-50 py-12 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm"
                >
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Membership Badges */}
        {badges.length > 0 && (
          <TrustBadges 
            badges={badges}
            title="Proud Member Of"
            size="md"
          />
        )}
      </div>
    </section>
  );
}
