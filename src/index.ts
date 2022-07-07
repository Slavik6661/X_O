import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
let massivPlayer: string[] = [];
let roomId:string=''
let Gameslobby: any= [];
const games: any = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/GamePage/gamePage.html");
});

io.sockets.on("connection", (socket) => {
  console.log("connection is completed");
  
  /*   if(Gameslobby.length===0){
      roomId = Date.now().toString().slice(8);
      console.log("roomId",roomId)
      console.log("Room to connect: " + roomId);
      massivPlayer.push(socket.id)
      socket.join(roomId)
      Gameslobby.push(massivPlayer)
      socket.emit('start',roomId)
      //socket.in(roomId).emit("start",roomId);
      console.log('lobby',Gameslobby)
      
    }
    else{
      for(let i=0; i<Gameslobby.length; i++){
        if(Gameslobby[i].length===1){
        console.log("лобби найденно")
        Gameslobby[i].push(socket.id)

        socket.join(roomId)
        console.log("Комнанта созданна ожидаем 2 игрока");
        console.log('lobby',Gameslobby[i])
        socket.emit('start',roomId)
        console.log('GameslobbyLength',Gameslobby[i].length)
          if (Gameslobby[i].length === 2) {
          console.log("комната для подключения",roomId)
          //socket.to(roomId).emit("start",roomId);
         // socket.emit('start',roomId)
          massivPlayer = [];
          } 
       //else {
         // console.log("i need to second Players");
       // }
      }
        else{
         continue
        }
      }  
     
    }*/
  //  socket.emit('start',roomId)
    
  socket.on("StartGame", (colsValue:number, rowsValue:number) => {
    let  massivCellAll: string[][] = [];
    let WinHorizontal: number = 0;
    let WinVertical: number = 0;
    let WinDiagonal: number = 0;
    let col: number = 0;
    let row: number = 0;
    let nextCell: number = 0.0;

    let strCell: string[] = [];
    let gameField = CreateGamePage(massivCellAll, +colsValue, +rowsValue);
    console.log("cell is clicked",  +colsValue, +rowsValue);

    socket.on("click_cell", (cordCell_1:number, cordCell_2:number, GameSymbol) => {
      console.log("click is completed", cordCell_1, cordCell_2);
     
      
        if (gameField[+cordCell_1][+cordCell_2] === "null") {
          gameField[+cordCell_1][+cordCell_2] = GameSymbol;
          console.log(gameField);

        console.log(
            CheckWinDiagonal(
              gameField,
              GameSymbol,
              col,
              row,
              nextCell,
              WinDiagonal,
              strCell,
              colsValue,
              rowsValue,
            ),
          );          
         /*  console.log(
            checkWin(
              gameField,
              GameSymbol,
              col,
              row,
              WinHorizontal,
              WinVertical,
              colsValue,
              rowsValue,
            ),
          ); */  
          
        }
      else{console.log("выход за приделы массива");}   
    });
 

  function checkWin(
    gameField: string[][],
    GameSymbol: string,
    col: number,
    row: number,
    WinHorizontal: number,
    WinVertical: number,
    colsValue: number,
    rowsValue: number,
  ) {
    for (col = 0; col < colsValue; col++) {
      for (row = 0; row < rowsValue; row++) {
        if (gameField[col][row] === GameSymbol) {
          WinHorizontal += 1;
          console.log("win", WinHorizontal);
          if (WinHorizontal === 3) {
            WinHorizontal = 0;

            let message = `WIN ${GameSymbol}`;
            socket.emit("EndGame", message);

            //let connection = socket.indexOf(socket);

            if (socket.disconnect()) {
              console.log("socket disconnected");
            }

            //console.log("indexof", connection);
            //connections.splice(connection, 0);

            //console.log("disconnect");

            return [true, WinHorizontal];
          } else {
          }

          console.log("win", WinHorizontal);
        } else {
          WinHorizontal = 0;
        }
      }
    }
    //////////////////////////////////////////////////////////////////
    for (col = 0; col < colsValue; col++) {
      for (row = 0; row < rowsValue; row++) {
        if (gameField[col][row] === GameSymbol) {
          WinVertical++;
          for (let i = 1; i < 3; i++) {
            let colNext=col+i
            if (colNext > colsValue) {
              break
             }
             if (row > rowsValue) {
              break
             }
             
            if (gameField[colNext][row] === GameSymbol) {
              WinVertical++;
              console.log("win", WinVertical);
              if (WinVertical === 3) {
                WinVertical = 0;
                let message = `WIN ${GameSymbol}`;
                socket.emit("EndGame", message);
                return true;
              } else {
                continue
              }
            } else {
              WinVertical = 0;
              break;
            }
          }
        }
      }
    }
    if (WinHorizontal == 3) {
      WinHorizontal = 0;
      return true;
    } else {
      WinHorizontal = 0;
      return false;
    }
  }
  function CheckWinDiagonal(
    gameField: string[][],
    GameSymbol: string,
    col: number,
    row: number,
    nextCell: number,
    WinDiagonal: number,
    strCell: string[],
    colsValue: number,
    rowsValue: number,
  ) {
    //////////Проверка с верху в них || с лева на право////////////
    for (col=0; col < colsValue; col++) {
      for (row = 0; row < rowsValue; row++) {
        if (gameField[col][row] === GameSymbol) {
          nextCell = col + row / 10; //0-0
          WinDiagonal++;

          /*********************************************/
          for (let i = 1; i < 3; i++) {
            /********************************************/
            let i_1 = "";
            let j_1 = "";

            strCell = nextCell.toFixed(1).toString().split(".");
            i_1 = strCell[0];
            j_1 = strCell[1];
            let i_2=Number(+i_1 + i)
            let j_2=Number(+j_1 + i)
            
            if (i_2 || j_2 === -1) {
              break
             }
             if (i_2 > colsValue && j_2>rowsValue) {
              break
             }
             console.log('243',i_2,j_2)
            
            if (gameField[i_2][j_2] === GameSymbol) {
              WinDiagonal++;

              if (WinDiagonal == 3) {
                console.log("1");
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
        //}
          //////////////////////////////////С права на левол с верху в низ////////////////////////////////////////////////
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
    }
  

  function CreateGamePage(
    massivCellAll: string[][],
    colsValue: number,
    rowsValue: number,
  ) {
    for (let i = 0; i < colsValue; i++) {
      const innerArray = new Array(rowsValue).fill("null");
      massivCellAll.push(innerArray);
    }
    console.log("outherArray :>> ", massivCellAll);

    return massivCellAll;
  }
});//Ssoket startGame
});//soket connect

  httpServer.listen(3000, () => {
  console.log("server listening on port 3000");
  });
////"start": "npx ts-node src/index.ts"
/* "start:ts": "tsc-w",
    "start:js": "nodemon/build/index.js",
    "start": "concurrently npm:start:*" */

/*     function CreateGamePage(massivCellAll: string[][]) {
      let outherArray = [];
      for (let i = 0; i < 5; i++) {
        const innerArray = new Array(5).fill(null);
        outherArray.push(innerArray);
      }
      console.log("outherArray :>> ", outherArray);
      return massivCellAll;
    }
    else {
      console.log("i need to second Players");
    }
  }); */
