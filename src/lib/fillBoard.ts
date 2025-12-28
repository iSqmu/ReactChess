import initialBoard from './initialBoard.json' with { type: 'json' };

export default function fillBoard() {
    let pieces : [string, string][] = []

    Object.entries(initialBoard.board).forEach(([cord, board]) => {
        if(board !== null) {
            pieces.push([cord, initialBoard.pieces[board[0] as keyof typeof initialBoard.pieces][board[1] === 'w' ? 0 : 1]])
        }
    })

    return pieces;
}
