import clsx from 'clsx';
import fillBoard from '@lib/fillBoard';
import getImageURL from '@lib/image-piece';

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

  function createBox() {
    return board.map((row, rowIndex) => {
      return row.map((box, boxIndex) => {
        return (
          <div
            className={clsx(
              'w-12 h-12 flex items-center justify-center m-0 p-0 cursor-pointer border-4 transition-all duration-200 ease-in-out hover:rounded-lg hover:shadow-2xl hover:scale-110',
              (boxIndex + rowIndex) % 2 === 1
                ? 'bg-sky-800 border-sky-800 hover:border-emerald-200 hover:shadow-emerald-200'
                : 'bg-sky-200 border-sky-200 hover:border-emerald-400 hover:shadow-emerald-400'
            )}
            key={box}
          >
            {initialBoard.map(([cord, piece]) =>
              cord === box ? <img src={getImageURL(piece)} alt={piece} /> : null
            )}
          </div>
        );
      });
    });
  }

  createBox();

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
      </div>
    </>
  );
};

export default Chessboard;
