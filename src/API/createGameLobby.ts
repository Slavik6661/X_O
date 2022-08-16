import Game, { GameStep } from "../Game/Game";

export const Games: Record<string, Game> = {};

export default function createGamelobby(
  cordinateGamePage: string,
  playerId: string
) {
  const gameInfo = Object.values(Games).find(
    (value) =>
      value.gamesLobby.length < 2 && cordinateGamePage === value.fieldSize
  );

  let symbol: string;
  let game: Game;

  if (!gameInfo) {
    game = new Game();
    symbol = GameStep.X;
    game.gameFieldSize(cordinateGamePage);
    // Games[game.id] = game;
  } else {
    symbol = GameStep.O;
    game = gameInfo;
  }

  const { id, step } = game;
  Games[id] = game;
  game.addPlayer(playerId);

  return { id, step, symbol, gamesLobby: game.gamesLobby };
}
