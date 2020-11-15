const { Console } = require('console');
const Discord = require('discord.js');
const https = require('https');
const { prefix, token, options } = require('./config.json');
const api = 'https://www.thebluealliance.com/api/v3';
const client = new Discord.Client();
client.on('ready',()=>{
    console.log('TBA bot online');
});
client.on('message', message =>{
    const author = message.author;
    const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/g);
    if(author.bot){ return; }
    let reply = new Discord.MessageEmbed()
        .setAuthor('The Blue Alliance','https://frcdesigns.files.wordpress.com/2017/06/android_launcher_icon_blue_512.png')
        .setColor('#3F51B5');
    let json;
    if(args[0] === 'team'){
        json = 
        {
            "key": "string",
            "team_number": 0,
            "nickname": "string",
            "name": "string",
            "school_name": "string",
            "city": "string",
            "state_prov": "string",
            "country": "string",
            "address": "string",
            "postal_code": "string",
            "gmaps_place_id": "string",
            "gmaps_url": "string",
            "lat": 0,
            "lng": 0,
            "location_name": "string",
            "website": "string",
            "rookie_year": 0,
            "motto": "string",
            "home_championship": {}
        };
        const url = `${api}/${args[0]}/frc${args[1]}`;
        https.get(url,options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                data.slice(9);
                json = JSON.parse(data);
                console.log(json);
                reply = reply
                    .setTitle('Team Info')
                    .addFields(
                        { name: 'Team Name', value: json.nickname, inline: false },
                        { name: 'Team Location', value: `${json.city}, ${json.state_prov}, ${json.country}`, inline: false},
                        { name: 'Website', value: `[${json.website}](${json.website})` },
                    )
                    .setTimestamp();
                message.reply(null, reply);
            });
        })
        .on('error', err => {
            console.log(err);
        });
        
    }else if(args[0] === 'event'){
        json =
        {
            "key": "string",
            "name": "string",
            "event_code": "string",
            "event_type": 0,
            "district": {
              "abbreviation": "string",
              "display_name": "string",
              "key": "string",
              "year": 0
            },
            "city": "string",
            "state_prov": "string",
            "country": "string",
            "start_date": "2020-11-03",
            "end_date": "2020-11-03",
            "year": 0,
            "short_name": "string",
            "event_type_string": "string",
            "week": 0,
            "address": "string",
            "postal_code": "string",
            "gmaps_place_id": "string",
            "gmaps_url": "string",
            "lat": 0,
            "lng": 0,
            "location_name": "string",
            "timezone": "string",
            "website": "string",
            "first_event_id": "string",
            "first_event_code": "string",
            "webcasts": [
              {
                "type": "youtube",
                "channel": "string",
                "date": "string",
                "file": "string"
              }
            ],
            "division_keys": [
              "string"
            ],
            "parent_event_key": "string",
            "playoff_type": 0,
            "playoff_type_string": "string"
        }
    }
    
});
client.login(token);