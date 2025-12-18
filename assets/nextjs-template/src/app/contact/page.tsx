// src/app/contact/page.tsx
import { Metadata } from 'next';
import config from '../../../site.config';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import GMBMapEmbed from '@/components/GMBMapEmbed';
import SocialIcons from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: `Contact ${config.business.name} | Free Estimate`,
  description: `Contact ${config.business.name} for a free estimate. Call ${config.business.phone} or fill out our form. Serving ${config.address.city}, ${config.address.state} and surrounding areas.`,
  alternates: {
    canonical: `${config.business.url}/contact`,
  },
};

export default function ContactPage() {
  const localBusinessSchema = generateLocalBusinessSchema(config);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: config.business.url },
    { name: 'Contact', url: `${config.business.url}/contact` },
  ]);

  // Format hours for display
  const formatHours = (hours: string) => {
    if (hours === 'Closed') return 'Closed';
    const [open, close] = hours.split('-');
    return `${formatTime(open)} - ${formatTime(close)}`;
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = config.hours || {};

  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, breadcrumbSchema]} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]}
        />

        <h1 className="text-4xl font-bold mb-6">Contact {config.business.name}</h1>

        <p className="text-lg text-gray-700 mb-10 max-w-2xl">
          Ready to get started? Contact us for a free, no-obligation estimate. 
          We serve {config.address.city} and all surrounding areas.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${config.business.phone}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-primary">{config.business.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${config.business.email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-primary">{config.business.email}</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {config.address.street}
                      {config.address.suite && `, ${config.address.suite}`}
                      <br />
                      {config.address.city}, {config.address.state} {config.address.zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Follow Us</p>
                <SocialIcons size="md" />
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Business Hours</h2>
              <div className="space-y-2">
                {dayNames.map((day) => {
                  const dayKey = day.toLowerCase() as keyof typeof hours;
                  const dayHours = hours[dayKey] || 'Closed';
                  const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
                  
                  return (
                    <div
                      key={day}
                      className={`flex justify-between py-2 ${isToday ? 'font-semibold text-primary' : ''}`}
                    >
                      <span>{day}</span>
                      <span>{formatHours(dayHours)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <GMBMapEmbed height="250" className="rounded-lg overflow-hidden" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${config.business.name} ${config.address.city} ${config.address.state}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Service Areas</h2>
          <p className="text-gray-700 mb-6">
            We provide free estimates throughout {config.address.city} and these surrounding communities:
          </p>
          <div className="flex flex-wrap gap-2">
            {config.serviceAreas?.map((area) => (
              <span key={area.slug} className="px-4 py-2 bg-gray-100 rounded-full">
                {area.city}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
