import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactItemProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const ContactItem = ({ label, value, icon: Icon }: ContactItemProps) => {
  return (
    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all group">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</span>
        <span className="text-lg font-medium text-gray-900">{value}</span>
      </div>
      <div className="w-12 h-12 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
