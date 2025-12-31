import type { Piece } from '../hooks/types';

function PawnMovement(
  currentPos: string,
  color: 'white' | 'black',
  board: Record<string, Piece>
): string[] {
  const row = Number(currentPos[1]); // Y coordinate as a number
  const col = currentPos.charCodeAt(0); // X coordinate as ASCII code
  const direction = color === 'white' ? 1 : -1;
  const startAt = color === 'white' ? 2 : 7;
  const forwardOne = row + direction;
  const forwardTwo = row + 2 * direction;

  let possibleMoves: string[] = [];
  let canEat = false;

  if (
    forwardOne >= 1 &&
    forwardOne <= 8 &&
    board[`${String.fromCharCode(col)}${forwardOne}`] === null
  ) {
    possibleMoves.push(`${String.fromCharCode(col)}${forwardOne}`);
    if (
      row === startAt &&
      board[`${String.fromCharCode(col)}${forwardTwo}`] === null
    ) {
      possibleMoves.push(`${String.fromCharCode(col)}${forwardTwo}`);
    }
  }

  [-1, 1].forEach((offset) => {
    const diagBox = col + offset;
    const target = board[`${String.fromCharCode(diagBox)}${forwardOne}`];

    if (diagBox >= 97 && diagBox <= 104 && target !== null) {
      if (color !== getPieceColor(target)) {
        possibleMoves.push(`${String.fromCharCode(diagBox)}${forwardOne}`);
        canEat = true;
      }
    }
  });

  return possibleMoves;
}

function RookMovement(
  currentPos: string,
  color: 'white' | 'black',
  board: Record<string, Piece>
): string[] {
  const row = Number(currentPos[1]); // Y coordinate as a number
  const col = currentPos.charCodeAt(0); // X coordinate as ASCII code
  const direction = color === 'white' ? 1 : -1;

  let possibleMoves: string[] = [];

  for (let i = 1; i <= 8; i++) {
    let target = board[`${String.fromCharCode(col)}${row + i * direction}`];
    if (target !== null) {
      if (getPieceColor(target) !== color) {
        possibleMoves.push(`${String.fromCharCode(col)}${row + i * direction}`);
      }
      console.log(possibleMoves);
      break;
    }
    if (target === null) {
      possibleMoves.push(`${String.fromCharCode(col)}${row + i * direction}`);
    }
  }

  for (let i = 1; i <= 8; i++) {
    if (board[`${String.fromCharCode(col - i)}${row}`] !== null) break;
    if (board[`${String.fromCharCode(col - i)}${row}`] === null) {
      possibleMoves.push(`${String.fromCharCode(col - i)}${row}`);
    }
  }

  return possibleMoves;
}



function getPieceColor(piece: Piece): 'white' | 'black' | null {
  if (!piece) return null;
  return piece.endsWith('w') ? 'white' : 'black';
}

export { PawnMovement, RookMovement };
