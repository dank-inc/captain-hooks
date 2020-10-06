const express = require('express')

class Server {
  constructor({ twitchBot, discordBot, port }) {
    this.port = port
    this.app = express()
    this.discordBot = discordBot
    this.twitchBot = twitchBot

    this.discordBot.attachServer(this)
    this.twitchBot.attachServer(this)

    this.state = {}

    this.app.get('/', (req, res) => res.send('yas queen!'))
    this.app.post('/alert', (req, res) => {
      this.notifyAll(req.query.msg)
      res.send(req.query.msg)
    })
    this.app.get('/overlay', (req, res) =>
      res.send('TODO: return static streaming overlay')
    )
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })
  }

  notifyAll(msg) {
    // send message from every bot
    if (this.discordBot) this.discordBot.msg(msg)
    if (this.twitchBot) this.twitchBot.msg(msg)
  }
}

module.exports = { Server }
