import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  Globe, 
  Mail,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export function Settings() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    company: '',
    timezone: 'UTC',
  });

  const [billingData, setBillingData] = useState({
    defaultCurrency: 'USD',
    taxRate: 0,
    invoicePrefix: 'INV',
    paymentMethods: ['stripe'],
  });

  const [notificationSettings, setNotificationSettings] = useState({
    overageAlerts: true,
    paymentFailures: true,
    monthlyReports: true,
    marketingEmails: false,
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_1234567890abcdef',
    webhookUrl: '',
    rateLimitPerMinute: 1000,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API & Webhooks', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    alert('Profile settings saved successfully!');
  };

  const handleSaveBilling = () => {
    console.log('Saving billing:', billingData);
    alert('Billing settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notificationSettings);
    alert('Notification settings saved successfully!');
  };

  const handleSaveApi = () => {
    console.log('Saving API settings:', apiSettings);
    alert('API settings saved successfully!');
  };

  const generateNewApiKey = () => {
    const newKey = `sk_test_${Math.random().toString(36).substr(2, 24)}`;
    setApiSettings({ ...apiSettings, apiKey: newKey });
    alert('New API key generated successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="heading1">Settings</h1>
        <p className="caption text-text-secondary mt-1">
          Manage your account preferences and billing configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="body">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="caption text-text-secondary mt-1">
                  Update your personal and business information
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    placeholder="John"
                  />
                  <Input
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="john@example.com"
                />

                <Input
                  label="Company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  placeholder="Acme Inc."
                />

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Timezone
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                    className="input w-full"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Billing Configuration</h2>
                <p className="caption text-text-secondary mt-1">
                  Configure default billing settings and payment methods
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Default Currency
                    </label>
                    <select
                      value={billingData.defaultCurrency}
                      onChange={(e) => setBillingData({ ...billingData, defaultCurrency: e.target.value })}
                      className="input w-full"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>

                  <Input
                    label="Tax Rate (%)"
                    type="number"
                    step="0.01"
                    value={billingData.taxRate}
                    onChange={(e) => setBillingData({ ...billingData, taxRate: parseFloat(e.target.value) })}
                    placeholder="8.25"
                  />
                </div>

                <Input
                  label="Invoice Prefix"
                  value={billingData.invoicePrefix}
                  onChange={(e) => setBillingData({ ...billingData, invoicePrefix: e.target.value })}
                  placeholder="INV"
                />

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Payment Methods
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={billingData.paymentMethods.includes('stripe')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBillingData({ 
                              ...billingData, 
                              paymentMethods: [...billingData.paymentMethods, 'stripe'] 
                            });
                          } else {
                            setBillingData({ 
                              ...billingData, 
                              paymentMethods: billingData.paymentMethods.filter(m => m !== 'stripe') 
                            });
                          }
                        }}
                        className="mr-2" 
                      />
                      <span>Stripe</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={billingData.paymentMethods.includes('paypal')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBillingData({ 
                              ...billingData, 
                              paymentMethods: [...billingData.paymentMethods, 'paypal'] 
                            });
                          } else {
                            setBillingData({ 
                              ...billingData, 
                              paymentMethods: billingData.paymentMethods.filter(m => m !== 'paypal') 
                            });
                          }
                        }}
                        className="mr-2" 
                      />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveBilling} className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <p className="caption text-text-secondary mt-1">
                  Choose what notifications you want to receive
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Overage Alerts</span>
                      <p className="caption text-text-secondary">Get notified when users exceed their limits</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.overageAlerts}
                      onChange={(e) => setNotificationSettings({ 
                        ...notificationSettings, 
                        overageAlerts: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Payment Failures</span>
                      <p className="caption text-text-secondary">Get notified about failed payments</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.paymentFailures}
                      onChange={(e) => setNotificationSettings({ 
                        ...notificationSettings, 
                        paymentFailures: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Monthly Reports</span>
                      <p className="caption text-text-secondary">Receive monthly analytics summaries</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.monthlyReports}
                      onChange={(e) => setNotificationSettings({ 
                        ...notificationSettings, 
                        monthlyReports: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Marketing Emails</span>
                      <p className="caption text-text-secondary">Receive product updates and tips</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings({ 
                        ...notificationSettings, 
                        marketingEmails: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'api' && (
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">API & Webhooks</h2>
                <p className="caption text-text-secondary mt-1">
                  Manage your API keys and webhook configurations
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    API Key
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiSettings.apiKey}
                        readOnly
                        className="input w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <Button variant="outline" onClick={generateNewApiKey}>
                      Generate New
                    </Button>
                  </div>
                  <p className="caption text-text-secondary mt-1">
                    Keep your API key secure and never share it publicly
                  </p>
                </div>

                <Input
                  label="Webhook URL"
                  value={apiSettings.webhookUrl}
                  onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                  placeholder="https://your-app.com/webhooks/tokenflow"
                />

                <Input
                  label="Rate Limit (requests per minute)"
                  type="number"
                  value={apiSettings.rateLimitPerMinute}
                  onChange={(e) => setApiSettings({ ...apiSettings, rateLimitPerMinute: parseInt(e.target.value) })}
                  placeholder="1000"
                />

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Webhook Events</h3>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>• subscription.created</p>
                    <p>• subscription.updated</p>
                    <p>• usage.exceeded</p>
                    <p>• overage.charged</p>
                    <p>• payment.failed</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveApi} className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Security Settings</h2>
                <p className="caption text-text-secondary mt-1">
                  Manage your account security and access controls
                </p>
              </div>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-text-secondary mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Session Management</h3>
                  <p className="text-text-secondary mb-3">
                    View and manage your active sessions
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="caption text-text-secondary">Chrome on macOS • Last active now</p>
                      </div>
                      <span className="text-green-600 text-sm">Active</span>
                    </div>
                  </div>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
                  <p className="text-red-600 mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}