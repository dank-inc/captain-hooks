const express = require('express')
// moved all this in here so we get autocomplete
const Knex = require('knex')
const { DiscordBot } = require('./discord-bot')
const { TwitchBot } = require('./twitch-bot')

class Server {
  constructor({ twitchBot, discordBot, port, dbconfig }) {
    this.port = port
    this.app = express()
    this.discordBot = new DiscordBot(discordBot)
    this.twitchBot = new TwitchBot(twitchBot)
    this.db = Knex(dbconfig)

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

  // should have some universal message handlers, so we can tie in a central data store, so people can interact from any place (web, twitch, discord, telegram, twitter, etc)

  start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })

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

  notifyAll(body) {
    // send message from every bot

    if (this.discordBot) this.discordBot.msg(body)
    if (this.twitchBot) this.twitchBot.msg(body)
  }
}

module.exports = { Server }
