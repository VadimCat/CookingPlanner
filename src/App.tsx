import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './components/BottomNav';

type Tab = 'home' | 'planner' | 'settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'planner':
        return <PlannerPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default App;
