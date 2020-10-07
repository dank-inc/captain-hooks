import express from 'express'
// moved all this in here so we get autocomplete
import Knex from 'knex'

import { DiscordBot, DiscordBotCFG } from './discord-bot'
import { TwitchBot, TwitchBotCFG } from './twitch-bot'
import { ActionParams, Controller } from './controller'
import { commands } from '../commands/master'

// utils
import { parseChatArgs } from '../utils/chat'

type Props = {
  twitchBot?: TwitchBotCFG
  discordBot?: DiscordBotCFG
  port: number
  dbconfig: Knex.Config
}

export class Server {
  port: number
  app: express.Express
  bots: (DiscordBot | TwitchBot)[]
  db: Knex
  controller: Controller
  commands: Record<string, { action: string }>

  constructor({ twitchBot, discordBot, port, dbconfig }: Props) {
    this.port = port
    this.app = express()

    this.bots = []
    // only enable the bots we want
    if (discordBot)
      this.bots.push(new DiscordBot({ ...discordBot, server: this }))
    if (twitchBot) this.bots.push(new TwitchBot({ ...twitchBot, server: this }))

    this.db = Knex(dbconfig)
    this.controller = new Controller({ db: this.db })
    this.commands = commands

    // MOVE TO ROUTES
    this.app.get('/', (req, res) => res.send('yas queen!'))
    this.app.post('/alert', (req, res) => {
      this.notifyAll(req.query.msg as string)
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

  execHTTPAction(action: string, params: ActionParams) {
    this.controller.exec(action, params)
  }

  execChatAction(keyword: string): string {
    const action = this.commands[keyword]?.action
    if (!action) return "Can't find that command 😣"

    return this.controller.exec(action, parseChatArgs(keyword))
  }

  notifyAll(body: string) {
    // send message from every bot
    // bots can be an array honestly.
    for (const bot of this.bots) {
      bot.msg(body)
    }
  }
}
