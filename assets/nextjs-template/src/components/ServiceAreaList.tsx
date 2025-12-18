// src/components/ServiceAreaList.tsx
import Link from 'next/link';
import { getAllServiceAreas } from '@/lib/site';

interface ServiceAreaListProps {
  title?: string;
  showCount?: boolean;
  columns?: 2 | 3 | 4 | 5;
  serviceSlug?: string; // If provided, links to location+service combo pages
  excludeCity?: string; // Exclude a specific city (useful on location pages)
  limit?: number;
  className?: string;
}

export default function ServiceAreaList({
  title = "Service Areas",
  showCount = true,
  columns = 4,
  serviceSlug,
  excludeCity,
  limit,
  className = '',
}: ServiceAreaListProps) {
  const allAreas = getAllServiceAreas();
  let areas = [...allAreas];
  
  // Filter out excluded city
  if (excludeCity) {
    areas = areas.filter(area => area.city !== excludeCity);
  }
  
  // Apply limit
  if (limit) {
    areas = areas.slice(0, limit);
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    5: 'md:grid-cols-3 lg:grid-cols-5',
  };

  return (
    <section className={`service-area-list ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showCount && (
            <span className="text-gray-500 text-sm">
              Serving {allAreas.length} cities
            </span>
          )}
        </div>
      )}
      
      <div className={`grid grid-cols-2 ${gridCols[columns]} gap-3`}>
        {areas.map((area) => {
          const href = serviceSlug 
            ? `/locations/${area.slug}/${serviceSlug}`
            : `/locations/${area.slug}`;
            
          return (
            <Link
              key={area.slug}
              href={href}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
            >
              <span className="font-medium group-hover:text-primary transition-colors">
                {area.city}
              </span>
              {area.state && (
                <span className="text-gray-500 text-sm ml-1">
                  , {area.state}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      
      {limit && allAreas.length > limit && (
        <div className="mt-6 text-center">
          <Link 
            href="/locations" 
            className="text-primary hover:underline font-medium"
          >
            View All {allAreas.length} Locations →
          </Link>
        </div>
      )}
    </section>
  );
}

// Compact inline list version
interface ServiceAreaInlineProps {
  serviceSlug?: string;
  excludeCity?: string;
  limit?: number;
  className?: string;
}

export function ServiceAreaInline({
  serviceSlug,
  excludeCity,
  limit = 6,
  className = '',
}: ServiceAreaInlineProps) {
  const allAreas = getAllServiceAreas();
  let areas = [...allAreas];
  
  if (excludeCity) {
    areas = areas.filter(area => area.city !== excludeCity);
  }
  
  const displayAreas = areas.slice(0, limit);
  const remaining = areas.length - limit;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayAreas.map((area) => {
        const href = serviceSlug 
          ? `/locations/${area.slug}/${serviceSlug}`
          : `/locations/${area.slug}`;
          
        return (
          <Link
            key={area.slug}
            href={href}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {area.city}
          </Link>
        );
      })}
      {remaining > 0 && (
        <Link
          href="/locations"
          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
        >
          +{remaining} more
        </Link>
      )}
    </div>
  );
}
