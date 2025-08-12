import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default', 
  padding = 'md',
  className = '',
  onClick,
  ...props 
}: CardProps) {
  const baseClasses = 'bg-surface rounded-lg transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const variantClasses = {
    default: 'shadow-md border border-transparent',
    elevated: 'shadow-lg border border-transparent',
    outlined: 'shadow-sm border border-border',
    interactive: 'shadow-md border border-transparent hover:shadow-lg hover:border-border-hover cursor-pointer',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component 
      className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...(onClick && { role: 'button', tabIndex: 0 })}
      {...props}
    >
      {children}
    </Component>
  );
}
