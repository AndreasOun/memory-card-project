import React, { useState, useEffect } from 'react';
import '../App.css'
import A from '../images/A.PNG';
import B from '../images/B.PNG';
import C from '../images/C.PNG';
import D from '../images/D.PNG';
import E from '../images/E.PNG';
import F from '../images/F.PNG';
import G from '../images/G.PNG';
import H from '../images/H.PNG';



const CARD_VALUES = [A, B, C, D, E, F, G, H];

function Card({ value, isFlipped, onClick }) {
    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        <img src={isFlipped ? value : 'https://via.placeholder.com/150x150.png?text=Black'} alt={value} />
      </div>
    );
  }

function Board({ size }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledValues = shuffle(CARD_VALUES.slice(0, size / 2));
    const pairs = shuffledValues.concat(shuffledValues);
    setCards(shuffle(pairs).map((value) => ({ value, isFlipped: false })));
    setFlippedCards([]);
    setMatchedCards([]);
  }, [size]);

  

  function handleClick(index) {
    const flipped = flippedCards.length;
  
    // If two cards are already flipped, ignore any further clicks
    if (flipped === 2) {
      return;
    }
  
    // Flip the clicked card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
  
    // If no cards are currently flipped, just update the state with the index of the clicked card
    if (flipped === 0) {
      setFlippedCards([index]);
    } else {
      // If one card is already flipped, check if the values match
      const firstIndex = flippedCards[0];
      const card1 = cards[firstIndex];
      const card2 = cards[index];
  
      if (card1.value === card2.value) {
        // If the values match, add the cards to the matchedCards array and clear the flippedCards array
        setMatchedCards([...matchedCards, card1.value]);
        setFlippedCards([]);
      } else {
        // If the values don't match, wait a second and then flip the cards back over
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }

  function resetGame() {
    setFlippedCards([]);
    setMatchedCards([]);
    setCards([]);
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return (
    <>
      <div className="board">
        {cards.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            isFlipped={card.isFlipped || matchedCards.includes(card.value)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="game-info">
        <div>Score: {matchedCards.length}</div>
        <button onClick={resetGame}>Reset</button>
      </div>
    </>
  );
}

function App() {
  const [boardSize, setBoardSize] = useState(8);

  function handleSizeChange(event) {
    setBoardSize(Number(event.target.value));
  }

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <label htmlFor="board-size">Board Size:</label>
      <input
        id="board-size"
        type="number"
        value={boardSize}
        min={4}
        max={16}
        onChange={handleSizeChange}
      />
      <Board size={boardSize} />
    </div>
  );
}

export default App;