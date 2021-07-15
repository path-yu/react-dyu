import React, { useEffect } from 'react';
import './App.css';
import DyPage from './page/DyPage/DyPage';

function App() {
 useEffect(() => {
   console.log('App effect');
 })
  return (
    <div className="App">
      <DyPage />
    </div>
  )
}

export default App
