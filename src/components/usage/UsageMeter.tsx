import React from 'react';
import { Card } from '../ui/Card';

interface UsageMeterProps {
  variant?: 'inline' | 'standalone';
  currentUsage: number;
  usageLimit: number;
  overageCharges: number;
  planName: string;
}

export function UsageMeter({ 
  variant = 'standalone', 
  currentUsage, 
  usageLimit, 
  overageCharges,
  planName 
}: UsageMeterProps) {
  const usagePercentage = Math.min((currentUsage / usageLimit) * 100, 100);
  const isOverage = currentUsage > usageLimit;
  const overageAmount = Math.max(0, currentUsage - usageLimit);

  const content = (
    <div className={variant === 'inline' ? 'p-4' : ''}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-text-primary">{planName}</h3>
        <span className="caption text-text-secondary">
          {currentUsage.toLocaleString()} / {usageLimit.toLocaleString()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isOverage ? 'bg-red-500' : 'bg-accent'
          }`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        />
      </div>
      
      {isOverage && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-red-800">
              Overage: {overageAmount.toLocaleString()} units
            </span>
            <span className="text-sm font-bold text-red-800">
              ${overageCharges.toFixed(2)}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2 text-sm text-text-secondary">
        <span>Usage this period</span>
        <span className={isOverage ? 'text-red-600 font-medium' : ''}>
          {usagePercentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );

  if (variant === 'inline') {
    return content;
  }

  return (
    <Card>
      {content}
    </Card>
  );
}