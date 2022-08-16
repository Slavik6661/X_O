import { checkGameStateForSymbol } from "../../src/CheckWinsPlayer/checkWins";
import { checkPlayeDraw } from "../CheckWinsPlayer/checkDraw";

export enum GameStep {
  X = "X",
  O = "O",
}

class Game {
  id: string;
  step: GameStep;
  gamesLobby: string[] = [];
  gameField: string[][] = [];
  fieldSize: string | null = null;

  constructor() {
    this.id = Date.now().toString().slice(8);
    this.step = GameStep.X;
  }

  createGamePage(colsValue: number, rowsValue: number): string[][] {
    const massivCellAll = [];
    for (let i = 0; i < colsValue; i++) {
      const innerArray = new Array(rowsValue).fill("null");
      massivCellAll.push(innerArray);
    }

    return (this.gameField = massivCellAll);
  }

  addPlayer(userId: string): void {
    if (this.gamesLobby.length < 2) {
      this.gamesLobby.push(userId);
    }
  }

  checkStep(cordCell_1: number, cordCell_2: number): boolean {
    const isEmptyCell = this.gameField[cordCell_1][cordCell_2] === "null";

    if (!isEmptyCell) {
      throw new Error();
    }
    return true;
  }

  playerTurnChange() {
    return (this.step = this.step === GameStep.X ? GameStep.O : GameStep.X);
  }

  PlayerStep(cordCell_1: number, cordCell_2: number) {
    if (this.checkStep(cordCell_1, cordCell_2)) {
      this.gameField[cordCell_1][cordCell_2] = this.step;
      this.playerTurnChange();
      return this.step;
    }
    throw new Error();
  }

  gameFieldSize(cols_rows: string) {
    return (this.fieldSize = cols_rows);
  }

  checkWin(
    gameSymbol: string,
    gameFieldSize: number[],
    colsValue: number,
    rowsValue: number
  ) {
    const playerWins = checkGameStateForSymbol({
      gameField: this.gameField,
      gameSymbol: gameSymbol,
      gameFieldSize: gameFieldSize,
      colsValue: colsValue,
      rowsValue: rowsValue,
    });

    return playerWins;
  }

  checkDraw(
    gameField: string[][],
    colsValue: number,
    rowsValue: number,
    numberOfEmptyCells: number
  ) {
    const draw = checkPlayeDraw(
      gameField,
      colsValue,
      rowsValue,
      numberOfEmptyCells
    );
    return draw;
  }

  /* checkDraw(
    gameField: string[][],
    colsValue: number,
    rowsValue: number,
    numberOfEmptyCells: number
  ) {
    numberOfEmptyCells = 0;
    for (let col = 0; col < colsValue; col++) {
      for (let row = 0; row < rowsValue; row++) {
        if (gameField[col][row] === "null") {
          numberOfEmptyCells++;
          return false;
        } else {
          continue;
        }
      }
    }
    if (numberOfEmptyCells === 0) {
      return true;
    }
  } */
}

export default Game;
