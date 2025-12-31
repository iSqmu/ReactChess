import { useState } from 'react';
import { PawnMovement } from '@lib/utils/movements';
import type { Piece, Box, Board, Player } from './types';
import initialBoard from '@lib/constants/initialBoard.json';

export function useChess() {
  const [board, setBoard] = useState<Board>(initialBoard as unknown as Board);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('white');
  const [possibleSelect, setPossibleSelect] = useState<Array<string>>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

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
    let enemiePieces = Object.keys(board.board).filter(
      (box) =>
        board.board[box] !== null && board.board[box][1] !== currentPlayer[0]
    );

    const piece = getPiece(box);
    const pieceColor = getPieceColor(piece);

    if (!piece && !possibleSelect) {
      return;
    } else if (piece) {
      if (pieceColor === currentPlayer) {
        if (piece && piece.includes('pawn') && pieceColor) {
          setPossibleSelect(PawnMovement(box, pieceColor, enemiePieces)[0]);
        }

        setSelectedBox(box);
        setSelectedPiece(board.board[box]);
      }

      if (selectedBox === box) {
        setSelectedBox(null);
        setPossibleSelect([]);
      }
    } else if (possibleSelect.includes(box) && selectedPiece) {
      console.log(`Moving ${selectedPiece} to ${box}`);

      setBoard((prevBoard) => {
        const newBoard = { ...prevBoard };
        newBoard.board[box] = selectedPiece;
        newBoard.board[selectedBox] = null;
        return newBoard;
      });
      setSelectedBox(null);
      setPossibleSelect([]);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }

    if (
      possibleSelect.includes(box) &&
      enemiePieces.includes(box) &&
      selectedPiece
    ) {
      setBoard((prevBoard) => {
        const newBoard = { ...prevBoard };
        newBoard.board[box] = selectedPiece;
        newBoard.board[selectedBox] = null;
        console.log(`${selectedPiece} killed ${newBoard.board[box]}`);
        return newBoard;
      });
      setSelectedBox(null);
      setPossibleSelect([]);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  }

  return {
    board,
    selectedBox,
    currentPlayer,
    possibleSelect,
    getPiece,
    handleBoxClick,
    setBoard,
  };
}
