function PawnMovement(
  currentPos: string,
  color: 'white' | 'black',
  boxesWithPieces: Array<string>
) : [string[], boolean] {
  const row = Number(currentPos[1]); // Y coordinate as a number
  const col = currentPos.charCodeAt(0); // X coordinate as ASCII code

  let possibleMoves: Array<string> = [];
  let canEat = false;
  if (color === 'white') {
    //! FORWARD MOVEMENT
    if (row === 2) {
      if (!boxesWithPieces.includes(`${String.fromCharCode(col)}4`)) {
        possibleMoves.push(`${String.fromCharCode(col)}4`);
      }
    }

    if (!boxesWithPieces.includes(`${String.fromCharCode(col)}${row + 1}`)) {
      possibleMoves.push(`${String.fromCharCode(col)}${row + 1}`);
    }

    //! EAT MOVEMENT
    if (col + 1 <= 104 || col - 1 >= 97) {
      if (
        boxesWithPieces.includes(`${String.fromCharCode(col + 1)}${row + 1}`)
      ) {
        possibleMoves.push(`${String.fromCharCode(col + 1)}${row + 1}`);
        canEat = true;
      }
      if (
        boxesWithPieces.includes(`${String.fromCharCode(col - 1)}${row + 1}`)
      ) {
        possibleMoves.push(`${String.fromCharCode(col - 1)}${row + 1}`);
        canEat = true;
      }
    }
  } else {
    //! FORWARD MOVEMENT
    if (row === 7) {
      if (!boxesWithPieces.includes(`${String.fromCharCode(col)}5`)) {
        possibleMoves.push(`${String.fromCharCode(col)}5`);
      }
    }

    if (!boxesWithPieces.includes(`${String.fromCharCode(col)}${row - 1}`)) {
      possibleMoves.push(`${String.fromCharCode(col)}${row - 1}`);
    }

    //! EAT MOVEMENT
    if (col + 1 <= 104 || col - 1 >= 97) {
      if (
        boxesWithPieces.includes(`${String.fromCharCode(col + 1)}${row - 1}`)
      ) {
        possibleMoves.push(`${String.fromCharCode(col + 1)}${row - 1}`);
        canEat = true;
      }
      if (
        boxesWithPieces.includes(`${String.fromCharCode(col - 1)}${row - 1}`)
      ) {
        possibleMoves.push(`${String.fromCharCode(col - 1)}${row - 1}`);
        canEat = true;
      }
    }
  }
  return [possibleMoves, canEat];
}

export { PawnMovement };
