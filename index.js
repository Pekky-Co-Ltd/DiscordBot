
/**
 * @author OpecZ CH <me@opecgame.in.th>
 */

const Discord = require("discord.js");
const config = require("./config");
const logger = require("./function/logger");

const Manager = new Discord.ShardingManager(`${__dirname}/client.js`, {
    totalShards: config.shard,
    mode: "process",
    token: config.token,
})
Manager.on("shardCreate", shard => logger.debug(`Launched Shard ${shard.id + 1} of ${shard.manager.totalShards}`));
Manager.spawn(this.totalShards, 10000, -1)