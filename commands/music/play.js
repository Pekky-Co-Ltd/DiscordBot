const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`play`)
        .setDescription(`Play music`)
        .addStringOption(option =>
            option.setName('search')
                .setDescription('Song name or URL to search')
                .setRequired(true).setAutocomplete(true)),

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */
    run: async (client, interaction) => {
        const search = interaction.options.getString('search');
        const channel = interaction.member.voice?.channel;
        if (!channel) {
            return interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter({ text: client.user.username + " | Version " + config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`กรุณาเข้าห้องเสียงก่อนใช้งาน`)
                ], ephemeral: true
            });
        }
        player = client.music.players.get(interaction.guild.id)
        if (player && channel.id !== player.voiceChannel)
            return interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter({ text: client.user.username + " | Version " + config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`กรุณาเข้าห้องเสียงเดียวกับบอท`)
                    .setDescription(`\🎵 <#${player.voiceChannel}>`)
                ], ephemeral: true
            });
        if (!player) {
            player = client.music.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
            });
            player.connect();
        }
        res = await client.music.search(`${search}`, interaction.user)
        if (!res) return interaction.reply({
            embeds: [new Discord.MessageEmbed().setDescription(`ไม่พบเพลงที่ค้นหา \`${searh}\``).setColor("RED")], ephemeral: true
        })
        if (player.state !== "CONNECTED") {
            player.connect();
            player.set("playerauthor", interaction.user);
            player.play();
            player.pause(false);
        }
        let playembed = new Discord.MessageEmbed()
        if (res.loadType === "PLAYLIST_LOADED") {
            player.queue.add(res.tracks)
            try {
                playembed.setTitle(`เพิ่มเพลง **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
                playembed.setURL(res.playlist.uri).setColor("AQUA").setFooter({ text: client.user.username + " | Version " + config.version, iconURL: client.user.displayAvatarURL() })
                playembed.setThumbnail(res.playlist.thumbnail)
                playembed.addFields({ name: `⌛ ระยะเวลา`, value: `\` ${format(res.playlist.duration)} วินาที \``, inline: true })
                playembed.addFields({ name: `🎶 เพลงในคิว`, value: `\` ${player.queue.length} เพลง \``, inline: true })
                playembed.setFooter({
                    text: `${client.user.username} | Version ${config.version}`, iconURL: client.user.displayAvatarURL({
                        dynamic: true
                    })
                })
            } catch (e) {
                console.log(e)
            }
        } else {
            player.queue.add(res.tracks[0]);
            try {
                let tn = !res.tracks[0].thumbnail.startsWith("https://img.youtube.com") ? res.tracks[0].thumbnail : `https://img.youtube.com/vi/${res.tracks[0].identifier}/maxresdefault.jpg`
                playembed.setTitle(`เพิ่มเพลง **\`${res.tracks[0].title}`.substr(0, 256 - 3) + "`**")
                playembed.setURL(res.tracks[0].uri).setColor("AQUA").setFooter({ text: client.user.username + " | Version " + config.version, iconURL: client.user.displayAvatarURL() })
                playembed.setThumbnail(tn)
                playembed.addFields({ name: `⌛ ระยะเวลา`, value: `\` ${res.tracks[0].isStream ? "🔴 LIVE STREAM" : format(res.tracks[0].duration)} วินาที \``, inline: true })
                playembed.addFields({ name: `✨ เจ้าของเพลง`, value: `\` ${res.tracks[0].author} \``, inline: true })
                playembed.addFields({ name: `🎶 เพลงในคิว`, value: `\` ${player.queue.length} เพลง \``, inline: true })
                playembed.setFooter({
                    text: `${client.user.username} | Version ${config.version}`, iconURL: client.user.displayAvatarURL({
                        dynamic: true
                    })
                })
            } catch (e) {
                console.log(e)
            }
        }
        if (player.playing == false) {
            player.play();
        }

        await interaction.reply({
            embeds: [playembed]
            , ephemeral: true
        });
    }
}

function format(time) {
    try {
        time = Math.floor(time / 1000)
        let hrs = ~~(time / 3600);
            let mins = ~~((time % 3600) / 60);
            let secs = ~~time % 60;
            let ret = "";
            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return `${ret} | ${time}`;
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
}