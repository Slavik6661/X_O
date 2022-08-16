export function checkPlayeDraw(
  gameField: string[][],
  colsValue: number,
  rowsValue: number,
  numberOfEmptyCells: number
) {
  numberOfEmptyCells = 0;
  const draw = checkIfEveryCellIsNotEmpty({
    gameField: gameField,
    colsValue: colsValue,
    rowsValue: rowsValue,
    numberOfEmptyCells: 0,
  });
  if (draw) {
    return true;
  }
}

type Param = {
  gameField: string[][];
  colsValue: number;
  rowsValue: number;
  numberOfEmptyCells: number;
};

function checkIfEveryCellIsNotEmpty(params: Param): boolean {
  let { gameField, colsValue, rowsValue, numberOfEmptyCells } = params;
  for (let col = 0; col < colsValue; col++) {
    for (let row = 0; row < rowsValue; row++) {
      if (gameField[col][row] === "null") {
        numberOfEmptyCells++;
        return false;
      } else {
        continue;
      }
    }
  }
  if (numberOfEmptyCells === 0) {
    return true;
  } else {
    return false;
  }
}

/* export function checkDraw2(
  gameField: string[][],
  colsValue: number,
  rowsValue: number,
  numberOfEmptyCells: number
) {
  const draw = gameField.checkIfEveryCellIsNotEmpty();
  return draw;
} */
