import React from 'react';

type Tab = 'home' | 'planner' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChange }) => (
  <nav className="bottom-nav">
    <button
      className={activeTab === 'home' ? 'active' : ''}
      onClick={() => onChange('home')}
    >
      Home
    </button>
    <button
      className={activeTab === 'planner' ? 'active' : ''}
      onClick={() => onChange('planner')}
    >
      Planner
    </button>
    <button
      className={activeTab === 'settings' ? 'active' : ''}
      onClick={() => onChange('settings')}
    >
      Settings
    </button>
  </nav>
);

export default BottomNav;
