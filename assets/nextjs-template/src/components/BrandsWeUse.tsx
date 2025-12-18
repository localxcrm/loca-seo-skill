// src/components/BrandsWeUse.tsx
// Displays product/brand logos ("Products We Use" section)
// Great for trust signals and entity association

import Image from 'next/image';
import { config } from '@/lib/site';

interface Brand {
  name: string;
  image: string;
  url?: string;
  description?: string;
}

interface BrandsWeUseProps {
  brands?: Brand[];
  title?: string;
  subtitle?: string;
  layout?: 'row' | 'grid' | 'cards';
  showDescriptions?: boolean;
  className?: string;
}

export default function BrandsWeUse({
  brands: brandsProp,
  title = "Products We Use",
  subtitle = "We trust these premium brands for lasting results",
  layout = 'row',
  showDescriptions = false,
  className = '',
}: BrandsWeUseProps) {
  // Get brands from config or props
  const brands = brandsProp || config.brands || [];
  
  if (!brands || brands.length === 0) {
    return null;
  }

  if (layout === 'cards') {
    return (
      <section className={`brands-we-use ${className}`}>
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={index} brand={brand} showDescription={showDescriptions} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`brands-we-use ${className}`}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className={`
        ${layout === 'row' 
          ? 'flex flex-wrap items-center justify-center gap-8 md:gap-12' 
          : 'grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center'
        }
      `}>
        {brands.map((brand, index) => (
          <BrandLogo key={index} brand={brand} />
        ))}
      </div>
    </section>
  );
}

function BrandLogo({ brand }: { brand: Brand }) {
  const imageElement = (
    <div className="relative h-12 md:h-16 w-auto">
      <Image
        src={brand.image}
        alt={`${brand.name} logo`}
        height={64}
        width={200}
        className="h-12 md:h-16 w-auto object-contain"
      />
    </div>
  );

  if (brand.url) {
    return (
      <a 
        href={brand.url}
        target="_blank"
        rel="noopener noreferrer"
        title={brand.name}
        className="block hover:opacity-80 transition-opacity"
      >
        {imageElement}
      </a>
    );
  }

  return imageElement;
}

function BrandCard({ 
  brand, 
  showDescription 
}: { 
  brand: Brand; 
  showDescription: boolean;
}) {
  return (
    <div className="brand-card bg-white p-6 rounded-lg shadow-md text-center">
      <div className="h-16 flex items-center justify-center mb-4">
        <Image
          src={brand.image}
          alt={`${brand.name} logo`}
          height={64}
          width={160}
          className="h-12 w-auto object-contain"
        />
      </div>
      <h3 className="font-medium text-gray-900">{brand.name}</h3>
      {showDescription && brand.description && (
        <p className="text-sm text-gray-500 mt-2">{brand.description}</p>
      )}
    </div>
  );
}

// Compact version for sidebar or footer
export function BrandsWeUseCompact({ 
  brands: brandsProp,
  title = "We Use",
  className = '' 
}: { 
  brands?: Brand[];
  title?: string;
  className?: string;
}) {
  const brands = brandsProp || config.brands || [];
  
  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className={`brands-compact ${className}`}>
      {title && (
        <p className="text-sm text-gray-500 mb-3">{title}</p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        {brands.map((brand, index) => (
          <Image
            key={index}
            src={brand.image}
            alt={brand.name}
            height={32}
            width={80}
            className="h-6 w-auto object-contain opacity-80"
          />
        ))}
      </div>
    </div>
  );
}

// Full section with description for service pages
interface BrandsSectionProps {
  serviceSlug?: string;
  className?: string;
}

export function BrandsSection({ serviceSlug, className = '' }: BrandsSectionProps) {
  const brands = config.brands || [];
  
  if (brands.length === 0) {
    return null;
  }

  return (
    <section className={`brands-section py-12 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Premium Products, Lasting Results</h2>
        <p className="text-gray-600 mb-8">
          We exclusively use industry-leading paints and materials for superior durability and finish.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-10 mb-8">
          {brands.map((brand, index) => (
            <div key={index} className="text-center">
              <div className="h-16 flex items-center justify-center mb-2">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  height={64}
                  width={160}
                  className="h-14 w-auto object-contain"
                />
              </div>
              {brand.description && (
                <p className="text-sm text-gray-500">{brand.description}</p>
              )}
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-500">
          Using premium products means better coverage, longer life, and a more beautiful finish.
        </p>
      </div>
    </section>
  );
}
