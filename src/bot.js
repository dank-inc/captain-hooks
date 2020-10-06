const Discord = require('discord.js')
const { commands: elijahCommands } = require('./commands/elijah')
const { commands: erikCommands } = require('./commands/erik')

class Bot {
  constructor({ testChannelId, token }) {
    this.client = new Discord.Client()

    this.helpers = {}

    // event listeners - clean up later
    this.client.on('ready', () => {
      this.client.user.setActivity('WITH MYSELF', { type: 'PLAYING' })
      this.helpers.testChannel = this.client.channels.cache.get(testChannelId)
      const members = this.client.users.cache
      console.log(`My Botty is ready! => ${this.client.user.tag}!`)
    })

    this.client.on('message', (msg) => {
      const keyword = msg.content.split(' ')[0]

      const command = { ...elijahCommands, ...erikCommands }[keyword]

      console.log('command response', keyword, command)
      if (!command) return

      msg.reply(command.reply)

      if (msg.content === 'ping') {
        msg.reply('Pong!')
      }
      console.log(msg.channel.id, msg.content)
    })

    // init bot
    this.client.login(token)
  }

  test() {
    if (this.helpers.testChannel) this.helpers.testChannel.send('YAAA')
    // do something im giving up on you
  }
}

module.exports = { Bot }
