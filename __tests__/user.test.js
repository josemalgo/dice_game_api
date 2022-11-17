import Player from "../app/models/Player.js"

describe('creating a new player', () => {
    beforeEach(async () => {
        await Player.deleteMany({});
        
        const passwordHash = await  bcrypt.hash("pswd", 10);
        const player = new Player({ name: "jose", password: passwordHash });
        await Player.save();
    })
})
