import { useEffect, useState } from 'react';
import { PawnMovement, RookMovement } from '@lib/utils/movements';
import type { Piece, Box, Board, Player } from './types';
import initialBoard from '@lib/constants/initialBoard.json';
import dataPieces from '@lib/constants/data.pieces.json';

export function useChess() {
  const [board, setBoard] = useState<Board>(initialBoard as unknown as Board);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('white');
  const [possibleSelect, setPossibleSelect] = useState<Array<string>>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  useEffect(() => {
    console.log(board);
  }, [board]);

  function getPiece(box: Box) {
    const boardBox = board[box as keyof typeof board];
    if (boardBox !== null) {
      return dataPieces[boardBox[0] as keyof typeof dataPieces][
        boardBox[1] === 'w' ? 0 : 1
      ];
    } else {
      return null;
    }
  }

  function getPieceColor(piece: Piece) {
    if (!piece) return null;
    return piece.startsWith('white') ? 'white' : 'black';
  }

  function handleBoxClick(box: Box) {
    let enemiePieces = Object.keys(board).filter(
      (box) => board[box] !== null && board[box][1] !== currentPlayer[0]
    );

    const piece = getPiece(box);
    const pieceColor = getPieceColor(piece);

    if (!piece && !possibleSelect) {
      return;
    } else if (piece) {
      if (pieceColor === currentPlayer) {
        if (piece && pieceColor) {
          if (piece.includes('pawn')) {
            setPossibleSelect(PawnMovement(box, pieceColor, board));
          }

          if (piece.includes('rook')) {
            setPossibleSelect(RookMovement(box, pieceColor, board));
            console.log(possibleSelect);
          }
        }

        setSelectedBox(box);
        setSelectedPiece(board[box]);
      }

      if (selectedBox === box) {
        setSelectedBox(null);
        setPossibleSelect([]);
      }
    } else if (possibleSelect.includes(box) && selectedPiece && selectedBox) {
      console.log(`Moving ${selectedPiece} to ${box}`);

      setBoard((prevBoard) => {
        const newBoard = { ...prevBoard };
        newBoard[box] = selectedPiece;
        newBoard[selectedBox] = null;
        return newBoard;
      });

      setSelectedBox(null);
      setPossibleSelect([]);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }

    if (
      possibleSelect.includes(box) &&
      enemiePieces.includes(box) &&
      selectedPiece &&
      selectedBox
    ) {
      setBoard((prevBoard) => {
        const newBoard = { ...prevBoard };
        newBoard[box] = selectedPiece;
        newBoard[selectedBox] = null;
        console.log(`${selectedPiece} killed ${newBoard[box]}`);
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
