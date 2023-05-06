import React from "react";

function Card({ value, isFlipped, onClick }) {
    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        <img src={isFlipped ? value : 'https://via.placeholder.com/150x150.png?text=Black'} alt={value} />
      </div>
    );
  }

  export default Card;