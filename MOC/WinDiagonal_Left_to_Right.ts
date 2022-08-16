const AMOUNT_OF_SIGNS_TO_FILL_DIAGONAL = 3;

const GAME_STATES = {
  process: "process",
  draw: "draw",
  victory: "victory",
};

type Params = {
  gameField: string[][];
  gameSymbol: string;
  gameFieldSize: number[];
  colsValue: number;
  rowsValue: number;
};

export function checkGameStateForSymbol(params: Params): string {
  const { gameField, gameSymbol, gameFieldSize, colsValue, rowsValue } = params;

  let gameState = GAME_STATES.process;

  for (let col = 0; col < colsValue; col++) {
    for (let row = 0; row < rowsValue; row++) {
      let ifTheSymbolIsFound = gameField[col][row] === gameSymbol;

      if (ifTheSymbolIsFound) {
        const currentCoordinate = [col, row];

        const playerWins = checkWins({
          fromCoordinate: currentCoordinate,
          gameField,
          gameFieldSize,
          gameSymbol,
        });

        if (playerWins) {
          gameState = GAME_STATES.victory;
          break;
        }
      } else {
        continue;
      }
    }
  }

  if (gameState === GAME_STATES.process) {
    // check if draw;
  }

  return gameState;
}
interface checkThatDiagonalFilled {
  fromCoordinate: number[];
  gameFieldSize: number[];
  gameField: string[][];
  gameSymbol: string;
}

function checkWins({
  fromCoordinate,
  gameFieldSize,
  gameField,
  gameSymbol,
}: checkThatDiagonalFilled): boolean {
  const [fromI, fromJ] = fromCoordinate;
  const [colsValue, rowsValue] = gameFieldSize;
  let arrayFunctionsCheckWins = [
    oneCoordinateToTheRightOfTheCurrentHorizontally,
    oneCoordinateToTheDownOfTheCurrentVertical,
    oneCoordinateToTheDiagonaleFromTheLeftToRight,
    oneCoordinateToTheDiagonaleFromTheRightToLeft,
  ];
  let diagonalFillingCounter = 1;
  for (
    let function_ = 0;
    function_ < arrayFunctionsCheckWins.length;
    function_++
  ) {
    for (let i = 1; i < AMOUNT_OF_SIGNS_TO_FILL_DIAGONAL; i++) {
      let currentI = arrayFunctionsCheckWins[function_](
        i,
        fromCoordinate
      ).currentI;
      let currentJ = arrayFunctionsCheckWins[function_](
        i,
        fromCoordinate
      ).currentJ;
      const isOutsideOfGameField =
        currentI >= colsValue || currentJ >= rowsValue;

      if (isOutsideOfGameField) {
        break;
      }

      const currentSignIsEqualToGameSymbol =
        gameField[currentI][currentJ] === gameSymbol;

      if (currentSignIsEqualToGameSymbol) {
        diagonalFillingCounter++;
      }
    }
  }

  const diagonalIsFilled =
    diagonalFillingCounter === AMOUNT_OF_SIGNS_TO_FILL_DIAGONAL;

  return diagonalIsFilled;
}

function oneCoordinateToTheRightOfTheCurrentHorizontally(
  i: number,
  fromCoordinate: number[]
) {
  let [fromI, fromJ] = fromCoordinate;
  const currentI: number = fromI;
  const currentJ: number = fromJ + i;
  return { currentI, currentJ };
}

function oneCoordinateToTheDownOfTheCurrentVertical(
  i: number,
  fromCoordinate: number[]
) {
  let [fromI, fromJ] = fromCoordinate;
  const currentI: number = fromI + i;
  const currentJ: number = fromJ;
  return { currentI, currentJ };
}

function oneCoordinateToTheDiagonaleFromTheLeftToRight(
  i: number,
  fromCoordinate: number[]
) {
  let [fromI, fromJ] = fromCoordinate;
  const currentI: number = fromI + i;
  const currentJ: number = fromJ + i;
  return { currentI, currentJ };
}

function oneCoordinateToTheDiagonaleFromTheRightToLeft(
  i: number,
  fromCoordinate: number[]
) {
  let [fromI, fromJ] = fromCoordinate;
  const currentI: number = fromI + i;
  const currentJ: number = fromJ - i;
  return { currentI, currentJ };
}
