import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const baseClasses = 'bg-surface rounded-lg p-6';
  const variantClasses = {
    default: 'shadow-card',
    elevated: 'shadow-modal',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}