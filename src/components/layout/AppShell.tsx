import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'dashboard';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}