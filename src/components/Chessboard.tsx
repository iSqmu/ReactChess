import clsx from 'clsx';
import fillBoard from '@lib/fillBoard';
import getImageURL from '@lib/image-piece';
import { useState } from 'react';

const Chessboard = () => {
  const board = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
  ];

  let initialBoard = fillBoard();

  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');

  function insertPiece(cord: string) {
    return initialBoard.find(([c]) => c === cord)?.[1];
  }

  function createBox() {
    return board.map((row, rowIndex) => {
      return row.map((box, boxIndex) => {
        const piece = insertPiece(box);

        return (
          <div
            className={clsx(
              'w-12 h-12 flex items-center justify-center m-0 p-0 cursor-pointer  transition-all duration-200 ease-in-out hover:rounded-lg hover:shadow-2xl hover:scale-110',
              (boxIndex + rowIndex) % 2 === 1
                ? 'bg-sky-800 hover:border-4 border-emerald-200 shadow-emerald-200'
                : 'bg-sky-200 hover:border-4 border-emerald-400 shadow-emerald-400',
              selectedPiece === box
                ? 'rounded-lg scale-110 border-4 border-yellow-500 shadow-2xl'
                : ''
            )}
            data-piece={piece !== undefined ? piece : null}
            data-color={piece !== undefined ? piece.split('_')[0] : null}
            key={box}
            onClick={() => {
              if (piece?.split('_')[0] === turn) {
                if (piece !== undefined) {
                  if (selectedPiece === box) {
                    setSelectedPiece(null);
                  } else {
                    setSelectedPiece(box);
                  }
                } else {
                  setSelectedPiece(null);
                }
              }
            }}
          >
            {piece !== undefined ? (
              <img
                src={getImageURL(piece)}
                alt={piece}
                className="w-10 h-10 select-none pointer-events-none"
              />
            ) : (
              <></>
            )}
          </div>
        );
      });
    });
  }

  return (
    <>
      <div className="h-dvh flex flex-col items-center justify-center border-2 ">
        <div className="Board flex justify-center ">
          <div className="rows ">
            {['8', '7', '6', '5', '4', '3', '2', '1'].map((num) => (
              <div
                key={num}
                className="h-12 w-12 flex items-center justify-center"
              >
                {num}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-8 grid-rows-8 ">
            {createBox()}
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
              <div
                key={letter}
                className="w-12 h-12 flex items-center justify-center"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
        <div className="turn">
          {turn === 'white' ? "White's Turn" : "Black's Turn"}
        </div>
      </div>
    </>
  );
};

export default Chessboard;
