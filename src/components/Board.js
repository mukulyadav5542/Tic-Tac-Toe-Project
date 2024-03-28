import React from 'react';
import Box from './Box';
import './Board.css';

const Board = ({board, onClick}) => {
  const data = board || Array(9).fill(null)
  return (
    <div className='board'>
        {data?.map((value, index) => {
            return <Box value={value} onClick={() => value === null && onClick(index)} />
        })}
    </div>
  )
}

export default Board