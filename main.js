require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { connectDB } = require("./mongodb");
const fs = require("fs");
const path = require('path');
const config = require("./config");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


connectDB();
client.invites = new Map();
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

       
        if (!command.data || !command.data.name || !command.execute) {
            console.warn(`⚠ Skipping invalid command file: ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);
    }
}


const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.name === "inviteTracker") {
        event.execute(client); 
    } else if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    const imagePath = path.join(__dirname, 'index.html');
    res.sendFile(imagePath);
});
app.listen(port, () => {
    console.log(`🔗 Listening to GlaceYT : http://localhost:${port}`);
});


    
client.login(process.env.TOKEN || config.token);
