// src/components/CityMapEmbed.tsx
import { config, getMapZoom, getBusinessName } from '@/lib/site';

interface CityMapEmbedProps {
  city: string;
  state: string;
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
}

export default function CityMapEmbed({ 
  city, 
  state, 
  width = '100%', 
  height = '300',
  zoom,
  className = '',
}: CityMapEmbedProps) {
  // Use provided zoom or get from config with fallback
  const mapZoom = zoom ?? getMapZoom();
  
  // Build search query for the city
  const searchQuery = `${city}, ${state}`;
  const encodedQuery = encodeURIComponent(searchQuery);
  
  // Google Maps embed URL (no API key required for basic embed)
  const src = `https://www.google.com/maps?q=${encodedQuery}&z=${mapZoom}&output=embed`;

  return (
    <div className={`city-map-embed ${className}`}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${city}, ${state}`}
      />
      <p className="map-caption text-sm text-gray-600 mt-2">
        📍 Serving {city}, {state} and surrounding areas
      </p>
    </div>
  );
}
