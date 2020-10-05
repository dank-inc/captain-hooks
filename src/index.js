require('dotenv').config()

const { Server } = require('./server')
const { Bot } = require('./bot')

const server = new Server({
  bot: new Bot({
    testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
    token: process.env.DISCORD_TOKEN,
  }),
  port: process.env.PORT,
})

server.start()
