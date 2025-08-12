import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UsageMeter } from '../components/usage/UsageMeter';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export function Dashboard() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,567',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Subscriptions',
      value: '1,247',
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Overage Revenue',
      value: '$3,891',
      change: '+23.1%',
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      title: 'Plans Created',
      value: '12',
      change: '+2',
      icon: AlertTriangle,
      color: 'text-primary',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="caption text-text-secondary">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight size={14} className={stat.color} />
                  <span className={`text-sm ${stat.color}`}>{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-100`}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

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