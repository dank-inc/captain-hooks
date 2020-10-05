import * as dotenv from 'dotenv'
import * as Discord from 'discord.js'
dotenv.config()

const client = new Discord.Client()
const { DISCORD_TOKEN } = process.env

client.on('ready', () => {
  console.log(`My Botty is ready! => ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
  console.log(msg)
})

if (!DISCORD_TOKEN) {
  console.error('hey, you knob, put the discord token on the thing')
}

client.login(DISCORD_TOKEN)
