require('dotenv').config()

const { Server } = require('./server')
const { Bot } = require('./bot')

const bot = new Bot({
  testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
  token: process.env.DISCORD_TOKEN,
})

const server = new Server({
  bot,
  port: process.env.PORT,
})

server.start()
