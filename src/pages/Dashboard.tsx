import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatGrid } from '../components/ui/StatCard';
import { UsageMeter } from '../components/usage/UsageMeter';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  CreditCard,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export function Dashboard() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,567',
      change: {
        value: '+12.5%',
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <DollarSign size={24} />,
      variant: 'success' as const,
    },
    {
      title: 'Active Subscriptions',
      value: '1,247',
      change: {
        value: '+8.2%',
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <Users size={24} />,
      variant: 'info' as const,
    },
    {
      title: 'Overage Revenue',
      value: '$3,891',
      change: {
        value: '+23.1%',
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <TrendingUp size={24} />,
      variant: 'warning' as const,
    },
    {
      title: 'Active Plans',
      value: '12',
      change: {
        value: '+2',
        type: 'increase' as const,
        period: 'this month',
      },
      icon: <CreditCard size={24} />,
      variant: 'default' as const,
    },
  ];

  const recentSubscriptions = [
    {
      id: '1',
      customerEmail: 'user@example.com',
      planName: 'Starter Plan',
      currentUsage: 1250,
      usageLimit: 1000,
      overageCharges: 2.50,
      status: 'active',
    },
    {
      id: '2',
      customerEmail: 'team@startup.co',
      planName: 'Pro Plan',
      currentUsage: 4800,
      usageLimit: 5000,
      overageCharges: 0,
      status: 'active',
    },
    {
      id: '3',
      customerEmail: 'admin@company.com',
      planName: 'Enterprise Plan',
      currentUsage: 15200,
      usageLimit: 10000,
      overageCharges: 52.00,
      status: 'overage',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading1">Dashboard</h1>
          <p className="caption text-text-secondary mt-1">
            Monitor your subscription revenue and usage analytics
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Create Plan</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <StatGrid stats={stats} className="animate-slide-up" />

      {/* Usage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Subscriptions</h2>
              <Button variant="outline" className="text-sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentSubscriptions.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-text-primary">{subscription.customerEmail}</p>
                      <p className="caption text-text-secondary">{subscription.planName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscription.status === 'overage' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  
                  <UsageMeter
                    variant="inline"
                    currentUsage={subscription.currentUsage}
                    usageLimit={subscription.usageLimit}
                    overageCharges={subscription.overageCharges}
                    planName=""
                    unit="API calls"
                    showTrend={true}
                    trendValue={Math.random() > 0.5 ? Math.floor(Math.random() * 20) : -Math.floor(Math.random() * 10)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus size={16} className="mr-2" />
                Create New Plan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users size={16} className="mr-2" />
                Manage Subscriptions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp size={16} className="mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign size={16} className="mr-2" />
                Billing Settings
              </Button>
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="font-semibold mb-3">Revenue Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Subscriptions</span>
                <span className="font-medium">$20,676</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Overage Charges</span>
                <span className="font-medium text-accent">$3,891</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Revenue</span>
                <span>$24,567</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
