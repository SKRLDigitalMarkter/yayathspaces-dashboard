import React from 'react';

interface PricingCardProps {
  title: string;
  bestFor: string;
  pricing: string;
  featured?: boolean;
}

export const PricingCard = ({ title, bestFor, pricing, featured }: PricingCardProps) => {
  return (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${featured ? 'border-gold-500 bg-gold-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold font-serif ${featured ? 'text-gold-700' : 'text-gray-900'}`}>
          {title} {featured && '★'}
        </h3>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Best For</p>
        <p className="text-sm text-gray-700">{bestFor}</p>
      </div>
      <div className="border-t pt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pricing</p>
        <p className="text-lg font-bold text-gray-900">{pricing}</p>
      </div>
    </div>
  );
};
