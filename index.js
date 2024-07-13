const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname,'commands');
// console.log(__dirname) //discord-bot
const commandFolders = fs.readdirSync(foldersPath); //['utility']
// console.log(commandFolders)
for(folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);//utility
    const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    //console.log(commandFile)
    for( file of commandFile){
        const filePath = path.join(commandsPath,file);
		//console.log(filePath)
        const command = require(filePath);

        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name,command);
        }
        else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

    }

 }


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
                   

client.login(token);
