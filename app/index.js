import { mongoConfig, serverConfig } from "./config/config.js";
import mongoose from "mongoose";
import app from "./app.js";


async function main() {
    const uri = mongoConfig.DB_URI;
    
    try {
        mongoose.connect(uri);
        app.listen(serverConfig.PORT);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
}

main();