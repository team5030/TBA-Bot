const https = require('https');
const { MessageEmbed } = require('discord.js');
const filePath = require('../filePaths.json');
const { api, options } = require(`../${filePath.config}`);
const { team } = require(`../${filePath.response}`);
module.exports = {
	name: 'team',
	description: 'Information about the team provided.',
	args: true,
	execute(message, args) {
        console.log(args);
        let json = team;
        let reply = new MessageEmbed()
        .setAuthor('The Blue Alliance','https://frcdesigns.files.wordpress.com/2017/06/android_launcher_icon_blue_512.png')
        .setColor('#3F51B5');
        const url = `${api}/team/frc${args[0]}`;
        https.get(url,options, (res) => {
            let data = '';
            res.on('data', (chunk) => {data += chunk;});
            res.on('end', () => {
                data.slice(9);
                json = JSON.parse(data);
                console.log(`request from guild "${message.guild.name}"`)
                console.log(json);
                reply = reply
                    .setTitle(`Team ${args[0]} Info`)
                    .addFields(
                        { name: 'Team Name', value: `${json.nickname}`, inline: false },
                        { name: 'School', value: `${json.school_name}`, inline: false},
                        { name: 'Team Location', value: `${json.city}, ${json.state_prov}, ${json.country}`, inline: false},
                        { name: 'Rookie Year', value: `${json.rookie_year}`, inline: false},
                        //{ name: 'Home Championship', value: `${json.home_championship}`},
                        { name: 'Website', value: `[${json.website}](${json.website})`, inline: false},
                    )
                    .setTimestamp();
                message.reply(null, reply);
            });
        })
        .on('error', err => {
            console.log(err);
        });

	},
};