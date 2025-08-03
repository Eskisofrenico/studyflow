import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false 
}: CardProps) {
  const paddingStyles = {
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div 
      className={clsx(
        'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200',
        paddingStyles[padding],
        hover && 'hover:shadow-md transition-shadow cursor-pointer',
        'touch-manipulation', // Better touch interactions on mobile
        className
      )}
    >
      {children}
    </div>
  );
}