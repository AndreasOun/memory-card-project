import React, { useState, useEffect } from 'react';
import '../App.css'
import Board from './Board';


function App() {
    const [level, setLevel] = useState(1);
  
    function handleLevelChange(newLevel) {
      setLevel(newLevel);
    }
  
    return (
      <div className="app">
        <h1>Memory Game</h1>
        <Board level={level} setLevel={setLevel} />
        <div className="level-changer">
          <label htmlFor="level">Level:</label>
          <select
            name="level"
            id="level"
            onChange={(e) => handleLevelChange(parseInt(e.target.value))}
          >
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
            <option value={4}>Level 4</option>
            <option value={5}>Level 5</option>
            <option value={6}>Level 6</option>
            <option value={7}>Level 7</option>
          </select>
        </div>
      </div>
    );
  }



export default App;