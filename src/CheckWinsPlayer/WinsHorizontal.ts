
   export function checkWinHorizontal(
        gameField: string[][],
        GameSymbol: string,
        WinHorizontal: number,
        colsValue: number,
        rowsValue: number,
        message:string,
      ) {
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === GameSymbol) {
              WinHorizontal++;
            
              for (let i = 1; i < 3; i++) {
                let i_1 = `${col}`;
                let j_1 = `${row}`;
                let NextCell_i: number = 0;
                let NextCell_j: number = 0;
                NextCell_i = +i_1;
                NextCell_j = +j_1 + i;

                if (NextCell_j >= rowsValue) {
                 
                  WinHorizontal = 0;
                  break;
                } else {
                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinHorizontal++;

                    if (WinHorizontal === 3) {
                      WinHorizontal++;
                     return GameSymbol
                    }
                  } else {
                    WinHorizontal = 0;
                    break;
                  }
                }
              }
            } else {
              WinHorizontal = 0;
            }
          }
        }
      }
