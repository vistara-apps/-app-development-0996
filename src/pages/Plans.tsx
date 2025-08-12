import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlanConfigurator } from '../components/plans/PlanConfigurator';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

interface Plan {
  planId: string;
  name: string;
  description: string;
  basePrice: number;
  usageLimit: number;
  overagePricePerUnit: number;
  overageMargin: number;
  subscribers: number;
  status: 'active' | 'draft';
}

export function Plans() {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  
  // Mock data
  const [plans, setPlans] = useState<Plan[]>([
    {
      planId: '1',
      name: 'Starter Plan',
      description: 'Perfect for small teams getting started',
      basePrice: 29.99,
      usageLimit: 1000,
      overagePricePerUnit: 0.01,
      overageMargin: 20,
      subscribers: 156,
      status: 'active',
    },
    {
      planId: '2',
      name: 'Pro Plan',
      description: 'For growing businesses with higher usage needs',
      basePrice: 99.99,
      usageLimit: 5000,
      overagePricePerUnit: 0.008,
      overageMargin: 25,
      subscribers: 89,
      status: 'active',
    },
    {
      planId: '3',
      name: 'Enterprise Plan',
      description: 'Custom solution for large organizations',
      basePrice: 299.99,
      usageLimit: 20000,
      overagePricePerUnit: 0.005,
      overageMargin: 30,
      subscribers: 23,
      status: 'active',
    },
  ]);

  const handleSavePlan = (planData: any) => {
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.planId === editingPlan.planId 
          ? { ...plan, ...planData }
          : plan
      ));
      setEditingPlan(null);
    } else {
      // Create new plan
      const newPlan: Plan = {
        planId: `plan_${Date.now()}`,
        ...planData,
        subscribers: 0,
        status: 'draft' as const,
      };
      setPlans([...plans, newPlan]);
    }
    setShowConfigurator(false);
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setShowConfigurator(true);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(plan => plan.planId !== planId));
  };

  const handleCancel = () => {
    setShowConfigurator(false);
    setEditingPlan(null);
  };

  if (showConfigurator) {
    return (
      <div className="animate-fade-in">
        <PlanConfigurator
          variant="advanced"
          onSave={handleSavePlan}
          onCancel={handleCancel}
          initialData={editingPlan || undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading1">Subscription Plans</h1>
          <p className="caption text-text-secondary mt-1">
            Create and manage your subscription tiers with usage limits and overage pricing
          </p>
        </div>
        <Button 
          onClick={() => setShowConfigurator(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Plan</span>
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={plan.planId} 
            className="animate-slide-up hover:shadow-lg transition-shadow duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  plan.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {plan.status}
                </span>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  onClick={() => handleEditPlan(plan)}
                  className="p-2"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeletePlan(plan.planId)}
                  className="p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <p className="text-text-secondary mb-4">{plan.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Price</span>
                <span className="font-semibold">${plan.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Usage Limit</span>
                <span className="font-semibold">{plan.usageLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Overage Rate</span>
                <span className="font-semibold">${plan.overagePricePerUnit}/unit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Margin</span>
                <span className="font-semibold">{plan.overageMargin}%</span>
              </div>
            </div>

            <div className="border-t pt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {plan.subscribers} subscribers
                </span>
              </div>
              <Button variant="outline" className="text-sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}

        {/* Create Plan Card */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200 cursor-pointer">
          <div 
            className="h-full flex flex-col items-center justify-center text-center py-8"
            onClick={() => setShowConfigurator(true)}
          >
            <Plus size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-text-secondary mb-2">Create New Plan</h3>
            <p className="text-text-secondary">
              Define usage limits and overage pricing for your service
            </p>
          </div>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{plans.length}</div>
            <div className="text-sm text-text-secondary">Total Plans</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {plans.reduce((sum, plan) => sum + plan.subscribers, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Subscribers</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              ${plans.reduce((sum, plan) => sum + (plan.basePrice * plan.subscribers), 0).toFixed(0)}
            </div>
            <div className="text-sm text-text-secondary">Monthly Revenue</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {plans.filter(plan => plan.status === 'active').length}
            </div>
            <div className="text-sm text-text-secondary">Active Plans</div>
          </div>
        </Card>
      </div>
    </div>
  );
}