import clsx from 'clsx';
import { useChess } from '@lib/hooks/useChess';
import getImageURL from '@lib/utils/image-piece';

const Chessboard = () => {
  const {
    // board, //-> temporary
    selectedBox,
    currentPlayer,
    possibleSelect,
    getPiece,
    handleBoxClick,
  } = useChess();

  const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const cols = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const boxes = cols.flatMap((col) => {
    return rows.map((row) => `${row}${col}`);
  });

  return (
    <div
      className={clsx(
        'h-dvh flex flex-col items-center justify-center transition-all duration-200 ',
        currentPlayer === 'white'
          ? 'bg-gray-200 text-gray-800'
          : 'bg-gray-600 text-gray-200'
      )}
    >
      <div className="flex">
        <div className="flex flex-col justify-between">
          {cols.map((num) => (
            <div
              key={num}
              className="h-12 w-12 flex items-center justify-center font-medium"
            >
              {num}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 grid-rows-8">
          {boxes.map((box) => {
            const piece = getPiece(box);
            const isSelected = selectedBox === box;
            const rowIndex = 8 - parseInt(box[1]);
            const colIndex = rows.indexOf(box[0]);
            const isDark = (rowIndex + colIndex) % 2 === 1;
            return (
              <div
                key={box}
                className={clsx(
                  'h-12 w-12 flex items-center justify-center cursor-pointer transition-all duration-500',
                  isDark ? 'bg-sky-800' : 'bg-sky-200',
                  'hover:scale-110 hover:rounded-lg hover:shadow-2xl',
                  isSelected &&
                    'scale-110 rounded-lg border-4 border-green-500/70 shadow-2xl',
                  possibleSelect.includes(box) &&
                    'ring-4 ring-green-500/70 ring-inset scale-110'
                )}
                onClick={() => handleBoxClick(box)}
              >
                {possibleSelect.includes(box) && <span></span>}
                {piece && <img src={getImageURL(piece)} alt={piece} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex mt-2 ml-10">
        {rows.map((row) => (
          <div
            key={row}
            className="w-12 h-10 flex items-center justify-center font-medium"
          >
            {row.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-semibold">
        Turno de las {currentPlayer === 'white' ? 'Blancas' : 'Negras'}
      </div>
    </div>
  );
};

export default Chessboard;
