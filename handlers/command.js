const Discord = require("discord.js");
const logger = require("../function/logger");
const fs = require("fs");

/**
 * 
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
    client.commands = new Discord.Collection()
    client.commandsArray = new Array();

    try {
        
        fs.readdirSync("./commands").forEach(folder => {
            fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`)).forEach(file => {
                const command = require(`../commands/${folder}/${file}`);
                try {
                    logger.debug(`Loaded Command ${command.data.name}`)
                    client.commands.set(command.data.name, command)
                    client.commandsArray.push((command.data).toJSON())
                } catch (e) {
                    logger.danger(`Can't readfile "/commands/${folder}/${file}"`)
                }
            })
        })

    } catch (e) {
        logger.danger(String(e))
    }
}