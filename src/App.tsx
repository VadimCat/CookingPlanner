import React, { useState } from 'react';
import './App.css';
import WeekPlanner from './WeekPlanner';

function App() {
  const [tab, setTab] = useState<'planner' | 'shopping'>('planner');

  return (
    <div className="App">
      {tab === 'planner' && <WeekPlanner />}
      {tab === 'shopping' && (
        <div>
          <h1>Shopping List</h1>
        </div>
      )}
      <nav className="BottomBar">
        <button
          className={tab === 'planner' ? 'active' : ''}
          onClick={() => setTab('planner')}
        >
          Planner
        </button>
        <button
          className={tab === 'shopping' ? 'active' : ''}
          onClick={() => setTab('shopping')}
        >
          Shopping
        </button>
      </nav>
    </div>
  );
}

export default App;
