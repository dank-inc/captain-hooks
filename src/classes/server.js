const express = require('express')

class Server {
  constructor({ bot, port }) {
    this.port = port
    this.app = express()
    this.bot = bot
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })
  }
}

module.exports = { Server }
