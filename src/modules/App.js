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



function Board({ level, setLevel }) {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const size = 2 * level + 2;

    useEffect(() => {
        const shuffledValues = shuffle(CARD_VALUES.slice(0, size / 2));
        const pairs = shuffledValues.concat(shuffledValues);
        const initialCards = shuffle(pairs).map((value) => ({
          value,
          isFlipped: false,
        }));
        setCards(initialCards);
        setFlippedCards([]);
        setMatchedCards([]);
      }, [size]);

      useEffect(() => {
        if (matchedCards.length === size) {
          setLevel(level + 1);
          setCards([]);
          setFlippedCards([]);
          setMatchedCards([]);
        } else if (flippedCards.length === 2) {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }, [matchedCards, size, level, setLevel, flippedCards, setFlippedCards]);

  function handleClick(index) {
    const flipped = flippedCards.length;

    // If two cards are already flipped, ignore any further clicks
    if (flipped === 2) {
      return;
    }

    // If the clicked card is already flipped, do nothing
    if (cards[index].isFlipped) {
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
    const shuffledValues = shuffle(CARD_VALUES.slice(0, size / 2));
    const pairs = shuffledValues.concat(shuffledValues);
    const initialCards = shuffle(pairs).map((value) => ({
      value,
      isFlipped: false,
    }));
    setLevel(1);
    setCards(initialCards);
    setFlippedCards([]);
    setMatchedCards([]);
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
        <button onClick={resetGame}>Reset</button>
      </div>
    </>
  );
}

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
          <label htmlFor="level">Select Level:</label>
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