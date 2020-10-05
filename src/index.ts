import * as dotenv from 'dotenv'
import * as Discord from 'discord.js'
dotenv.config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
  console.log(msg)
})

console.log(process.env.DISCORD_TOKEN)

// client.login(env.DISCORD_TOKEN)

console.log('hello bot')
