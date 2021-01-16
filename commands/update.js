const shell = require('shelljs');
const { update } = require('../filePaths.json')
const { Message } = require('discord.js');
module.exports = {
	name: 'update',
	description: 'run update script for bot',
    args: false,
    /**
     * @param {Message} message The message from user
     */
	execute(message) {
        if(message.author.id != '287765319311687682') return;
        shell.exec(`../${update}`);
    },
};