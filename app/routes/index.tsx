import { useLoaderData } from 'remix';
import { initBoardValue } from '~/utils/init';

import Board from '~/components/Board';

export const loader = () => initBoardValue;

export default function Index() {
  const board = useLoaderData();
  return (
    <div className="flex flex-col mx-auto justify-item-center">
      <h1 className="text-3xl font-bold mx-auto">Tic Tac Toe</h1>
      <Board initialBoard={board} initialPlayer="O" />
    </div>
  );
}
