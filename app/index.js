import mongoConfig from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";


async function main() {
    const uri = mongoConfig.DB_URI;
    
    try {
        await mongoose.connect(uri);
        app.listen(3000);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.error("Unable to connect to the database: ", err);
    }
}

main();