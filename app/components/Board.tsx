import React from 'react';
import { initBoardValue } from '~/utils/init';

type Board = typeof initBoardValue;

type PlayerSymbol = 'O' | 'X';

const diagonalWin = (board: Board, sym: PlayerSymbol) => {
  // board.some((row, idx) =>
  //   row.every((col) => board[idx][idx] === col && col === sym),
  // );
  // Your code goes here -
};

const colWin = (board: Board, sym: PlayerSymbol) => {
  //Doing this first
  //hahaha
  // Your code goes here
  // const colWin = board.map((row, idx) =>
  //   row.map((col, cIdx) => console.log(idx, cIdx)),
  // );
};

// This is kinda ready
const rowWin = (board: Board, sym: PlayerSymbol) =>
  board.some((row) => row.every((item) => item === sym));

// This is ready
const isWinner = (board: Board, sym: PlayerSymbol) =>
  rowWin(board, sym) || colWin(board, sym) || diagonalWin(board, sym);

// This is ready
const gameOver = (board: Board) =>
  board.every((row) => !row.some((item) => item === '-'));

export const loader = () =>
  Array(3)
    .fill('')
    .map((item) => Array(3).fill('-'));

const Board = ({
  initialBoard,
  initialPlayer,
}: {
  initialBoard: [[]];
  initialPlayer: 'O' | 'X';
}) => {
  const [board, setBoard] = React.useState<Board>(initialBoard);
  console.log(board);
  const [player, setPlayer] = React.useState<PlayerSymbol>(initialPlayer);

  const handleClick = ({ target }: MouseEvent) => {
    const [x, y] = target?.id.split(',') || [];
    board[+x][+y] = player;
    setBoard(board);
    setPlayer(player === 'O' ? 'X' : 'O');
    if (isWinner(board, player)) {
      console.log(`Player with ${player} wins!`);
      setTimeout(() => window.location.reload(), 3000);
    }

    if (gameOver(board)) {
      console.log('The game is a tie!', initBoardValue);
      setTimeout(() => window.location.reload(), 3000);
    }
  };
  return (
    <>
      <div className="flex flex-col mx-auto">
        {board.map((row, idx) => {
          return (
            <div className="flex items-center border-solid" key={idx}>
              {row.map((cell, cIdx) => (
                <button
                  onClick={handleClick}
                  className="py-12 px-12 inline border-2 hover:inline-offset-2 bg-indigo-500 font-bold hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300"
                  key={`${idx},${cIdx}`}
                  id={`${idx},${cIdx}`}
                >
                  {cell}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Board;
