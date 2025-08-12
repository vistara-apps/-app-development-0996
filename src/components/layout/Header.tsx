import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Bell, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading1">TokenFlow Subs</h1>
          <p className="caption text-text-secondary">Automate your subscription revenue</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Bell size={20} />
          </button>
          
          <ConnectButton />
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="body text-text-primary">{user?.email || 'User'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}