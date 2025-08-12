import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface UsageMeterProps {
  variant?: 'inline' | 'standalone';
  currentUsage: number;
  usageLimit: number;
  overageCharges: number;
  planName: string;
  unit?: string;
  showTrend?: boolean;
  trendValue?: number;
}

export function UsageMeter({ 
  variant = 'standalone', 
  currentUsage, 
  usageLimit, 
  overageCharges,
  planName,
  unit = 'units',
  showTrend = false,
  trendValue = 0
}: UsageMeterProps) {
  const usagePercentage = Math.min((currentUsage / usageLimit) * 100, 100);
  const isOverage = currentUsage > usageLimit;
  const overageAmount = Math.max(0, currentUsage - usageLimit);
  const isNearLimit = usagePercentage >= 80 && !isOverage;
  
  // Determine progress bar variant based on usage
  const getProgressVariant = () => {
    if (isOverage) return 'error';
    if (isNearLimit) return 'warning';
    return 'success';
  };

  const content = (
    <div className={variant === 'inline' ? 'p-4' : ''}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="heading4 text-text-primary mb-1">{planName}</h3>
          <p className="body-sm text-text-secondary">
            {currentUsage.toLocaleString()} / {usageLimit.toLocaleString()} {unit}
          </p>
        </div>
        
        {showTrend && trendValue !== 0 && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
            trendValue > 0 ? 'bg-success-light' : 'bg-error-light'
          }`}>
            <TrendingUp 
              size={12} 
              className={`${trendValue > 0 ? 'text-success' : 'text-error rotate-180'}`} 
            />
            <span className={`text-xs font-medium ${
              trendValue > 0 ? 'text-success' : 'text-error'
            }`}>
              {Math.abs(trendValue)}%
            </span>
          </div>
        )}
      </div>
      
      <ProgressBar
        value={currentUsage}
        max={usageLimit}
        variant={getProgressVariant()}
        showLabel
        className="mb-4"
      />
      
      {isOverage && (
        <div className="bg-error-light border border-error rounded-lg p-3 mb-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-error mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="body-sm font-medium text-error">
                  Overage: {overageAmount.toLocaleString()} {unit}
                </span>
                <span className="body-sm font-bold text-error">
                  ${overageCharges.toFixed(2)}
                </span>
              </div>
              <p className="caption-xs text-error mt-1">
                Additional charges will be applied to your next invoice
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isNearLimit && !isOverage && (
        <div className="bg-warning-light border border-warning rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-warning" />
            <span className="body-sm font-medium text-warning">
              Approaching usage limit ({usagePercentage.toFixed(1)}% used)
            </span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center text-text-tertiary">
        <span className="caption">Usage this billing period</span>
        <span className={`caption font-medium ${
          isOverage ? 'text-error' : isNearLimit ? 'text-warning' : 'text-success'
        }`}>
          {usagePercentage.toFixed(1)}% of limit
        </span>
      </div>
    </div>
  );

  if (variant === 'inline') {
    return content;
  }

  return (
    <Card variant="outlined" className="hover:shadow-md transition-shadow duration-200">
      {content}
    </Card>
  );
}
