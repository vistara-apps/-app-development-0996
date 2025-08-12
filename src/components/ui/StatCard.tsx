import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  loading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  variant = 'default',
  loading = false,
  className = '',
}: StatCardProps) {
  const variantStyles = {
    default: {
      iconBg: 'bg-primary-light',
      iconColor: 'text-primary',
    },
    success: {
      iconBg: 'bg-success-light',
      iconColor: 'text-success',
    },
    warning: {
      iconBg: 'bg-warning-light',
      iconColor: 'text-warning',
    },
    error: {
      iconBg: 'bg-error-light',
      iconColor: 'text-error',
    },
    info: {
      iconBg: 'bg-info-light',
      iconColor: 'text-info',
    },
  };

  const changeStyles = {
    increase: {
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success-light',
    },
    decrease: {
      icon: TrendingDown,
      color: 'text-error',
      bg: 'bg-error-light',
    },
    neutral: {
      icon: Minus,
      color: 'text-text-tertiary',
      bg: 'bg-border',
    },
  };

  if (loading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-border rounded-lg"></div>
          <div className="w-16 h-4 bg-border rounded"></div>
        </div>
        <div className="w-24 h-8 bg-border rounded mb-2"></div>
        <div className="w-20 h-4 bg-border rounded"></div>
      </Card>
    );
  }

  const styles = variantStyles[variant];
  const ChangeIcon = change ? changeStyles[change.type].icon : null;
  const changeStyle = change ? changeStyles[change.type] : null;

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles.iconBg}`}>
            <div className={styles.iconColor}>
              {icon}
            </div>
          </div>
        )}
        {change && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${changeStyle?.bg}`}>
            {ChangeIcon && <ChangeIcon size={12} className={changeStyle.color} />}
            <span className={`text-xs font-medium ${changeStyle.color}`}>
              {change.value}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="heading3 text-text-primary">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="body-sm text-text-secondary">
          {title}
          {change?.period && (
            <span className="text-text-tertiary"> • {change.period}</span>
          )}
        </p>
      </div>
    </Card>
  );
}

interface StatGridProps {
  stats: Array<Omit<StatCardProps, 'className'>>;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ stats, columns = 4, className = '' }: StatGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
