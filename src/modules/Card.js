import React from "react";
import Blank from "../images/blank.png"

function Card({ value, isFlipped, onClick }) {
    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        <img src={isFlipped ? value : Blank} alt={value} />
      </div>
    );
  }

  export default Card;