export function checkWinVertical(
    gameField: string[][],
    GameSymbol: string,
    WinVertical: number,
    colsValue: number,
    rowsValue: number,

  ) {
    for (let row = 0; row < colsValue; row++) {
      for (let col = 0; col < rowsValue; col++) {
        if (gameField[col][row] === GameSymbol) {
          WinVertical++;

          for (let i = 1; i < 3; i++) {
            let i_1 = `${col}`;
            let j_1 = `${row}`;
            let NextCell_i: number = 0;
            let NextCell_j: number = 0;
            NextCell_i = +i_1 + i;
            NextCell_j = +j_1;
            
            if (NextCell_i >= colsValue) {
            
              WinVertical = 0;
              break;
            } else {
              if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                WinVertical++;
                if (WinVertical === 3) {
                  WinVertical = 0;
                  return GameSymbol;
                }
              } else {
                WinVertical = 0;
                break;
              }
            }
          }
        } else {
          WinVertical = 0;
        }
      }
    }
  }