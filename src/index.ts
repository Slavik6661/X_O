import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

type Game = {
  roomId: string;
  Gameslobby: string[];
  gameField: string[][];
  fieldSize: string | null;
  step: "X" | "0";
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const Games: Record<string, Game> = {};

function CreateGamePage(
  colsValue: number,
  rowsValue: number
) {
  const massivCellAll = [];
  for (let i = 0; i < colsValue; i++) {
    const innerArray = new Array(rowsValue).fill("null");
    massivCellAll.push(innerArray);
  }
  return massivCellAll;
}

const createGame = (): Game => ({
  roomId: Date.now().toString().slice(8),
  Gameslobby: [],
  gameField: [],
  fieldSize: null,
  step: "X",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/GamePage/gamePage.html");
});

io.sockets.on("connection", (socket) => {
  socket.on("gameFieldValue", (cols, rows) => {
    let cols_rows = `${cols}_${rows}`;
    console.log("gameFieldValue", cols_rows);
    const gameInfo = Object.entries(Games).find(
      ([, value]) =>
        value.Gameslobby.length < 2 && cols_rows === value.fieldSize
    );

    let symbol: string;
    let game: Game;
    if (!gameInfo) {
      symbol = "X";
      game = createGame();
    } else {
      symbol = "0";
      [, game] = gameInfo;
    }

    const { roomId, step } = game;

    game.Gameslobby.push(socket.id);

    Games[roomId] = game;

    socket.join(roomId);

    socket.emit("start", { roomId, symbol, step });
    socket.emit("PlayersReady", { Gameslobby: game.Gameslobby });
    socket.to(roomId).emit("PlayersReady", { Gameslobby: game.Gameslobby });
  });
  socket.on(
    "StartGame",
    (roomId: string, colsValue: number, rowsValue: number) => {
      let WinHorizontal: number = 0;
      let WinVertical: number = 0;
      let WinDiagonal: number = 0;
      const game = Games[roomId];

      game.gameField = CreateGamePage(+colsValue, +rowsValue);
      game.fieldSize = `${colsValue}_${rowsValue}`;
      console.log("fieldSize", game.fieldSize);
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
            game.step = game.step === "0" ? "X" : "0";

            const cordCell = `${cordCell_1}.${cordCell_2}`;

            socket
              .to(roomId)
              .emit("cordCell", { cordCell, GameSymbol, step: game.step });
            socket.emit("cordCell", { cordCell, GameSymbol, step: game.step });
            socket.to(roomId).emit("stepPlayer", { step: game.step });

            console.log(game.gameField);

            console.log(
              CheckWinDiagonal_from_Left_to_Right(
                game.gameField,
                GameSymbol,
                WinDiagonal,
                colsValue,
                rowsValue,
                roomId
              )
            );

            console.log(
              CheckWinDiagonal_from_Right_to_Left(
                game.gameField,
                GameSymbol,
                WinDiagonal,
                colsValue,
                rowsValue,
                roomId
              )
            );

            console.log(
              checkWinHorizontal(
                game.gameField,
                GameSymbol,
                WinHorizontal,
                colsValue,
                rowsValue,
                roomId
              )
            );

            console.log(
              checkWinVertical(
                game.gameField,
                GameSymbol,
                WinVertical,
                colsValue,
                rowsValue,
                roomId
              )
            );

            console.log(
              Check_draw(game.gameField, colsValue, rowsValue, roomId)
            );
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
        rowsValue: number,
        roomId: string
      ) {
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === GameSymbol) {
              WinHorizontal++;
              console.log("WinHorizontal", WinHorizontal);
              for (let i = 1; i < 3; i++) {
                let i_1 = `${col}`;
                let j_1 = `${row}`;
                let NextCell_i: number = 0;
                let NextCell_j: number = 0;
                NextCell_i = +i_1;
                NextCell_j = +j_1 + i;

                if (NextCell_j >= rowsValue) {
                  console.log("error massiv range");
                  WinHorizontal = 0;
                  break;
                } else {
                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinHorizontal++;

                    if (WinHorizontal === 3) {
                      WinHorizontal++;
                      let message = `WIN ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.to(roomId).emit("EndGame", message);
                      socket.disconnect(true);
                      return true;
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

      function checkWinVertical(
        gameField: string[][],
        GameSymbol: string,
        WinVertical: number,
        colsValue: number,
        rowsValue: number,
        roomId: string
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
                console.log("winVertical", WinVertical);
                if (NextCell_i >= colsValue) {
                  console.log("error massiv range");
                  WinVertical = 0;
                  break;
                } else {
                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinVertical++;
                    if (WinVertical === 3) {
                      WinVertical = 0;
                      let message = `WIN ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.to(roomId).emit("EndGame", message);
                      socket.disconnect(true);
                      return true;
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
      function CheckWinDiagonal_from_Left_to_Right(
        gameField: string[][],
        GameSymbol: string,
        WinDiagonal: number,
        colsValue: number,
        rowsValue: number,
        roomId: string
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
                  WinDiagonal = 0;
                  break;
                } else {
                  if (gameField[NextCell_i][NextCell_j] === GameSymbol) {
                    WinDiagonal++;

                    if (WinDiagonal === 3) {
                      console.log("1");
                      let message = `Game End Wins L to R ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.to(roomId).emit("EndGame", message);
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
        WinDiagonal: number,
        colsValue: number,
        rowsValue: number,
        roomId: string
      ) {
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
                      let message = `Game End Wins R to L ${GameSymbol}`;
                      socket.emit("EndGame", message);
                      socket.to(roomId).emit("EndGame", message);
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
        colsValue: number,
        rowsValue: number,
        roomId: string
      ) {
        let k: number = 0;
        for (let col = 0; col < colsValue; col++) {
          for (let row = 0; row < rowsValue; row++) {
            if (gameField[col][row] === "null") {
              k++;
            } else {
              continue;
            }
          }
        }
        if (k === 0) {
          let message = `Ничья`;
          socket.emit("EndGame", message);
          socket.to(roomId).emit("EndGame", message);
          socket.disconnect(true);
        }
      }
    }
  ); //Ssoket startGame
}); //soket connect

httpServer.listen(3000, () => {
  console.log("server listening on port 3000");
});
////"start": "npx ts-node src/index.ts"
/* "start:ts": "tsc -w",
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
