import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { 
  CreditCard, 
  BarChart3, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users,
  DollarSign,
  Clock
} from 'lucide-react';

export function Landing() {
  const [email, setEmail] = useState('');
  const { login } = useAuthStore();

  const handleGetStarted = () => {
    if (email) {
      login({
        userId: `user_${Date.now()}`,
        email,
      });
    }
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Usage-Based Billing',
      description: 'Automatically track and bill for usage beyond plan limits with transparent overage pricing.',
    },
    {
      icon: Zap,
      title: 'Automated Invoicing',
      description: 'Eliminate manual billing processes with automated overage charge collection.',
    },
    {
      icon: Shield,
      title: 'Profit Margin Control',
      description: 'Set custom profit margins on overage usage to ensure sustainable revenue growth.',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'Maximize revenue from power users while maintaining fair pricing for all tiers.',
    },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Subscriptions' },
    { icon: DollarSign, value: '$2.5M+', label: 'Revenue Processed' },
    { icon: Clock, value: '99.9%', label: 'Uptime' },
    { icon: TrendingUp, value: '35%', label: 'Revenue Increase' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CreditCard className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">TokenFlow Subs</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary-hover to-accent text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="display mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Automate Your Subscription Revenue
            </h1>
            <p className="body-lg mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
              Scale your business with usage-based billing, automated overage charges, 
              and intelligent profit margin management. Turn your power users into your biggest revenue drivers.
            </p>
          </div>
          
          <div className="animate-slide-up delay-300">
            <Card variant="elevated" className="max-w-md mx-auto bg-white text-text-primary shadow-xl">
              <div className="text-center">
                <h3 className="heading3 mb-6 text-text-primary">Get Started Today</h3>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  className="mb-4"
                />
                <Button 
                  onClick={handleGetStarted}
                  size="lg"
                  className="w-full mb-4"
                  disabled={!email}
                >
                  Start Free Trial
                </Button>
                <p className="caption text-text-tertiary">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <stat.icon size={32} className="text-primary mx-auto" />
                <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading1 mb-6">Everything You Need to Scale</h2>
            <p className="body-lg text-text-secondary max-w-3xl mx-auto">
              TokenFlow Subs provides all the tools you need to implement sophisticated 
              subscription billing with usage-based overages and maximize revenue from every customer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="interactive"
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <feature.icon size={32} className="text-primary group-hover:text-white" />
                </div>
                <h3 className="heading3 mb-4 text-text-primary">{feature.title}</h3>
                <p className="body text-text-secondary leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-text-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Revenue Model?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using TokenFlow Subs to maximize their subscription revenue.
          </p>
          <Button 
            variant="secondary" 
            className="bg-white text-text-primary hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CreditCard className="text-primary" size={24} />
            <span className="text-lg font-semibold text-primary">TokenFlow Subs</span>
          </div>
          <p className="text-text-secondary">
            © 2024 TokenFlow Subs. Built for modern subscription businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
