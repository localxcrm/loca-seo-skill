// src/components/FAQ.tsx
'use client';

import { useState } from 'react';
import { generateFAQSchema } from '@/lib/schema';
import SchemaMarkup from './SchemaMarkup';

interface FAQProps {
  faqs: { question: string; answer: string }[];
  title?: string;
  /** Set to false when page already handles FAQ schema */
  includeSchema?: boolean;
  className?: string;
}

export default function FAQ({ 
  faqs, 
  title = 'Frequently Asked Questions',
  includeSchema = true,
  className = '',
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Only generate schema if includeSchema is true
  const schema = includeSchema ? generateFAQSchema(faqs) : null;

  return (
    <section id="faq" className={`faq-section ${className}`}>
      {includeSchema && schema && <SchemaMarkup schema={schema} />}
      
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="faq-list space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="faq-item border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium pr-4">{faq.question}</span>
              <span className="text-gray-500 text-xl flex-shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
