import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Reset from "./components/Reset";

function App() {
  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({xScore: 0, oScore: 0});
  const [gameOver, setGameOver] = useState(false);
  const [test, setTest] = useState(0);

  useEffect(() => {
    if(!getLocalStorage('setBoard'))setLocalStorage('setBoard',Array(9).fill(null))
    if(!getLocalStorage('setScores'))setLocalStorage('setScores',{xScore: 0, oScore: 0})
  }, [])
  

  
  const getLocalStorage = (key)=>{
   return JSON.parse(localStorage.getItem(key))
  }

  const setLocalStorage = (key,value)=>{
    return localStorage.setItem(key,JSON.stringify(value))
   }



  const boxHandlerClick = (boxIndex) => {
    const updatedBoard = getLocalStorage('setBoard')?.map((value, index) => {
      if (index === boxIndex) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === 'O') {
        let { oScore } = getLocalStorage('setScores');
        oScore += 1;
        setLocalStorage('setScores',{...getLocalStorage('setScores'), oScore})
      } else {
        let { xScore } = getLocalStorage('setScores');
        xScore += 1;
        setLocalStorage('setScores',{...getLocalStorage('setScores'), xScore})
      }
    }
    setLocalStorage('setBoard',updatedBoard)
    setBoard(updatedBoard);

    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < win_conditions.length; i++) {
      const [x, y, z] = win_conditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setLocalStorage('setBoard',Array(9).fill(null))
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <ScoreBoard scores={getLocalStorage('setScores')} xPlaying={xPlaying}/>
      <Board board={getLocalStorage('setBoard')} onClick={ gameOver ? resetBoard : boxHandlerClick} />
      <Reset resetBoard={resetBoard} />
    </div>
  );
}

export default App;
