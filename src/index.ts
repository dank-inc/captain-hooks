import * as dotenv from 'dotenv'
import * as Discord from 'discord.js'
dotenv.config()

const bot = new Discord.Client()
const { DISCORD_TOKEN, DISCORD_TEST_CHANNEL_ID } = process.env

bot.on('ready', () => {
  // anything whne it's logged in
  bot.user.setActivity('WITH MYSELF', { type: 'PLAYING' })

  console.log(`My Botty is ready! => ${bot.user.tag}!`)
})

bot.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }

  console.log(msg.channel.id, msg.content)
})

const channels = bot.channels.cache.map((c) => c)

console.log(channels)

if (!DISCORD_TOKEN) {
  console.error('hey, you knob, put the discord token on the thing')
}

bot.login(DISCORD_TOKEN)
