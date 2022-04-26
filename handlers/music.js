const Discord = require("discord.js");
const logger = require("../function/logger");
const fs = require("fs");
const erela = require("erela.js");
const config = require("../config");
/**
 * 
 * @param {import("discord.js").Client} client 
 */
module.exports = (client) => {
    client.music = new erela.Manager({
        nodes: config.nodes,
        clientName: "Pekky Developer",
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload)
        }
    });

    client.music.on("nodeConnect", (node) => {
        node.send({
            op: "configureResuming",
            timeout: 120000,
            key: "PekkyDeveloper"
        })
        logger.success(`Node ${node.options.id} Connected`);
    })
        .on("nodeDisconnect", (node) => {
            logger.warning(`Node ${node.options.id} Disconnect`);
        })
        .on("playerMove", async (player, oldChannel, newChannel) => {
            if (!newChannel) {
                player.destroy()
            } else {
                player.voiceChannel = newChannel;
                player.set("voiceChannel", player.newChannel)

                if (player.paused) return;
                setTimeout(() => {
                    player.pause(true);
                    setTimeout(() => player.pause(false), 1000);
                }, 1000);
            }
        })
        .on("trackStart", async (player, track, payload) => {
            logger.debug(`Track Start ${track.title} -> ${player.guild}`);
            player.set("voiceChannel", player.voiceChannel);
            return
        })
        .on("trackStuck", async (player, track, payload) => {
            player.stop()
        })
        .on("trackError", async (player, track, payload) => {
            player.stop();
        })
        .on("queueEnd", async (player) => {
            player.destroy();
        })
    client.on("raw", (d) => client.music.updateVoiceState(d))
        .on("voiceStateUpdate", async (oldState, newState) => {
            if (oldState.channel && !newState.channel) {
                if (oldState.member.user.id === client.user.id) {
                    let player = client.music.get(oldState.guild.id);
                    if (!player) return
                    player.destroy()
                }
            }
            let player = client.music.players.get(newState.guild.id);
            if (!player) return;
            if (oldState && oldState.channel) {
                if (!oldState.guild.me.voice.channel) return;
                if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.filter(member => member.user.bot === false).size === 0) {
                    player.destroy()
                }
            }
        })
}
