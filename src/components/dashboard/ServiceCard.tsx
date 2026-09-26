import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  highlight?: boolean;
}

export const ServiceCard = ({ title, description, image, highlight }: ServiceCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer transition-all duration-300 hover:shadow-2xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-2xl font-bold font-serif mb-2">{title}</h3>
        <p className="text-sm opacity-90 line-clamp-2">{description}</p>
      </div>
      {highlight && (
        <div className="absolute top-4 right-4 bg-gold-500 text-white text-xs font-bold px-2 py-1 rounded">
          POPULAR
        </div>
      )}
    </div>
  );
};
