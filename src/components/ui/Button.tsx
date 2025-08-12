import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-base rounded-md gap-2',
    lg: 'px-6 py-3 text-lg rounded-lg gap-2.5',
  };
  
  const variantClasses = {
    primary: 'bg-primary text-text-inverse hover:bg-primary-hover focus:ring-primary shadow-sm',
    secondary: 'bg-surface border border-border text-text-primary hover:bg-surface-hover hover:border-border-hover focus:ring-primary shadow-sm',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-text-inverse focus:ring-primary',
    success: 'bg-success text-text-inverse hover:bg-success-hover focus:ring-success shadow-sm',
    warning: 'bg-warning text-text-inverse hover:bg-warning-hover focus:ring-warning shadow-sm',
    error: 'bg-error text-text-inverse hover:bg-error-hover focus:ring-error shadow-sm',
    ghost: 'text-text-primary hover:bg-surface-hover focus:ring-primary',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {children}
    </button>
  );
}
