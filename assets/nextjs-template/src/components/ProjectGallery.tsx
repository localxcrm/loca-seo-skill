// src/components/ProjectGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { config, getBusinessName } from '@/lib/site';

interface Project {
  id: string;
  title: string;
  location?: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

interface ProjectGalleryProps {
  serviceSlug?: string;  // Filter by service
  projects?: Project[];  // Or pass projects directly
  title?: string;
  showToggle?: boolean;  // Show before/after toggle
  columns?: 1 | 2 | 3;
  className?: string;
}

export default function ProjectGallery({
  serviceSlug,
  projects: projectsProp,
  title = "Our Work",
  showToggle = true,
  columns = 2,
  className = '',
}: ProjectGalleryProps) {
  const businessName = getBusinessName();
  
  // Get projects from config or props
  let projects = projectsProp;
  
  if (!projects && serviceSlug) {
    const service = config.services?.find(s => s.slug === serviceSlug);
    projects = service?.projects || [];
  }
  
  if (!projects || projects.length === 0) {
    return null;
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className={`project-gallery ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            showToggle={showToggle}
          />
        ))}
      </div>
    </section>
  );
}

// Individual project card with before/after toggle
function ProjectCard({ 
  project, 
  showToggle 
}: { 
  project: Project; 
  showToggle: boolean;
}) {
  const [showAfter, setShowAfter] = useState(true);
  
  return (
    <div className="project-card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {/* Before Image */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${showAfter ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={project.beforeImage}
            alt={`${project.title} - Before`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Before
          </span>
        </div>
        
        {/* After Image */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={project.afterImage}
            alt={`${project.title} - After`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            After
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
        {project.location && (
          <p className="text-gray-500 text-sm mb-2">📍 {project.location}</p>
        )}
        {project.description && (
          <p className="text-gray-600 text-sm">{project.description}</p>
        )}
        
        {/* Toggle Button */}
        {showToggle && (
          <button
            onClick={() => setShowAfter(!showAfter)}
            className="mt-3 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Show {showAfter ? 'Before' : 'After'}
          </button>
        )}
      </div>
    </div>
  );
}

// Before/After Slider Component (alternative display)
interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className={`before-after-slider ${className}`}>
      {title && <h3 className="font-semibold mb-3">{title}</h3>}
      
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        {/* After Image (full width, behind) */}
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
        />
        
        {/* Before Image (clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={beforeImage}
            alt="Before"
            fill
            className="object-cover"
            style={{ maxWidth: 'none', width: `${100 / (sliderPosition / 100)}%` }}
          />
        </div>
        
        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-gray-600">↔</span>
          </div>
        </div>
        
        {/* Labels */}
        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs">Before</span>
        <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs">After</span>
        
        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
    </div>
  );
}
