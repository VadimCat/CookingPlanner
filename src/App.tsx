import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsPage from './SettingsPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'settings'>('home');

  return (
    <div className="App">
      {activeTab === 'settings' ? (
        <SettingsPage />
      ) : (
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      )}
      <nav className="bottom-nav">
        <button
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default App;
