import { useState } from 'react';
import {
  PawnMovement,
  RookMovement,
  BishopMovement,
  KnightMovement,
  QueenMovement,
  KingMovement,
  isInCheck,
} from '@lib/utils/movements';
import type { Piece, Box, Board, Player } from './types';
import initialBoard from '@lib/constants/initialBoard.json';
import dataPieces from '@lib/constants/data.pieces.json';

export function useChess() {
  const [board, setBoard] = useState<Board>(initialBoard as unknown as Board);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('white');
  const [possibleSelect, setPossibleSelect] = useState<Array<string>>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

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
          }

          if (piece.includes('bishop')) {
            setPossibleSelect(BishopMovement(box, pieceColor, board));
          }

          if (piece.includes('knight')) {
            setPossibleSelect(KnightMovement(box, pieceColor, board));
          }

          if (piece.includes('queen')) {
            setPossibleSelect(QueenMovement(box, pieceColor, board));
          }

          if (piece.includes('king')) {
            setPossibleSelect(KingMovement(box, pieceColor, board));
          }
        }

        setSelectedBox(box);
        setSelectedPiece(board[box]);
      }

      if (selectedBox === box) {
        setSelectedBox(null);
        setPossibleSelect([]);
      }
    }

    if (possibleSelect.includes(box) && selectedPiece) {
      setBoard((prevBoard) => {
        const newBoard = { ...prevBoard };
        newBoard[box] = selectedPiece;
        newBoard[selectedBox!] = null;

        const ownKingInCheck = isInCheck(currentPlayer, newBoard);
        const enemyKingInCheck = isInCheck(
          currentPlayer === 'white' ? 'black' : 'white',
          newBoard
        );

        if (enemyKingInCheck) {
          console.log(
            currentPlayer,
            ' check to ',
            currentPlayer === 'white' ? 'black' : 'white'
          );
        }

        if (ownKingInCheck) {
          console.log('¡Movimiento ilegal! Deja al rey propio en jaque.');
          setSelectedBox(null);
          setPossibleSelect([]);
          return prevBoard;
        } else {
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
          return newBoard;
        }
      });

      setSelectedBox(null);
      setPossibleSelect([]);
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
