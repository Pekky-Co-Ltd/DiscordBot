const logger = require("../function/logger");
const fs = require("fs");

/**
 * 
 * @param {import("discord.js").Client} client 
 */

module.exports = (client) => {
    client.events = new Array()
    try {
        fs.readdirSync("./events").filter(file => file.endsWith(`.js`)).forEach(fileName => {
            try {
                const event = require(`../events/${fileName}`);
                const eventName = fileName.split(".")[0]
                client.events.push(eventName);
                client.on(eventName, event.bind(null, client));
                logger.debug(`Loaded Event ${eventName}`);
            } catch (e) {
                logger.danger(String(e))
                logger.danger(`Can't readfile "/events/${fileName}"`)
            }
            
        })
    } catch (e) {
        logger.danger(`${String(e)}`)
    }
}