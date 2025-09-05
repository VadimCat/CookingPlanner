import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsPage from './SettingsPage';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'settings'>('home');

  const renderContent = () => {
    if (activeTab === 'settings') {
      return <SettingsPage />;
    }
    return (
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
    );
  };

  return (
    <div className="App">
      {renderContent()}
      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </nav>
    </div>
  );
}

export default App;
