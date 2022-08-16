import { Server } from "socket.io";
import createGamelobby, { Games } from "../API/createGameLobby";
import CheckWinsPlayer from "../Game/checkWinsPlayer";
import Game from "../Game/Game";

export function connectGame(io: Server) {
  io.sockets.on("connection", (socket) => {
    socket.on("gameFieldValue", (cols, rows) => {
      let cordinateGamePage = `${cols}_${rows}`;

      let gameLobby = createGamelobby(cordinateGamePage, socket.id);

      socket.join(gameLobby.id);

      socket.emit("start", {
        id: gameLobby.id,
        symbol: gameLobby.symbol,
        step: gameLobby.step,
      });

      socket.emit("PlayersReady", { gamesLobby: gameLobby.gamesLobby });
      socket
        .to(gameLobby.id)
        .emit("PlayersReady", { gamesLobby: gameLobby.gamesLobby });
    });

    socket.on(
      "StartGame",
      (id: string, colsValue: number, rowsValue: number) => {
        let gameFieldSize: number[] = [colsValue, rowsValue];
        let message: string;
        let numberOfEmptyCells: number;
        const game = Games[id];

        game.gameField = game.createGamePage(+colsValue, +rowsValue);
        game.fieldSize = `${colsValue}_${rowsValue}`;

        socket.on(
          "click_cell",
          (cordCell_1: number, cordCell_2: number, gameSymbol: string) => {
            const cordCell = `${cordCell_1}.${cordCell_2}`;
            const cordinateStepPalayer = game.PlayerStep(
              cordCell_1,
              cordCell_2
            );

            socket.to(id).emit("drawingCharacterFromTheEnemy", {
              cordCell,
              gameSymbol,
              step: cordinateStepPalayer,
            });
            socket.emit("drawingCharacterFromTheEnemy", {
              cordCell,
              gameSymbol,
              step: cordinateStepPalayer,
            });

            socket.to(id).emit("stepPlayer", { step: cordinateStepPalayer });

            /* const wins = game.checkWin(
              gameSymbol,
              gameFieldSize,
              colsValue,
              rowsValue
            );

            const draw = game.checkDraw(
              game.gameField,
              colsValue,
              rowsValue,
              numberOfEmptyCells
            ); */
            let wins = CheckWinsPlayer(
              game,
              gameSymbol,
              gameFieldSize,
              colsValue,
              rowsValue,
              numberOfEmptyCells
            ).wins;
            let draw = CheckWinsPlayer(
              game,
              gameSymbol,
              gameFieldSize,
              colsValue,
              rowsValue,
              numberOfEmptyCells
            ).draw;

            if (wins === "victory") {
              console.log("отсылаю сообщение о победе");
              message = `Игрок ${gameSymbol} выиграл`;
            }
            if (draw) {
              message = `Ничья`;
            }

            if (message) {
              socket.to(id).emit("EndGame", message);
              socket.emit("EndGame", message);
              socket.disconnect(true);
            }
          }
        );
      }
    ); //Ssoket startGame
  }); //soket
}
