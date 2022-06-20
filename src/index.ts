import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
//const massivCellAll: string[][] = [];
//let gameField = CreateGamePage(massivCellAll);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/GamePage/gamePage.html");
});
io.sockets.on("connection", (socket) => {
  console.log("connection is completed");

  socket.on("disconnect", (data) => {
    //console.log("disconnect is completed");
  });
  socket.on("StartGame", (colsValue, rowsValue) => {
    const massivCellAll: string[][] = [];

    let lastValueX: number[][] = [];
    let lastValueO: number[][] = [];
    let WinHorizontal: boolean = true;
    let WinVertical: boolean = true;
    let col: number = 0;
    let row: number = 0;
    let win: number = 0;
    let nextCell: number = 0.0;
    let strCell: string[] = [];
    let gameField = CreateGamePage(massivCellAll, +colsValue, +rowsValue);
    console.log("cols", colsValue, rowsValue);
    //CreateGamePage(massivCellAll, +cols, +rows);

    socket.on("click_cell", (cordCell_1, cordCell_2, GameSymbol) => {
      console.log("click is completed", cordCell_1, cordCell_2);

      try {
        if (gameField[+cordCell_1][+cordCell_2] === "null") {
          gameField[+cordCell_1][+cordCell_2] = GameSymbol;
          console.log(gameField);

          //checkWin(gameField, GameSymbol, WinHorizontal, col, row, win),
          console.log(
            CheckWinDiagonal(
              gameField,
              GameSymbol,
              WinHorizontal,
              col,
              row,
              win,
              nextCell,
              strCell,
            ),
          );
        }
      } catch (e: unknown) {
        /* if (GameSymbol === "0") {
            for (let i = 0; i < 1; i++) {
              for (let j = 0; j < 4; j++) {
                if (gameField[i][j] === "0") {
                  lastValueO.push([i, j]);
                  console.log(lastValueO);
                  // console.log("найден 0", gameField[i][j], "0_win----", O_win);
                  O_win++;
                } else {
                }
              }
            }
          } */
        console.log("err!!!!");
      }
    });
  });
  function checkWin(
    gameField: string[][],
    GameSymbol: string,
    WinHorizontal: boolean,
    col: number,
    row: number,
    win: number,
  ) {
    /*  for (col = 0; col < 3; ) {
      for (row = 0; row < 3; row++) {
        WinHorizontal = WinHorizontal && gameField[col][row] == GameSymbol;
        //WinVertical = WinVertical && gameField[row][col] == GameSymbol;
      }
    }
 */

    /*  if (gameField[+cordCell_1][+cordCell_2] === "X") {
      for (row = 1; row < 5; row++) {
        if (gameField[+cordCell_1][+cordCell_2 + row] === "X") {
          win++;
        } else {
        }
      }
    } */
    for (col = 0; col < 3; col++) {
      for (row = 0; row < 3; row++) {
        if (gameField[col][row] === "X") {
          win += 1;
          if (win === 3) {
            return true;
            break;
          }
          console.log("GF", gameField[col][row]);
          console.log("win", win);
        } else {
          win = 0;
          //console.log("err");
        }
      }
    }
    if (win == 3) {
      return true;
    } else {
      return false;
    }
  }
  function CheckWinDiagonal(
    gameField: string[][],
    GameSymbol: string,
    WinHorizontal: boolean,
    col: number,
    row: number,
    win: number,
    nextCell: number,
    strCell: string[],
  ) {
    for (col = 0; col < 5; col++) {
      for (row = 0; row < 5; row++) {
        strCell = nextCell.toFixed(1).toString().split(".");
        //let strCell2: string[] = strCell.split(".");
        col = +strCell[0];
        row = +strCell[1];
        console.log(nextCell);
        if (gameField[col][row] != "X") {
          row++;
          continue;
        } else {
        }
        if (gameField[col][row] == "X") {
          win++;
          console.log("win", win);
          nextCell = col + row / 10; //0-0
          nextCell += 1.1;
          //nextcell+1.1
          if (win == 3) {
            return true;
            break;
          }
        } else {
          win = 0;
          nextCell += 1.1;
        }
      }
    }
    if (win == 3) {
      return true;
    } else {
      return false;
    }
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
});
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
  }); */
