const Discord = require("discord.js")
const config = require("./config")
const logger = require("./function/logger")
const fs = require("fs");

const client = new Discord.Client({
    intents: config.intents, // Intents ในของบอท
})

const handlers = fs.readdirSync("./handlers"); // ค้นหาไฟล์ใน Folder handlers
handlers.forEach(fileName => {
    logger.debug(`Loaded Hander ${fileName}`)
    require(`./handlers/${fileName}`)(client) //เรียกใช้ hander และส่ง client ไป
})

logger.info(`Logging in . . .`)

client.login() // ทำการ Login