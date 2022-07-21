export function CreateGamePage(colsValue: number, rowsValue: number) {
    const massivCellAll = [];
    for (let i = 0; i < colsValue; i++) {
      const innerArray = new Array(rowsValue).fill("null");
      massivCellAll.push(innerArray);
    }
    return massivCellAll;
  }