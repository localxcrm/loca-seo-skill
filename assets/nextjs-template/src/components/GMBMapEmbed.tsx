// src/components/GMBMapEmbed.tsx
import { config, getGMBEmbedUrl, getGooglePlaceId, getBusinessName } from '@/lib/site';

interface GMBMapEmbedProps {
  embedUrl?: string;
  placeId?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function GMBMapEmbed({ 
  embedUrl,
  placeId,
  width = '100%', 
  height = '300',
  className = '',
}: GMBMapEmbedProps) {
  const businessName = getBusinessName();
  const configEmbedUrl = getGMBEmbedUrl();
  const configPlaceId = getGooglePlaceId();
  
  // Priority: embedUrl prop > config embedUrl > placeId (with API key)
  let src: string | null = null;
  
  if (embedUrl) {
    src = embedUrl;
  } else if (configEmbedUrl) {
    src = configEmbedUrl;
  } else if ((placeId || configPlaceId) && config.embeds?.googleMapsApiKey) {
    src = `https://www.google.com/maps/embed/v1/place?key=${config.embeds.googleMapsApiKey}&q=place_id:${placeId || configPlaceId}`;
  }

  if (!src) {
    // Fallback: search-based embed (no API key needed)
    const searchQuery = `${businessName} ${config.address.city} ${config.address.state}`;
    src = `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
  }

  return (
    <div className={`gmb-map-embed ${className}`}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${businessName} - Location Map`}
      />
    </div>
  );
}
