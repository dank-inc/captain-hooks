require('dotenv').config()

const { S3Uploader } = require('./classes/s3uploader')
const { Server } = require('./classes/server')

// TODO: get aws keys and shit
const s3 = new S3Uploader()

if (!process.env.DISCORD_TOKEN) console.error('No Discord Tokens')
if (!process.env.DISCORD_TEST_CHANNEL_ID)
  console.error('No Discord Channel set')
if (!process.env.TWITCH_BOT_OAUTH) console.error('No Twitch oauth detected')

const server = new Server({
  discordBot: {
    testChannelId: process.env.DISCORD_TEST_CHANNEL_ID,
    token: process.env.DISCORD_TOKEN,
  },
  twitchBot: {
    oauth: process.env.TWITCH_BOT_OAUTH,
    channels: ['eli7vh'],
    noticeChannel: '#eli7vh',
    debug: false,
  },
  dbconfig: {
    client: 'sqlite3',
    connection: { filename: './captain_hook.sqlite' },
    useNullAsDefault: true,
  },
  port: process.env.PORT,
})

server.start()
