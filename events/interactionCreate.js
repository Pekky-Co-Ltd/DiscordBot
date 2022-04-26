const Discord = require("discord.js");
const config = require("../config");
const logger = require("../function/logger")
/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        interaction.de
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.deferReply({
            ephemeral: true
        })
        logger.debug(`${interaction.user.tag} (${interaction.user.id}) > /${interaction.commandName}`)
        return cmd.run(client, interaction);
    } else if (interaction.isAutocomplete()) {
        let res = await client.music.search(`${interaction.options._hoistedOptions[0].value}`)
        const resArray = new Array();
        if (res.loadType === "PLAYLIST_LOADED") return interaction.respond(([{ name: `เพิ่มทุกเพลงใน Playlist`, value: `${interaction.options._hoistedOptions[0].value}`}]))
        res.tracks.forEach(_ => {
            resArray.push({ name: _.title, value: `https://youtu.be/${_.identifier}`});
        });
        interaction.respond(resArray)
    }
}
