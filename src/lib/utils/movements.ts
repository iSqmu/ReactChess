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

  const possibleMoves: string[] = [];
  const directions = [
    [0, 1], // abajo -> arriba
    [0, -1], // arriba -> abajo
    [1, 0], // derecha -> izquierda
    [-1, 0], // izquierda -> derecha
  ];

  for (const [x, y] of directions) {
    for (let i = 1; i <= 8; i++) {
      const newCol = col + x * i;
      const newRow = row + y * i;

      const targetBox = `${String.fromCharCode(newCol)}${newRow}`;
      const targetPiece = board[targetBox];
      if (newCol < 97 || newCol > 104 || newRow < 1 || newRow > 8) {
        break;
      }

      if (targetPiece !== null) {
        if (getPieceColor(targetPiece) !== color) {
          possibleMoves.push(targetBox);
        }
        break;
      } else {
        possibleMoves.push(targetBox);
      }
    }
  }
  return possibleMoves;
}

function BishopMovement(
  currentPos: string,
  color: 'white' | 'black',
  board: Record<string, Piece>
): string[] {
  const possibleMoves: string[] = [];
  const col = currentPos.charCodeAt(0);
  const row = Number(currentPos[1]);
  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, -1],
  ];

  for (const [x, y] of directions) {
    for (let i = 1; i <= 8; i++) {
      const newCol = col + x * i;
      const newRow = row + y * i;

      const targetBox = `${String.fromCharCode(newCol)}${newRow}`;
      const targetPiece = board[targetBox];

      if (newCol < 97 || newCol > 104 || newRow < 1 || newRow > 8) {
        break;
      }
      if (targetPiece !== null) {
        if (getPieceColor(targetPiece) !== color) {
          possibleMoves.push(targetBox);
        }
        break;
      } else {
        possibleMoves.push(targetBox);
      }
    }
  }

  return possibleMoves;
}

function KnightMovement(
  currentPos: string,
  color: 'white' | 'black',
  board: Record<string, Piece>
): string[] {
  const possibleMoves: string[] = [];
  const col = currentPos.charCodeAt(0);
  const row = Number(currentPos[1]);

  const directions = [
    [1, 2], // right forward
    [-1, 2], // left forward
    [1, -2], // right backward
    [-1, -2], // left backward
    [2, 1], // forward left
    [-2, 1], // forward right
    [-2, -1], // backward right
    [2, -1], // backward left
  ];

  for (const [x, y] of directions) {
    for (let i = 1; i <= 4; i++) {
      const newCol = col + x * i;
      const newRow = row + y * i;

      const targetBox = `${String.fromCharCode(newCol)}${newRow}`;
      console.log(targetBox);
      const targetPiece = board[targetBox];

      if (newCol < 97 || newCol > 104 || newRow < 1 || newRow > 8) {
        break;
      }

      if (targetPiece !== null) {
        if (getPieceColor(targetPiece) !== color) {
          possibleMoves.push(targetBox);
        }
      } else {
        possibleMoves.push(targetBox);
      }
      break;
    }
  }

  return possibleMoves;
}

function QueenMovement(
  currentPos: string,
  color: 'white' | 'black',
  board: Record<string, Piece>
): string[] {
  const possibleMoves: string[] = [];
  const bishopMoves = BishopMovement(currentPos, color, board);
  const rookMoves = RookMovement(currentPos, color, board);
  possibleMoves.push(...bishopMoves, ...rookMoves);

  return possibleMoves;
}

function getPieceColor(piece: Piece): 'white' | 'black' | null {
  if (!piece) return null;
  return piece.endsWith('w') ? 'white' : 'black';
}

export {
  PawnMovement,
  RookMovement,
  BishopMovement,
  QueenMovement,
  KnightMovement,
};
