const Discord = require('discord.js')

class Bot {
  constructor({ testChannelId, token }) {
    this = new Discord.Client()

    this.helpers = {
      testChannel: this.channels.cache.get(testChannelId),
    }

    // event listeners - clean up later
    this.on('ready', () => {
      // anything whne it's logged in
      bot.user.setActivity('WITH MYSELF', { type: 'PLAYING' })

      const members = bot.users.cache
      console.log(`My Botty is ready! => ${bot.user.tag}!`)
    })

    this.on('message', (msg) => {
      if (msg.content === 'ping') {
        msg.reply('Pong!')
      }

      console.log(msg.channel.id, msg.content)
    })

    // init bot

    this.login(token)
  }

  test() {
    this.helpers.testChannel.send('My botty is Ready!')
  }
}

module.exports = { Bot }
