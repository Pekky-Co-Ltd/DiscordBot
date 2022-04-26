const config = {
    development: {
        version: require("./package.json").version,
        token: "",
        shard: 1,
        intents: 32767,
        pushcommand: true,
        pushGlobal: false,
        guildPushCommand: [""],

        nodes: [
            {
                id : "Pekky Lavalink",
                host: "localhost",
                port: 2333,
                password: "123456",
                retryAmount: 1000000,
                retryDelay: 5000,
            }
        ]

    },
    production: {
        version: require("./package.json").version,
        token: "",
        shard: 1,
        intents: 32767,
        pushcommand: true,
        pushGlobal: false,
        guildPushCommand: [""],

        nodes: [
            {
                id : "Pekky Lavalink",
                host: "localhost",
                port: 2333,
                password: "123456",
                retryAmount: 1000000,
                retryDelay: 5000,
            }
        ]

    }
};

module.exports = config[process.env.NODE_ENV === 'development' ? 'development' : 'production']