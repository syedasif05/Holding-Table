import React from 'react';
import HoldingsTable from './Components/HoldingsTable'; // Import the HoldingsTable component

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f0f8ff' }}> {/* Light blue background */}
      <header className="App-header">
      <h1 style={{ padding: '20px' }}>Holdings Table</h1>
      </header>
      <main>
        <HoldingsTable /> {/* Render the HoldingsTable component */}
      </main>
     
    </div>
  );
}

export default App;
