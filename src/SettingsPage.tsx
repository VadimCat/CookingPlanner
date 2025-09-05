import React from 'react';

function SettingsPage() {
  return (
    <div className="SettingsPage">
      <h1>Settings</h1>
      <section>
        <h2>Meal slots</h2>
        <p>Configure default meal slots per day.</p>
      </section>
      <section>
        <h2>Portion defaults</h2>
        <p>Set default portions and measurement units.</p>
      </section>
    </div>
  );
}

export default SettingsPage;
