require('dotenv').config()
const Discord = require('discord.js')

const bot = new Discord.Client()
const { DISCORD_TOKEN, DISCORD_TEST_CHANNEL_ID } = process.env

bot.on('ready', () => {
  // anything whne it's logged in
  bot.user.setActivity('WITH MYSELF', { type: 'PLAYING' })
  const testChannel = bot.channels.cache.get(DISCORD_TEST_CHANNEL_ID)
  testChannel.send('My botty is Ready!')

  const members = bot.users.cache
  console.log(`My Botty is ready! => ${bot.user.tag}!`)
})

bot.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }

  console.log(msg.channel.id, msg.content)
})

if (!DISCORD_TOKEN) {
  console.error('hey, you knob, put the discord token on the thing')
}

bot.login(DISCORD_TOKEN)
