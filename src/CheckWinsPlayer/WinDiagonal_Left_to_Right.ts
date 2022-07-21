export function CheckWinDiagonal_from_Left_to_Right(
    gameField: string[][],
    GameSymbol: string,
    WinDiagonal: number,
    colsValue: number,
    rowsValue: number,
  ) {
    //////////Проверка с верху в них || с лева на право////////////
    for (let col = 0; col < colsValue; col++) {
      for (let row = 0; row < rowsValue; row++) {
        if (gameField[col][row] === GameSymbol) {
          WinDiagonal++;

          /*********************************************/
          for (let i = 1; i < 3; i++) {
          /********************************************/

            let i_1 = `${col}`;
            let j_1 = `${row}`;
            let NextCell_i: number = 0;
            let NextCell_j: number = 0;

            NextCell_i = +i_1 + i;
            NextCell_j = +j_1 + i;

            if (NextCell_i >= colsValue || NextCell_j >= rowsValue) {
             
              WinDiagonal = 0;
              break;
            } else {
              if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                WinDiagonal++;

                if (WinDiagonal === 3) {
                  WinDiagonal = 0;
                  return [GameSymbol,WinDiagonal];
                }
              } else {
                WinDiagonal = 0;
                break;
              }
            }
          }
        } else {
          WinDiagonal = 0;
        }
      }
    }
  }