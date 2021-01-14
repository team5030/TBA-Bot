const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['commands_handler', 'events_handler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client);
});

client.login(token);