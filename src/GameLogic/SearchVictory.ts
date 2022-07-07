















        //}
        /*   //////////////////////////////////С права на левол с верху в низ////////////////////////////////////////////////
          nextCell = col + row / 10; //0-0
          WinDiagonal++;
          for (let i = 1; i < 3; i++) {
            let i_1 = "";
            let j_1 = "";

            strCell = nextCell.toFixed(1).toString().split(".");
            i_1 = strCell[0];
            j_1 = strCell[1];
            let i_2=Number(+i_1 + i)
            let j_2=Number(+j_1 - i)

            if (i_2 || j_2 === -1) {
              break
             }
            if (i_2 > colsValue) {
              break
             }
             if(j_2>rowsValue) {  
              break
             }

            if (gameField[i_2][j_2] == GameSymbol) {
              WinDiagonal++;

              if (WinDiagonal == 3) {
                let message = `Game End Wins ${GameSymbol}`;
                socket.emit("EndGame", message);
                WinDiagonal = 0;
                return true;
              }
            } else {
              WinDiagonal = 0;
              break;
            }
          }
          /////////////////////////////////С права на влево с низу вверх //////////////////////////////////////////////////////////////
          nextCell = col + row / 10; //0-0
          console.log('nextCel',nextCell)
          WinDiagonal++;
          for (let i = 1; i <3 ; i++) {
            let i_1 = "";
            let j_1 = "";

            strCell = nextCell.toFixed(1).toString().split(".");
            i_1 = strCell[0];
            j_1 = strCell[1];
            let i_2=Number(+i_1 - i)
            let j_2=Number(+j_1 - i)
            
             if (i_2 || j_2 === -1) {
              break
             }
             
            if (gameField[i_2][j_2] === GameSymbol) {
              WinDiagonal++;

              if (WinDiagonal == 3) {
                console.log("2");
                let message = `Game End Wins ${GameSymbol}`;
                socket.emit("EndGame", message);
                WinDiagonal = 0;
                return true;
              }
            } else {
              WinDiagonal = 0;
              break;
            }
          }
        
          //////////////////////////////////с лева на право с низу  вверх//////////////////////////////
          nextCell = col + row / 10; //0-0
          WinDiagonal++;
          for (let i = 1; i < 3; i++) {
            let i_1 = "";
            let j_1 = "";

            strCell = nextCell.toFixed(1).toString().split(".");
            i_1 = strCell[0];
            j_1 = strCell[1];
            let i_2=Number(+i_1 - i)
            let j_2=Number(+j_1 + i)
          
             if (i_2 || j_2 === -1) {
              break
             }
             if (i_2 > colsValue) {
              break
             }
             if(j_2>rowsValue) {  
              break
             }
             //

            if (gameField[i_2][j_2] == GameSymbol) {
              WinDiagonal++;

              if (WinDiagonal == 3) {
                let message = `Game End Wins ${GameSymbol}`;
                socket.emit("EndGame", message);
                WinDiagonal = 0;
                return true;
              }
            } else {
              WinDiagonal = 0;
              break;
            }
          
          }
          //////////////////////////////////////////////////////////////////////////////////

         // console.log("win!!!", WinDiagonal);  
        } else {
          WinDiagonal = 0;
          }
      }
        
    }     
  }

    if (WinDiagonal == 3) {
      WinDiagonal = 0;
      return true;
    } else {
      return false;
    } */