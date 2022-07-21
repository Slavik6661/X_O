import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import {router} from "./Rout/GameRout"
import {CreateGamePage} from "./Game/CreateGamePage"
import { Game, createGame } from "./Game/CreateGame";
import { checkWinHorizontal } from "./CheckWinsPlayer/WinsHorizontal";
import { checkWinVertical } from "./CheckWinsPlayer/WinsVertical"
import { CheckWinDiagonal_from_Left_to_Right } from "./CheckWinsPlayer/WinDiagonal_Left_to_Right"
import { CheckWinDiagonal_from_Right_to_Left} from "./CheckWinsPlayer/WinDiagonal_Right_to_Left"
import { Check_draw } from "./CheckWinsPlayer/Check_draw"



const App = express();
const httpServer = createServer(App);
const io = new Server(httpServer, {});
dotenv.config();
let PORT = process.env.PORT;


const Games: Record<string, Game> = {};


createGame()
App.use(router) 
  
io.sockets.on("connection", (socket) => {
  socket.on("gameFieldValue", (cols, rows) => {
    let cols_rows = `${cols}_${rows}`;
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
      let message: string 
      let numberOfEmptyCells: number 
      const game = Games[roomId];
      
      game.gameField = CreateGamePage(+colsValue, +rowsValue);
      game.fieldSize = `${colsValue}_${rowsValue}`;

      socket.on("click_cell",
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

            socket.to(roomId).emit("cordCell", { cordCell, GameSymbol, step: game.step });
            socket.emit("cordCell", { cordCell, GameSymbol, step: game.step });
            socket.to(roomId).emit("stepPlayer", { step: game.step });

            //console.log(game.gameField);

            const WinDiagonalLeft_to_Right =CheckWinDiagonal_from_Left_to_Right(
              game.gameField,
              GameSymbol,
              WinDiagonal,
              colsValue,
              rowsValue,
            );
              if(WinDiagonalLeft_to_Right){
                message = `Игрок ${GameSymbol} выиграл`;
                socket.to(roomId).emit("EndGame",message);
                socket.emit("EndGame", message);
                socket.disconnect(true);
              }
             
           const WinDiagonalRight_to_Left= CheckWinDiagonal_from_Right_to_Left(
              game.gameField,
              GameSymbol,
              WinDiagonal,
              colsValue,
              rowsValue,
            );
            if(WinDiagonalRight_to_Left){
              message = `Игрок ${GameSymbol} выиграл`;
                socket.to(roomId).emit("EndGame",message);
                socket.emit("EndGame", message);
                socket.disconnect(true);
            }
            const winHorizontal = checkWinHorizontal(
              game.gameField,
              GameSymbol,
              WinHorizontal,
              colsValue,
              rowsValue,
              message,
              
            );

             if (winHorizontal) {
              message = `Игрок ${GameSymbol} выиграл`;
              socket.emit("EndGame", message);
              socket.to(roomId).emit("EndGame",message);
              socket.disconnect(true);
             }

           const winVertical= checkWinVertical(
              game.gameField,
              GameSymbol,
              WinVertical,
              colsValue,
              rowsValue,
              
            );
            if(winVertical) { 
              message = `Игрок ${GameSymbol} выиграл`;
              socket.emit("EndGame", message);
              socket.to(roomId).emit("EndGame",message);
              socket.disconnect(true);
            }

            const Draw=Check_draw(game.gameField, colsValue, rowsValue,numberOfEmptyCells);
            if(Draw) {
              message = `Ничья`;
              socket.emit("EndGame", message);
              socket.to(roomId).emit("EndGame",message);
              socket.disconnect(true);
              
            }
            
            
          } else {
            console.log("выход за приделы массива");
          }
        }
      );

    }
  ); //Ssoket startGame
}); //soket connect

httpServer.listen(process.env.PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
////"start": "npx ts-node src/index.ts"
/* "start:ts": "tsc -w",
    "start:js": "nodemon/build/index.js",
    "start": "concurrently npm:start:*" 
    */
