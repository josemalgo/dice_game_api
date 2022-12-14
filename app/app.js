import express from "express";
import playerRoutes from "./routes/player.routes.js";

const app = express();

app.use(playerRoutes);

export default app;