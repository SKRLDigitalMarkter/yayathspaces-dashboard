import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FeatureItemProps {
  text: string;
}

export const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:border-gold-500 transition-colors">
      <CheckCircle2 className="w-5 h-5 text-gold-600" />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
};
