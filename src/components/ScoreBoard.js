import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({scores={xScore: 0, oScore: 0}, xPlaying}) => {


  return (
    <div className='scoreboard'>
        <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {scores?.xScore}</span>
        <span className={`score o-score ${xPlaying && "inactive"}`}>O - {scores?.oScore}</span>
    </div>
  )
}

export default ScoreBoard;