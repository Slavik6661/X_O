import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

type Game = {
  roomId: string;
  Gameslobby: string[];
  gameField: string[][];
  step: "X" | "0";
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const Games: Record<string, Game> = {};

function CreateGamePage(
  // massivCellAll: string[][],
  colsValue: number,
  rowsValue: number
) {
  const massivCellAll = [];
  for (let i = 0; i < colsValue; i++) {
    const innerArray = new Array(rowsValue).fill("null");
    massivCellAll.push(innerArray);
  }
  /* console.log({
    massivCellAll,
    colsValue,
    rowsValue,
  }); */

  return massivCellAll;
}

const createGame = (): Game => ({
  roomId: Date.now().toString().slice(8),
  Gameslobby: [],
  gameField: [],
  step: Math.random() < 1 ? "X" : "0",

});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/GamePage/gamePage.html");
});

io.sockets.on("connection", (socket) => {
  const gameInfo = Object.entries(Games).find(
    ([, value]) => value.Gameslobby.length < 2
  );

  let symbol:string;
  let game: Game;
  if (!gameInfo) {
    symbol = 'X';
    game = createGame();
  } else {
    symbol = '0';
    [, game] = gameInfo;
  }

  const { roomId, step } = game;

  game.Gameslobby.push(socket.id);

  Games[roomId] = game;

  socket.join(roomId);
  
  socket.emit("start", {roomId, symbol, step});

  socket.on(
    "StartGame",
    (roomId: string, colsValue: number, rowsValue: number) => {
      let WinHorizontal: number = 0;
      let WinVertical: number = 0;
      let WinDiagonal: number = 0;
      let nextCell: number = 0.0;
      let strCell: string[] = [];

      const game = Games[roomId];
     
      // let PlayerSymbol = game.step;
      // let mainPalyer: string = "";
      // let Opponent: string = "";

      // if (PlayerSymbol === "X") {
      //   mainPalyer = "X";
      //   Opponent = "0";
      // } else {
      //   mainPalyer = "0";
      //   Opponent = "X";
      // }
      // socket.to(roomId).emit('PlayersMoove',PlayersMoove);

      game.gameField = CreateGamePage(+colsValue, +rowsValue);
      console.log("game field", game.gameField);
      
      socket.on(
        "click_cell",
        (
          cordCell_1: number,
          cordCell_2: number,
          GameSymbol: string,
          PlayerSymbol: string
          
        ) => {
     
          if (game.gameField[+cordCell_1][+cordCell_2] === "null") {
            game.gameField[+cordCell_1][+cordCell_2] = GameSymbol;
            game.step = game.step === '0' ? 'X' : '0'
      

            const cordCell = `${cordCell_1}.${cordCell_2}`;

            socket.to(roomId).emit("cordCell", { cordCell, GameSymbol, step:  game.step });
             socket.to(roomId).emit("stepPlayer",{step:game.step})

            console.log(game.gameField);

            console.log(
              CheckWinDiagonal_from_Left_to_Right(
                game.gameField,
                GameSymbol,
                nextCell,
                WinDiagonal,
                strCell,
                colsValue,
                rowsValue
              )
            );

            console.log(
              CheckWinDiagonal_from_Right_to_Left(
                game.gameField,
                GameSymbol,
                nextCell,
                WinDiagonal,
                strCell,
                colsValue,
                rowsValue
              )
            );

            console.log(
              checkWinHorizontal(
                game.gameField,
                GameSymbol,
                WinHorizontal,
                colsValue,
                rowsValue
              )
            );

            console.log(
              checkWinVertical(
                game.gameField,
                GameSymbol,
                WinVertical,
                colsValue,
                rowsValue
              )
            );

            console.log(Check_draw(  game.gameField,
              GameSymbol,
              WinHorizontal,
              colsValue,
              rowsValue))
          } else {
            console.log("выход за приделы массива");
          }
        }
      );

      function checkWinHorizontal(
        gameField: string[][],
        GameSymbol: string,
        WinHorizontal: number,
        colsValue: number,
        rowsValue: number
      ) {
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === GameSymbol) {
              WinHorizontal++;
              //console.log("win", WinHorizontal);
              if (WinHorizontal === 3) {
                WinHorizontal = 0;
                let message = `WIN ${GameSymbol}`;
                socket.emit("EndGame", message);
                socket.disconnect(true);
                return true;
              } else {
                continue;
              }
            } else {
              WinHorizontal = 0;
            }
          }
        }
      }

      function checkWinVertical(
        gameField: string[][],
        GameSymbol: string,
        WinVertical: number,
        colsValue: number,
        rowsValue: number
      ) {
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[row][col] === GameSymbol) {
              WinVertical++;
              console.log("winVertical", WinVertical);
              if (WinVertical === 3) {
                WinVertical = 0;
                let message = `WIN ${GameSymbol}`;
                socket.emit("EndGame", message);
                socket.disconnect(true);
                return true;
              } else {
                continue;
              }
            } else {
              WinVertical = 0;
            }
          }
        }
      }
      function CheckWinDiagonal_from_Left_to_Right(
        gameField: string[][],
        GameSymbol: string,
        nextCell: number,
        WinDiagonal: number,
        strCell: string[],
        colsValue: number,
        rowsValue: number
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
                  console.log("error massiv range");
                  break;
                } else {
                  console.log("Проверка работы ");

                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinDiagonal++;

                    if (WinDiagonal === 3) {
                      console.log("1");
                      let message = `Game End Wins ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.disconnect(true);
                      WinDiagonal = 0;
                      return true;
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

      function CheckWinDiagonal_from_Right_to_Left(
        gameField: string[][],
        GameSymbol: string,
        nextCell: number,
        WinDiagonal: number,
        strCell: string[],
        colsValue: number,
        rowsValue: number
      ) {
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === GameSymbol) {
              console.log("nextCell", nextCell);
              WinDiagonal++;

              /*********************************************/
              for (let i = 1; i < 3; i++) {
                /********************************************/

                let i_1 = `${col}`;
                let j_1 = `${row}`;
                let NextCell_i: number = 0;
                let NextCell_j: number = 0;

                NextCell_i = +i_1 + i;
                NextCell_j = +j_1 - i;

                if (NextCell_i >= colsValue || NextCell_j >= rowsValue) {
                  console.log("error massiv range");
                  break;
                } else {
                  console.log("Проверка работы ");

                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinDiagonal++;

                    if (WinDiagonal === 3) {
                      console.log("1");
                      let message = `Game End Wins ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.disconnect(true);
                      WinDiagonal = 0;
                      return true;
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
      
      function Check_draw(
        gameField: string[][],
        GameSymbol: string,
        WinHorizontal: number,
        colsValue: number,
        rowsValue: number
      ) {
        let k: number = 0
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {

            if(gameField[col][row]==='hull'){
              k++
              console.log('k!!!!!!!!!!!!!!!!',k)
            }
            else{
            continue
            }
            if(k===0){
              let message = `Ничья`;
              socket.emit("EndGame", message);
              socket.disconnect(true);
            }
          }
        }

      }
    }
  ); //Ssoket startGame
}); //soket connect

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
