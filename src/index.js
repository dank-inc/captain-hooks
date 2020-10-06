require('dotenv').config()

const { Bot } = require('./classes/bot')
const { Server } = require('./classes/server')

const bot = new Bot({
  testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
  token: process.env.DISCORD_TOKEN,
})

const server = new Server({
  bot,
  port: process.env.PORT,
})

server.start()

server.bot.test()
