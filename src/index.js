require('dotenv').config()

const { DiscordBot } = require('./classes/discord-bot')
const { Server } = require('./classes/server')

const bot = new DiscordBot({
  testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
  token: process.env.DISCORD_TOKEN,
})

const server = new Server({
  bot,
  port: process.env.PORT,
})

server.start()

server.bot.test()
