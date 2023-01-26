import express from "express";
import playerRoutes from "./routes/player.routes.js";
import gameRoutes from "./routes/game.routes.js";
import rankingRoutes from "./routes/ranking.routes.js"
import { errorResponder, failSafeHandler, invalidPathHandler, logError } from "./middlewares/errors/errorHandler.js";

const app = express();

app.use(express.json());
app.use(playerRoutes);
app.use(gameRoutes);
app.use(rankingRoutes);
app.use(logError)
app.use(errorResponder)
app.use(invalidPathHandler)
app.use(failSafeHandler)

export default app;