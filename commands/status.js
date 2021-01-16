const https = require('https');
const { MessageEmbed } = require('discord.js');
const filePath = require('../filePaths.json');
const { api, options } = require(`../${filePath.config}`);
const { status } = require(`../${filePath.response}`);
let json = status;
module.exports = {
	name: 'status',
	description: 'Information about the status of https://www.thebluealliance.com/',
    args: false,
    /**
     * @param {Message} message The message from user
     */
    execute(message) {
        const url = `${api}/status`;
        https.get(url,options, (res) => {
            let data = '';
            res.on('data', (chunk) => {data += chunk;});
            res.on('end', () => {
                data.slice(9);
                json = JSON.parse(data);
                console.log(`request from guild "${message.guild.name}"`)
                console.log(json);
                let status;
                if(json.is_datafeed_down)
                    status = 'Offline';
                else
                    status = 'Online'
                const reply = new MessageEmbed()
                    .setAuthor('The Blue Alliance','https://frcdesigns.files.wordpress.com/2017/06/android_launcher_icon_blue_512.png')
                    .setTitle('The Blue Alliance Status')
                    .addFields(
                        { name: 'Status', value: status, inline: true },
                        { name: 'Current Season', value: `${json.current_season}`, inline: true },
                    )
                    .setTimestamp()
                    .setColor('#3F51B5');
                try {
                    message.reply(null,reply);
                    }
                catch (error) {
                    console.error(error);
                }
            });
        }).on('error', err => { console.log(err); });
    },
};