const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Information about the command for the bot',
    args: true,
    /**
     * @param {Message} message The message from user
     */
	execute(message, args) {
        let reply = new MessageEmbed()
        .setAuthor('The Blue Alliance','https://frcdesigns.files.wordpress.com/2017/06/android_launcher_icon_blue_512.png')
        .setColor('#3F51B5');
        if (args.length == 0) {
            reply = reply
                .setTitle('Help')
                .addFields(
                    {name: 'Syntax', value: '```tba help <options>```',inline: false},
                    {name:'Options', value: '```\nhelp\nstatus\nteam```',inline: false},
                )
        }
        message.reply(null, reply);
    },
};