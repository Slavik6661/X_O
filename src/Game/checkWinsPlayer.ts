import Game from "./Game";

export default function CheckWinsPlayer(
  game: Game,
  gameSymbol: string,
  gameFieldSize: number[],
  colsValue: number,
  rowsValue: number,
  numberOfEmptyCells: number
): string | any {
  const wins = game.checkWin(gameSymbol, gameFieldSize, colsValue, rowsValue);

  const draw = game.checkDraw(
    game.gameField,
    colsValue,
    rowsValue,
    numberOfEmptyCells
  );

  return { wins, draw };
}
