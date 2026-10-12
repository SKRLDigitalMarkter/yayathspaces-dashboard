import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  icon?: any;
  variant?: 'purple' | 'gold';
}

export const StatCard = ({ value, label, description, icon: Icon, variant = 'purple' }: StatCardProps) => {
  const variantClasses = variant === 'purple'
    ? 'bg-[#3B1E7C] text-white'
    : 'bg-[#D4A017] text-white';

  return (
    <div className={`p-8 rounded-xl ${variantClasses} flex flex-col justify-center items-center text-center transition-transform hover:scale-105 cursor-default shadow-lg`}>
      <div className="text-5xl font-bold mb-2 font-serif">{value}</div>
      <div className="text-xl font-semibold mb-1">{label}</div>
      <div className="text-sm opacity-90">{description}</div>
    </div>
  );
};
