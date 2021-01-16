const Discord = require('discord.js');
const filePath = require('./filePaths.json');
const { token } = require(`./${filePath.config}`);

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['commands_handler', 'events_handler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client);
});

client.login(token);