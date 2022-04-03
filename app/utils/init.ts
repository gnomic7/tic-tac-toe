export const initBoardValue: string[][] = JSON.parse(
  JSON.stringify(
    Array(3)
      .fill('')
      .map((item) => Array(3).fill('-')),
  ),
);
