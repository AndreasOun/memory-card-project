import React, { useState } from 'react';
import '../App.css';
import Board from './Board';
import Footer from './Footer';
import BackGroundMusic from './BackGroundMusic';

function App() {
  const [level, setLevel] = useState(1);
  const [showLevelPopup, setShowLevelPopup] = useState(false);

  function handleLevelChange(newLevel) {
    setLevel(newLevel);
    setShowLevelPopup(true);
  }

  function hideLevelPopup() {
    setShowLevelPopup(false);
  }

  return (
    <div className="app">
      <h1>Memory Game</h1>  
          <BackGroundMusic />
      <Board level={level} setLevel={setLevel} />
      <div className="level-changer">
        <div className="level-buttons">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              className={num === level ? 'selected' : ''}
              onClick={() => handleLevelChange(num)}
            >
              {`Level ${num}`}
            </button>
          ))}
        </div>
      </div>
      {showLevelPopup && (
        <div className="popup-background">
          <div className="level-popup">
            <h2>You selected level {level}!</h2>
            <button onClick={hideLevelPopup}>OK</button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
