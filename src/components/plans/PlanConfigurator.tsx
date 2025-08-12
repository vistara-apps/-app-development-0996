import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from 'lucide-react';

interface PlanFormData {
  name: string;
  description: string;
  basePrice: number;
  usageLimit: number;
  overagePricePerUnit: number;
  overageMargin: number;
}

interface PlanConfiguratorProps {
  variant?: 'simple' | 'advanced';
  onSave: (plan: PlanFormData) => void;
  onCancel: () => void;
  initialData?: Partial<PlanFormData>;
}

export function PlanConfigurator({ 
  variant = 'simple', 
  onSave, 
  onCancel, 
  initialData 
}: PlanConfiguratorProps) {
  const [formData, setFormData] = useState<PlanFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    basePrice: initialData?.basePrice || 0,
    usageLimit: initialData?.usageLimit || 1000,
    overagePricePerUnit: initialData?.overagePricePerUnit || 0.01,
    overageMargin: initialData?.overageMargin || 20,
  });

  const [features, setFeatures] = useState<string[]>(['API Calls', 'Data Storage']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <Card variant="elevated" className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="heading1">Create Subscription Plan</h2>
        <p className="caption text-text-secondary mt-2">
          Define your service tiers with usage limits and overage pricing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Plan Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Starter Plan"
            required
          />
          
          <Input
            label="Base Price ($)"
            type="number"
            step="0.01"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
            placeholder="29.99"
            required
          />
        </div>

        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Perfect for small teams getting started"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Usage Limit"
            type="number"
            value={formData.usageLimit}
            onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
            placeholder="1000"
            required
          />
          
          <Input
            label="Overage Price per Unit ($)"
            type="number"
            step="0.001"
            value={formData.overagePricePerUnit}
            onChange={(e) => setFormData({ ...formData, overagePricePerUnit: parseFloat(e.target.value) })}
            placeholder="0.01"
            required
          />
        </div>

        {variant === 'advanced' && (
          <>
            <Input
              label="Overage Margin (%)"
              type="number"
              value={formData.overageMargin}
              onChange={(e) => setFormData({ ...formData, overageMargin: parseFloat(e.target.value) })}
              placeholder="20"
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Plan Features
              </label>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFeature(index)}
                      className="p-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Feature</span>
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Plan
          </Button>
        </div>
      </form>
    </Card>
  );
}