const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`skip`)
        .setDescription(`Skip Music`),

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */
    run: async (client, interaction) => {
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
        if (!player) return interaction.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter({ text: client.user.username + " | Version " + config.version, iconURL: client.user.displayAvatarURL() })
                .setTitle(`บอทไม่ได้เล่นเพลงอยู่ในขณะนี้`)
            ], ephemeral: true
        });
        if (player && channel.id !== player.voiceChannel) return interaction.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter({
                        text: client.user.username + " | Version " + config.version,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTitle(`กรุณาเข้าห้องเสียงเดียวกับบอทเพื่อใช้งานคำสั่งนี้`)
                    .setDescription(`ห้องเสียง <#${player.voiceChannel}>`)
                ],
                ephemeral: true
            });

            player.stop();
            return interaction.reply({embeds:[new Discord.MessageEmbed()
                .setTitle(`สำเร็จ | ⏭ ข้ามเพลงสำเร็จ`)
                .setColor("RED")
                .setFooter({
                    text: client.user.username + " | Version " + config.version,
                    iconURL: client.user.displayAvatarURL()
                })
            ],ephemeral: true});
    }
}