import React, { forwardRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  error, 
  success,
  helperText,
  size = 'md',
  variant = 'default', 
  className = '',
  leftIcon,
  rightIcon,
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };
  
  const variantClasses = {
    default: 'bg-surface border border-border',
    filled: 'bg-surface-hover border border-transparent',
  };
  
  const stateClasses = error 
    ? 'border-error focus:border-error focus:ring-error' 
    : success 
    ? 'border-success focus:border-success focus:ring-success'
    : 'focus:border-primary focus:ring-primary';
  
  const baseClasses = `w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-text-tertiary">
              {leftIcon}
            </div>
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses} ${className}`}
          {...props}
        />
        {(rightIcon || error || success) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error ? (
              <AlertCircle className="text-error" size={16} />
            ) : success ? (
              <CheckCircle className="text-success" size={16} />
            ) : (
              <div className="text-text-tertiary">
                {rightIcon}
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-success flex items-center gap-1">
          <CheckCircle size={14} />
          {success}
        </p>
      )}
      {helperText && !error && !success && (
        <p className="text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
});
