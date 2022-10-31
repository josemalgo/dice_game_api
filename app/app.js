import express from "express";
import playerRoutes from "./routes/player.routes.js";
import gameRoutes from "./routes/game.routes.js";

const app = express();

app.use(express.json());
app.use(playerRoutes);
app.use(gameRoutes);

export default app;