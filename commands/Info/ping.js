const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Check Ping's of Bot`),
    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */
    run: async (client, interaction) => {
        interaction.reply({
            content: `Pong !, ${calTimeSnowflake(interaction.id)}ms`
        })
    }
}

function calTimeSnowflake(snowflake) {
    const milliseconds = BigInt(snowflake) >> 22n
    return Math.abs(new Date() - new Date(Number(milliseconds) + 1420070400000).getTime())
}