const express = require('express')
// moved all this in here so we get autocomplete
const Knex = require('knex')
const { parseChatArgs } = require('../utils/chat')
const { DiscordBot } = require('./discord-bot')
const { TwitchBot } = require('./twitch-bot')
const { Controller } = require('./controller')

class Server {
  constructor({ twitchBot, discordBot, port, dbconfig }) {
    this.port = port
    this.app = express()

    this.bots = []
    // only enable the bots we want
    if (discordBot)
      this.bots.push(new DiscordBot({ ...discordBot, server: this }))
    if (twitchBot) this.bots.push(new TwitchBot({ ...twitchBot, server: this }))

    this.db = Knex(dbconfig)
    this.controller = new Controller({ db })

    // MOVE TO ROUTES
    this.app.get('/', (req, res) => res.send('yas queen!'))
    this.app.post('/alert', (req, res) => {
      this.notifyAll(req.query.msg)
      res.send(req.query.msg)
    })
    this.app.get('/overlay', (req, res) =>
      res.send('TODO: return static streaming overlay')
    )
  }

  // should have some universal message handlers, so we can tie in a central data store, so people can interact from any place (web, twitch, discord, telegram, twitter, etc)

  start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })

    // DB SCHEMA SHIT

    this.db.schema
      .dropTableIfExists('users')
      .then(() => console.log('Users Table Dropped!'))
    this.db.schema
      .createTable('users', (table) => {
        table.increments(), table.string('username')
        table.timestamps()
      })
      .then(() => console.log('Users Table Created!'))
    // TODO: Seed users table
  }

  execHTTPAction(action, params) {
    this.controller.exec(action, params)
  }

  execChatAction(action, keyword) {
    this.controller.exec(action, parseChatArgs(keyword))
  }

  notifyAll(body) {
    // send message from every bot
    // bots can be an array honestly.
    for (const bot of this.bots) {
      bot.msg(body)
    }
  }
}

module.exports = { Server }
