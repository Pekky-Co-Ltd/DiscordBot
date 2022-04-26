# DiscordBot
 สร้างขึ้นมาเพื่อศึกษาและพัฒนาบอทในขึ้นพื้นฐาน

### Download
```bash
git clone https://github.com/Pekky-Co-Ltd/DiscordBot
```

### Requirement
* [Node Js Version 16+](https://nodejs.org/en/download/)
* [Lavalink](https://github.com/freyacodes/Lavalink/releases/tag/3.4)

### Install
```bash
npm i
```

### Config
```js
{
    version: require("./package.json").version,
    token: "", // Token ของบอทของเรา
    shard: 1,
    intents: 32767,
    pushcommand: true, // เพิ่ม SlashCommand หรือไม่
    pushGlobal: false, // เพิ่ม SlashCommand แบบ ทุก Server
    guildPushCommand: [""],  // GuildID ของเซิฟที่จะทำการเทส

    nodes: [
        {
            id : "Pekky Lavalink",
            host: "localhost", // IP Lavalink
            port: 2333, // Port Lavalink
            password: "123456", // Password Lavalink
            retryAmount: 1000000,
            retryDelay: 5000,
        }
    ]

}
```

### Start
```bash
# Start Lavalink
java -jar Lavalink.jar

# Start Bot ใน โหมด Developer
npm run dev


# Start Bot
npm run start
```