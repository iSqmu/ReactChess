type Piece = string | null;
type Box = string;
type Board = Record<Box, Piece | null>;
type Player = 'white' | 'black';

export type { Piece, Box, Board, Player };
