const filePath = require('../../filePaths.json');
const { prefix } = require(`../../${filePath.config}`);
module.exports = (client, message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)){
		message.reply('this command does not exsist. Type the following command for help ```tba help``` ');
		return;
	}
	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
};