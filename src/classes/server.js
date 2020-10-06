const express = require('express')

class Server {
  constructor({ discordBot, port }) {
    this.port = port
    this.app = express()
    this.discordBot = discordBot
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })
  }

  notifyAll() {
    // send message from every bot
  }
}

module.exports = { Server }
