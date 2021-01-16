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
        console.log(args[0]);
        switch (args[0]) {
            case 'status':
                reply = reply
                .setTitle('Help Status')
                .addFields(
                    {name: 'Syntax', value: '```tba Status ```',inline: false},
                );
                break;
            case 'team':
                reply = reply
                .setTitle('team')
                .addFields(
                    {name: 'Syntax', value: '```tba team <team number>```',inline: false},
                    {name: 'Exsample', value: '```tba team 540```',inline: false},
                );
                break;   
            default:
            reply = reply
                .setTitle('Help')
                .addFields(
                    {name: 'Syntax', value: '```tba help <options>```',inline: false},
                    {name:'Options', value: '```\nstatus\nteam```',inline: false},
                );
            break;
        }
        message.reply(null, reply);
    },
};