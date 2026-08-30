import { getGameByRawgId, saveGame } from "../models/game.model.js";
import { getGame as getRawgGame } from "../services/rawg.js";

export const getGame = async (req, res) => {
  const { rawgId } = req.params;

  const game = await getGameByRawgId(rawgId);

  if (game) {
    return res.status(200).json({
      game,
    });
  }

  const rawgGame = await getRawgGame(rawgId);

  const savedGame = await saveGame(rawgGame);

  return res.status(200).json({
    game: savedGame,
  });
};
