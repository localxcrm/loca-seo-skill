// src/components/LocalDeepParagraph.tsx
// Renders the unique local content paragraph that cannot exist on any other site
// See references/local-proof-checklist.md for requirements

import { ServiceArea, Service, getBusinessName } from '@/lib/site';

interface LocalDeepParagraphProps {
  location: ServiceArea;
  service?: Service;
  className?: string;
}

/**
 * Renders the location's unique local paragraph.
 * 
 * This content must include:
 * - 2+ neighborhood names OR 2+ local landmarks
 * - Location-specific insight (housing types, regional issues)
 * - 50+ words of unique content
 * 
 * If no localParagraph is configured, generates from available data.
 */
export default function LocalDeepParagraph({
  location,
  service,
  className = '',
}: LocalDeepParagraphProps) {
  const businessName = getBusinessName();
  
  // If a custom local paragraph exists, use it
  if (location.localParagraph?.trim()) {
    return (
      <div className={`local-deep-paragraph ${className}`}>
        <p className="text-gray-700 leading-relaxed">
          {location.localParagraph.trim()}
        </p>
      </div>
    );
  }
  
  // Otherwise, generate from available data
  const hasNeighborhoods = location.neighborhoods && location.neighborhoods.length >= 2;
  const hasLandmarks = location.landmarks && location.landmarks.length >= 2;
  const hasRegionalIssues = location.regionalIssues && location.regionalIssues.length > 0;
  const hasHousingTypes = location.housingTypes && location.housingTypes.length > 0;
  
  // If we don't have enough data, don't render anything
  if (!hasNeighborhoods && !hasLandmarks) {
    return null;
  }
  
  // Build the paragraph dynamically
  const parts: string[] = [];
  
  // Opening with housing types or general statement
  if (hasHousingTypes) {
    const types = location.housingTypes!.slice(0, 3).join(', ');
    parts.push(`In ${location.city}, many homes feature ${types} architecture`);
  } else {
    parts.push(`${businessName} has been proudly serving ${location.city} homeowners`);
  }
  
  // Add regional issue context
  if (hasRegionalIssues) {
    const issue = location.regionalIssues![0].toLowerCase();
    parts.push(`which often requires attention due to ${issue}`);
  }
  
  // Add neighborhood/landmark specifics
  if (hasNeighborhoods && hasLandmarks) {
    const hoods = location.neighborhoods!.slice(0, 2).join(' and ');
    const marks = location.landmarks!.slice(0, 2).join(' and ');
    parts.push(`We frequently serve neighborhoods like ${hoods}, as well as homes near ${marks}`);
  } else if (hasNeighborhoods) {
    const hoods = location.neighborhoods!.slice(0, 3).join(', ');
    parts.push(`We frequently serve neighborhoods including ${hoods}`);
  } else if (hasLandmarks) {
    const marks = location.landmarks!.slice(0, 3).join(', ');
    parts.push(`We serve homes throughout ${location.city}, from areas near ${marks} and beyond`);
  }
  
  // Add service-specific context if provided
  if (service) {
    parts.push(`where our ${service.name.toLowerCase()} expertise helps maintain property value`);
  }
  
  // Build the final paragraph
  let paragraph = parts[0];
  if (parts[1]) paragraph += `, ${parts[1]}`;
  paragraph += '. ';
  if (parts[2]) paragraph += parts[2];
  if (parts[3]) paragraph += `, ${parts[3]}`;
  paragraph += '.';
  
  return (
    <div className={`local-deep-paragraph ${className}`}>
      <p className="text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
}

/**
 * Check if we have enough data to render a local deep paragraph
 */
export function hasLocalDeepContent(location: ServiceArea): boolean {
  if (location.localParagraph?.trim()) return true;
  
  const hasNeighborhoods = (location.neighborhoods?.length || 0) >= 2;
  const hasLandmarks = (location.landmarks?.length || 0) >= 2;
  
  return hasNeighborhoods || hasLandmarks;
}
