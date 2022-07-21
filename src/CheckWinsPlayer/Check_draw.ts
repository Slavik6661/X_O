 

     export function Check_draw(
        gameField: string[][],
        colsValue: number,
        rowsValue: number,
        numberOfEmptyCells: number
        
      ) {
        numberOfEmptyCells=0
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === "null") {
                numberOfEmptyCells++
                return false
            } else {
              continue;
            }
          }
        }
        if (numberOfEmptyCells === 0) {
          
          return true
        }
      }