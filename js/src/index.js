require('dotenv').config()

const { S3Uploader } = require('./classes/s3uploader')

const s3 = new S3Uploader()

const { Server } = require('./classes/server')

const discordBot = process.env.DISCORD_TOKEN
  ? {
      testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
      token: process.env.DISCORD_TOKEN,
    }
  : undefined

const twitchBot = process.env.TWITCH_BOT_OAUTH
  ? {
      oauth: process.env.TWITCH_BOT_OAUTH,
      channels: ['eli7vh'],
      noticeChannel: '#eli7vh',
      debug: false,
    }
  : undefined

const dbconfig = {
  client: 'sqlite3',
  connection: { filename: './captain_hook.sqlite' },
  useNullAsDefault: true,
}

const server = new Server({
  discordBot,
  twitchBot,
  port: process.env.PORT,
  dbconfig,
})

server.start()
