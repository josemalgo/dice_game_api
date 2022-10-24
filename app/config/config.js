import * as dotenv from "dotenv";
dotenv.config();

export const mongoConfig = {
    DB_URI: process.env.DB_MONGO_URI,
    DB_USER: process.env.DB_MONGO_USER,
    DB_PASSWORD: process.env.DB_MONGO_PASSWORD
};