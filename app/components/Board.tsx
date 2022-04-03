import React from 'react';
import { initBoardValue } from '~/utils/init';

type Board = typeof initBoardValue;

type PlayerSymbol = 'O' | 'X';

// Handle this in a better way
const diagonalWin = (board: Board, sym: PlayerSymbol) => {
  let win = true;
  const lastIdx = board[0].length - 1;
  for (let i = 0; i <= lastIdx; i++) {
    win = win && board[i][i] === sym;
  }
  if (win) return true;
  win = true;
  for (let i = 0; i <= lastIdx; i++) {
    win = win && board[lastIdx - i][i] === sym;
  }
  return win;
};
//Handle this differently
const colWin = (board: Board, sym: PlayerSymbol) => {
  for (let i = 0; i < board[0].length; i++) {
    let win = true;
    for (let j = 0; j < board[0].length; j++) {
      win = win && board[j][i] === sym;
    }
    if (win) {
      return win;
    }
  }
  return false;
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

const Board = ({
  initialBoard,
  initialPlayer,
}: {
  initialBoard: [[]];
  initialPlayer: 'O' | 'X';
}) => {
  const [board, setBoard] = React.useState<Board>(initialBoard);
  const [player, setPlayer] = React.useState<PlayerSymbol>(initialPlayer);
  // Set computer is another player
  const computerClick = () => {};

  const handleClick = ({ target }: any) => {
    const [x, y] = target?.id.split(',') || [];
    if (board[+x][+y] !== '-') return;
    board[+x][+y] = player;
    setBoard(board);
    setPlayer(player === 'O' ? 'X' : 'O');
    if (isWinner(board, player)) {
      alert(`Player with ${player} wins!`);
      return setTimeout(() => window.location.reload(), 0);
    }

    if (gameOver(board)) {
      alert('The game is a tie!');
      setBoard(initBoardValue);
    }
  };
  const handleReset = () => {
    setPlayer(initialPlayer);
    setBoard(JSON.parse(JSON.stringify(initBoardValue)));
  };
  return (
    <>
      <div className="flex flex-col mx-auto">
        {board.map((row, idx) => (
          <div className="flex items-center border-solid" key={idx}>
            {row.map((cell, cIdx) => (
              <button
                onClick={handleClick}
                className="py-12 px-12 inline border-2 hover:inline-offset-2 bg-pink-500 font-bold hover:bg-pink-400 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300"
                key={`${idx},${cIdx}`}
                id={`${idx},${cIdx}`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
        <button
          className="py-12 px-12 inline border-2 hover:inline-offset-2 bg-red-500 font-bold hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring focus:ring-pink-300"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
};
export default Board;
