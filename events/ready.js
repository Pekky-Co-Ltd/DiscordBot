const Discord = require("discord.js");
const config = require("../config");
const logger = require("../function/logger")
/**
 * 
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
    client.user.setActivity({
        type: 2,
        name: `www.pekkybot.xyz`
    })

    logger.success(`${client.user.tag} is Ready !`);
    client.music.init(client.user.id);
    if (config.pushcommand) {
        if (config.pushGlobal) {
            logger.debug(`Push Commands to Global !`)
            client.application.commands.set(client.commandsArray);
        } else {
            logger.debug(`Push Commands to Guilds !`)
            client.guilds.cache.forEach(async (guild) => {
                if (!config.guildPushCommand.includes(guild.id)) return;
                try {
                    guild.commands.cache.map(command => guild.commands.delete(command.id));
                    guild.commands?.set(client.commandsArray);
                    logger.debug(`Pushed Command to Guild "${guild.name}" (${guild.id})`)
                } catch (e) {
                    logger.warning(`Can't Push Command to Guild "${guild.name}" (${guild.id})`);
                }
            })
        }
    } else {
        logger.debug(`Didn't Push Command to Global or Any Guild.`)
    }
}