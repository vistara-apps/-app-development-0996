import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { UsageMeter } from '../components/usage/UsageMeter';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface Subscription {
  subscriptionId: string;
  customerEmail: string;
  planName: string;
  planId: string;
  currentUsage: number;
  usageLimit: number;
  overageCharges: number;
  status: 'active' | 'canceled' | 'paused' | 'overage';
  startDate: string;
  endDate: string;
  basePrice: number;
}

export function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [paid, setPaid] = useState(false);
  const { createSession } = usePaymentContext();

  // Mock data
  const subscriptions: Subscription[] = [
    {
      subscriptionId: 'sub_1',
      customerEmail: 'user@example.com',
      planName: 'Starter Plan',
      planId: 'plan_1',
      currentUsage: 1250,
      usageLimit: 1000,
      overageCharges: 2.50,
      status: 'overage',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      basePrice: 29.99,
    },
    {
      subscriptionId: 'sub_2',
      customerEmail: 'team@startup.co',
      planName: 'Pro Plan',
      planId: 'plan_2',
      currentUsage: 4800,
      usageLimit: 5000,
      overageCharges: 0,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      basePrice: 99.99,
    },
    {
      subscriptionId: 'sub_3',
      customerEmail: 'admin@company.com',
      planName: 'Enterprise Plan',
      planId: 'plan_3',
      currentUsage: 15200,
      usageLimit: 10000,
      overageCharges: 26.00,
      status: 'overage',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      basePrice: 299.99,
    },
    {
      subscriptionId: 'sub_4',
      customerEmail: 'dev@agency.com',
      planName: 'Pro Plan',
      planId: 'plan_2',
      currentUsage: 3200,
      usageLimit: 5000,
      overageCharges: 0,
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      basePrice: 99.99,
    },
    {
      subscriptionId: 'sub_5',
      customerEmail: 'support@business.org',
      planName: 'Starter Plan',
      planId: 'plan_1',
      currentUsage: 800,
      usageLimit: 1000,
      overageCharges: 0,
      status: 'paused',
      startDate: '2024-01-05',
      endDate: '2024-02-05',
      basePrice: 29.99,
    },
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'overage':
        return <AlertTriangle size={16} className="text-red-600" />;
      case 'paused':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overage':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOveragePayment = async (subscription: Subscription) => {
    try {
      await createSession(`$${subscription.overageCharges.toFixed(2)}`);
      setPaid(true);
      alert(`Payment processed for ${subscription.customerEmail}: $${subscription.overageCharges.toFixed(2)}`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const totalOverages = subscriptions
    .filter(sub => sub.status === 'overage')
    .reduce((sum, sub) => sum + sub.overageCharges, 0);

  const totalRevenue = subscriptions
    .filter(sub => sub.status === 'active' || sub.status === 'overage')
    .reduce((sum, sub) => sum + sub.basePrice + sub.overageCharges, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading1">Subscriptions</h1>
          <p className="caption text-text-secondary mt-1">
            Monitor and manage all active subscriptions and overage charges
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download size={16} />
          <span>Export Data</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="caption text-text-secondary">Total Subscriptions</p>
              <p className="text-2xl font-bold text-text-primary">{subscriptions.length}</p>
            </div>
            <CheckCircle size={32} className="text-primary" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="caption text-text-secondary">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {subscriptions.filter(sub => sub.status === 'active').length}
              </p>
            </div>
            <CheckCircle size={32} className="text-green-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="caption text-text-secondary">With Overages</p>
              <p className="text-2xl font-bold text-red-600">
                {subscriptions.filter(sub => sub.status === 'overage').length}
              </p>
            </div>
            <AlertTriangle size={32} className="text-red-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="caption text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign size={32} className="text-primary" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search by email or plan name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-text-secondary" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input min-w-32"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="overage">Overage</option>
                <option value="paused">Paused</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {filteredSubscriptions.map((subscription, index) => (
          <Card 
            key={subscription.subscriptionId}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Customer Info */}
              <div className="lg:col-span-3">
                <div className="flex items-center space-x-2 mb-1">
                  {getStatusIcon(subscription.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </div>
                <p className="font-medium text-text-primary">{subscription.customerEmail}</p>
                <p className="caption text-text-secondary">{subscription.planName}</p>
              </div>

              {/* Usage Meter */}
              <div className="lg:col-span-4">
                <UsageMeter
                  variant="inline"
                  currentUsage={subscription.currentUsage}
                  usageLimit={subscription.usageLimit}
                  overageCharges={subscription.overageCharges}
                  planName=""
                />
              </div>

              {/* Billing Info */}
              <div className="lg:col-span-3">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="caption text-text-secondary">Base Price:</span>
                    <span className="caption font-medium">${subscription.basePrice}</span>
                  </div>
                  {subscription.overageCharges > 0 && (
                    <div className="flex justify-between">
                      <span className="caption text-text-secondary">Overage:</span>
                      <span className="caption font-medium text-red-600">
                        +${subscription.overageCharges.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-1">
                    <span className="caption font-medium">Total:</span>
                    <span className="caption font-bold">
                      ${(subscription.basePrice + subscription.overageCharges).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-2 flex flex-col space-y-2">
                {subscription.status === 'overage' && subscription.overageCharges > 0 && (
                  <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => handleOveragePayment(subscription)}
                  >
                    Collect ${subscription.overageCharges.toFixed(2)}
                  </Button>
                )}
                <Button variant="outline" className="text-sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSubscriptions.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <p className="text-text-secondary">No subscriptions found matching your criteria.</p>
          </div>
        </Card>
      )}

      {/* Summary */}
      {totalOverages > 0 && (
        <Card variant="elevated" className="bg-red-50 border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-red-800">Outstanding Overage Charges</h3>
              <p className="text-red-600">
                Total pending overage collection: <span className="font-bold">${totalOverages.toFixed(2)}</span>
              </p>
            </div>
            <Button 
              variant="primary" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => alert(`Bulk collection initiated for $${totalOverages.toFixed(2)}`)}
            >
              Collect All Overages
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}