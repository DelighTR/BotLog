require('dotenv').config();
require('./keepAlive.js')();
const config = require("./config.json")
const {
    Client,
    Collection,
    Intents,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,  
} = require("discord.js");
const Discord = require("discord.js");

const client = new Client({
    shards: 'auto',
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
        activities: [{
            name: `Botları`,
            type: "WATCHING",
        }],
        status: "idle"
    }
});

const colors = require("colors");
const moment = require("moment");


const { PresenceUpdateStatus } = require("discord-api-types/v9");
const { Presence } = require("discord.js");

client.on("presenceUpdate", async (oldPresence, newPresence) => {
  try
    {
        if (!oldPresence || !oldPresence.user.bot)
            return;
        if (oldPresence.status == newPresence.status)
            return;

        if (config.Servers)
        {
            /* Bot went online. */
            if (newPresence.status == PresenceUpdateStatus.Online)
            {
                newPresence.guild.channels.cache.get(config.Channels).send({
                    embeds: [new MessageEmbed()
                    .setTitle(`🟢︱Bot Aktif`)
                    .setDescription(`**${newPresence.user.tag}** Adlı Bot Aktif!`)
                    .setColor(`GREEN`)
                    .setThumbnail(newPresence.user.avatarURL({ format: "png", size: 1024 }))
                    .setFooter(`Bot Log`, newPresence.user.avatarURL({ format: "png", size: 1024 }))
                    .setTimestamp()]
                });
            }

            /* Bot went offline. */
            else if (newPresence.status == PresenceUpdateStatus.Offline || newPresence.status == PresenceUpdateStatus.Invisible)
            {
                newPresence.guild.channels.cache.get(config.Channels).send({
                    embeds: [new MessageEmbed()
                    .setTitle(`🔴︱Bot Deaktif`)
                    .setDescription(`**${newPresence.user.tag}** Adlı Bot Deaktif.`)
                    .setColor(`RED`)
                    .setThumbnail(newPresence.user.avatarURL({ format: "png", size: 1024 }))
                    .setFooter(`Bot Log`, newPresence.user.avatarURL({ format: "png", size: 1024 }))
                    .setTimestamp()]
                });
            }
        }
    }
    catch (err)
    {
        return Promise.reject(err);
    }
});

Token = ""

client.login(Token);

client.logger = (data) => {
  let logstring = `${String(`M` + `a` + `x` + `G` + `a` + `m` + `i` + `n` + `g` + `-Logs`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` [::] `.magenta}`
  if (typeof data == "string") {
    console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
  } else if (typeof data == "object") {
    console.log(logstring, JSON.stringify(data, null, 3).green)
  } else if (typeof data == "boolean") {
    console.log(logstring, String(data).cyan)
  } else {
    console.log(logstring, data)
  }
};

client.on("ready", async () => {
  try{
      client.logger(`Giriş Yapıldı!`.bold.brightGreen);
      
      client.logger(
      `Bot İsim: `.brightBlue + `${client.user.tag}`.blue + `\n` +
      `Bilgi: `.brightBlue + `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`.blue + `\n` +
      `Discord.js: `.brightBlue + `v${Discord.version}`.blue + `\n` +
      `Node.js: `.brightBlue + `${process.version}`.blue + `\n` +
      `Bellek: `.brightBlue + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`.blue
      );
    }catch{ /* */ }
});

// AntiCrash
process.on('multipleResolves', (type, promise, reason) => { // Needed
  console.log('[antiCrash] :: [multipleResolves]');
  console.log(type, promise, reason);
});
process.on('unhandledRejection', (reason, promise) => { // Needed
  console.log('[antiCrash] :: [unhandledRejection]');
  console.log(promise, reason);
});
process.on("uncaughtException", (err, origin) => { // Needed
  console.log('[antiCrash] :: [uncaughtException]');
  console.log(err, origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
  console.log('[antiCrash] :: [uncaughtExceptionMonitor]');
  console.log(err, origin);
});
