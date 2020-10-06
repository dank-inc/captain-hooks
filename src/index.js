require('dotenv').config()

const { Server } = require('./classes/server')

const discordBot = {
  testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
  token: process.env.DISCORD_TOKEN,
}

const twitchBot = {
  oauth: process.env.TWITCH_BOT_OAUTH,
  channels: ['eli7vh', 'missyjo_pinup'],
  noticeChannel: '#eli7vh',
  debug: true,
}

const dbconfig = {
  client: 'sqlite3',
  connection: { filename: './captain_hook.sqlite' },
}

const server = new Server({
  discordBot,
  twitchBot,
  port: process.env.PORT,
  dbconfig,
})

server.start()
