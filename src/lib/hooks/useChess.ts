import { useState } from 'react';
import type { Piece, Box, Board, Player } from './types';
import initialBoard from '@lib/constants/initialBoard.json';

export function useChess() {
  const [board, setBoard] = useState<Board>(initialBoard as unknown as Board);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('white');

  function getPiece(box: Box) {
    const boardBox = initialBoard.board[box as keyof typeof initialBoard.board];
    if (boardBox !== null) {
      return initialBoard.pieces[
        boardBox[0] as keyof typeof initialBoard.pieces
      ][boardBox[1] === 'w' ? 0 : 1];
    } else {
      return null;
    }
  }

  function getPieceColor(piece: Piece) {
    if (!piece) return null;
    return piece.startsWith('white') ? 'white' : 'black';
  }

  function handleBoxClick(box: Box) {
    const piece = getPiece(box);
    const pieceColor = getPieceColor(piece);

    if (!piece) {
      return;
    } else {
      if (pieceColor === currentPlayer) {
        setBoard((prev) => {
          const newBoard = { ...prev };
          newBoard[box] = null;
          return newBoard;
        });

        setSelectedBox(box);
      }

      if (selectedBox === box) {
        setBoard((prev) => {
          const newBoard = { ...prev };
          newBoard[box] = piece;
          newBoard[selectedBox] = null;
          return newBoard;
        });

        setSelectedBox(null);
      }
    }
  }

  return {
    board,
    selectedBox,
    currentPlayer,
    getPiece,
    handleBoxClick,
    setBoard,
  };
}
