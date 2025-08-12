import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Plans } from './pages/Plans';
import { Subscriptions } from './pages/Subscriptions';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-bg">
        {isAuthenticated ? (
          <AppShell>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AppShell>
        ) : (
          <Routes>
            <Route path="*" element={<Landing />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;