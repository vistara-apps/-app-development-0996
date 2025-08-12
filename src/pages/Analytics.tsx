import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle,
  Calendar,
  Download
} from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', base: 15000, overage: 2000, total: 17000 },
    { month: 'Feb', base: 18000, overage: 2800, total: 20800 },
    { month: 'Mar', base: 22000, overage: 3500, total: 25500 },
    { month: 'Apr', base: 25000, overage: 4200, total: 29200 },
    { month: 'May', base: 28000, overage: 5100, total: 33100 },
    { month: 'Jun', base: 32000, overage: 6300, total: 38300 },
  ];

  const usageData = [
    { date: '2024-01-01', usage: 85000, limit: 100000 },
    { date: '2024-01-08', usage: 92000, limit: 100000 },
    { date: '2024-01-15', usage: 105000, limit: 100000 },
    { date: '2024-01-22', usage: 118000, limit: 100000 },
    { date: '2024-01-29', usage: 125000, limit: 100000 },
  ];

  const planDistribution = [
    { name: 'Starter', value: 156, color: '#8884d8' },
    { name: 'Pro', value: 89, color: '#82ca9d' },
    { name: 'Enterprise', value: 23, color: '#ffc658' },
  ];

  const overageAnalytics = [
    { plan: 'Starter', overageRate: 15.4, avgOverage: 2.50 },
    { plan: 'Pro', overageRate: 8.9, avgOverage: 12.30 },
    { plan: 'Enterprise', overageRate: 34.8, avgOverage: 45.60 },
  ];

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$38,300',
      change: '+18.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Overage Revenue',
      value: '$6,300',
      change: '+24.2%',
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      title: 'Active Subscribers',
      value: '268',
      change: '+12.1%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Overage Rate',
      value: '19.7%',
      change: '+3.2%',
      icon: AlertTriangle,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading1">Analytics</h1>
          <p className="caption text-text-secondary mt-1">
            Detailed insights into your subscription revenue and usage patterns
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-text-secondary" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input min-w-32"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <Button className="flex items-center space-x-2">
            <Download size={16} />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card 
            key={index} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="caption text-text-secondary">{kpi.title}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{kpi.value}</p>
                <p className={`text-sm ${kpi.color} mt-1`}>{kpi.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-100`}>
                <kpi.icon size={24} className={kpi.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Revenue Breakdown</h2>
            <p className="caption text-text-secondary">Base subscriptions vs overage charges</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="base" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Base Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="overage" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Overage Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Plan Distribution</h2>
            <p className="caption text-text-secondary">Subscriber count by plan type</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Usage Trends */}
      <Card>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Usage vs Limits Trend</h2>
          <p className="caption text-text-secondary">Track when users approach or exceed their usage limits</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#8884d8" 
              strokeWidth={3}
              name="Actual Usage"
            />
            <Line 
              type="monotone" 
              dataKey="limit" 
              stroke="#ff7300" 
              strokeDasharray="5 5"
              name="Usage Limit"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Overage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Overage Analysis by Plan</h2>
            <p className="caption text-text-secondary">Which plans generate the most overage revenue</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overageAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="overageRate" fill="#8884d8" name="Overage Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Overage Summary</h2>
            <p className="caption text-text-secondary">Detailed breakdown by plan type</p>
          </div>
          <div className="space-y-4">
            {overageAnalytics.map((plan, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-text-primary">{plan.plan} Plan</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plan.overageRate > 20 
                      ? 'bg-red-100 text-red-800' 
                      : plan.overageRate > 10
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {plan.overageRate}% overage rate
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Avg Overage:</span>
                    <span className="font-medium ml-2">${plan.avgOverage}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Revenue Impact:</span>
                    <span className="font-medium ml-2 text-accent">
                      +{((plan.avgOverage / 29.99) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card variant="elevated" className="bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <TrendingUp size={24} className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Key Insights</h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Enterprise plan users exceed limits most frequently (34.8% overage rate)</li>
              <li>• Overage revenue has grown 24.2% month-over-month</li>
              <li>• Average overage charges vary significantly by plan tier</li>
              <li>• Consider adjusting usage limits for high-overage plans</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}