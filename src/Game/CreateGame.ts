export type Game = {
  roomId: string;
  Gameslobby: string[];
  gameField: string[][];
  fieldSize: string | null;
  step: "X" | "0";
};
// const Games: Record<string, Game> = {};

export const createGame = (): Game => ({
  roomId: Date.now().toString().slice(8),
  Gameslobby: [],
  gameField: [],
  fieldSize: null,
  step: "X",
});
