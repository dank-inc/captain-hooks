require('dotenv').config()

const { DiscordBot } = require('./classes/discord-bot')
const { TwitchBot } = require('./classes/twitch-bot')
const { Server } = require('./classes/server')

const discordBot = new DiscordBot({
  testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
  token: process.env.DISCORD_TOKEN,
})

const twitchBot = new TwitchBot({
  oauth: process.env.TWITCH_BOT_OAUTH,
  channels: ['eli7vh', 'missyjo_pinup'],
  noticeChannel: '#eli7vh',
  debug: true,
})

const server = new Server({
  discordBot,
  twitchBot,
  port: process.env.PORT,
})

server.start()
