import express from "express";
import playerRoutes from "./routes/player.routes.js";
import gameRoutes from "./routes/game.routes.js";
import rankingRoutes from "./routes/ranking.routes.js"

const app = express();

app.use(express.json());
app.use(playerRoutes);
app.use(gameRoutes);
app.use(rankingRoutes);

export default app;