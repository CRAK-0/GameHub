import "dotenv/config";

import { getGame } from "./services/rawg.js";
import { saveGame } from "./models/game.model.js";

const rawgGame = await getGame(3498);

const savedGame = await saveGame(rawgGame);

console.log(savedGame);
