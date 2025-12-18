// src/components/ServiceCard.tsx
import Link from 'next/link';

interface ServiceCardProps {
  name: string;
  slug: string;
  description: string;
  priceRange?: string;
  duration?: string;
  image?: string;
  citySlug?: string; // If provided, links to location+service combo page
  className?: string;
}

export default function ServiceCard({
  name,
  slug,
  description,
  priceRange,
  duration,
  image,
  citySlug,
  className = '',
}: ServiceCardProps) {
  // Determine the link URL
  const href = citySlug 
    ? `/locations/${citySlug}/${slug}` 
    : `/services/${slug}`;

  return (
    <div className={`service-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {image && (
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={href} className="hover:text-primary transition-colors">
            {name}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          {priceRange && (
            <span className="flex items-center">
              💰 {priceRange}
            </span>
          )}
          {duration && (
            <span className="flex items-center">
              ⏱️ {duration}
            </span>
          )}
        </div>
        
        <Link 
          href={href}
          className="inline-block text-primary font-medium hover:underline"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}

// Grid wrapper for multiple service cards
interface ServiceGridProps {
  services: ServiceCardProps[];
  columns?: 2 | 3 | 4;
  citySlug?: string;
}

export function ServiceGrid({ services, columns = 3, citySlug }: ServiceGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {services.map((service) => (
        <ServiceCard 
          key={service.slug} 
          {...service} 
          citySlug={citySlug}
        />
      ))}
    </div>
  );
}
