// src/components/CTABanner.tsx
import Link from 'next/link';
import config from '../../site.config';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  showPhone?: boolean;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CTABanner({
  title = "Ready to Get Started?",
  subtitle = `Contact ${config.business.name} today for a free, no-obligation estimate.`,
  primaryButtonText = config.ui?.ctaButtonText || "Get Free Estimate",
  primaryButtonLink = "/contact",
  showPhone = true,
  variant = 'primary',
  size = 'md',
  className = '',
}: CTABannerProps) {
  const variantStyles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-100 text-gray-900',
    dark: 'bg-gray-900 text-white',
  };

  const sizeStyles = {
    sm: 'py-8 px-6',
    md: 'py-12 px-8',
    lg: 'py-16 px-12',
  };

  const buttonVariant = {
    primary: 'bg-white text-primary hover:bg-gray-100',
    secondary: 'bg-primary text-white hover:bg-primary/90',
    dark: 'bg-white text-gray-900 hover:bg-gray-100',
  };

  const phoneButtonVariant = {
    primary: 'border-white text-white hover:bg-white hover:text-primary',
    secondary: 'border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'border-white text-white hover:bg-white hover:text-gray-900',
  };

  return (
    <section className={`cta-banner ${variantStyles[variant]} ${sizeStyles[size]} rounded-lg text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${variant === 'secondary' ? 'text-gray-600' : 'text-white/90'}`}>
          {subtitle}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href={primaryButtonLink}
          className={`inline-block px-8 py-4 rounded-lg font-semibold transition-colors ${buttonVariant[variant]}`}
        >
          {primaryButtonText}
        </Link>
        
        {showPhone && (
          <a 
            href={`tel:${config.business.phone}`}
            className={`inline-block px-8 py-4 rounded-lg font-semibold border-2 transition-colors ${phoneButtonVariant[variant]}`}
          >
            📞 {config.business.phone}
          </a>
        )}
      </div>
    </section>
  );
}

// Inline CTA for use within content
interface InlineCTAProps {
  text?: string;
  className?: string;
}

export function InlineCTA({ 
  text = "Contact us today for a free estimate.",
  className = '' 
}: InlineCTAProps) {
  return (
    <div className={`inline-cta bg-gray-50 border-l-4 border-primary p-6 rounded-r-lg my-8 ${className}`}>
      <p className="text-lg mb-4">{text}</p>
      <div className="flex flex-wrap gap-4">
        <Link 
          href="/contact"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Get Free Estimate
        </Link>
        <a 
          href={`tel:${config.business.phone}`}
          className="inline-block text-primary font-medium hover:underline"
        >
          Call {config.business.phone}
        </a>
      </div>
    </div>
  );
}
