import express from 'express'
// moved all this in here so we get autocomplete
import Knex from 'knex'

import { DiscordBot, DiscordBotCFG } from './discord-bot'
import { TwitchBot, TwitchBotCFG } from './twitch-bot'
import { ActionParams, Controller } from './controller'

// utils
import { parseChatArgs } from '../utils/chat'
import { Routes } from './routes'

type Props = {
  twitchBot?: TwitchBotCFG
  discordBot?: DiscordBotCFG
  port: number
  dbconfig: Knex.Config
}

export interface Server {
  port: number
  app: express.Express
  bots: (DiscordBot | TwitchBot)[]
  db: Knex
  controller: Controller
  routes: Routes
  state: Record<string, any>
}

export class Server {
  constructor({ twitchBot, discordBot, port, dbconfig }: Props) {
    this.port = port
    this.app = express()

    this.bots = []
    this.state = {}
    // only enable the bots we want
    if (discordBot?.token)
      this.bots.push(new DiscordBot({ ...discordBot, server: this }))
    if (twitchBot?.oauth)
      this.bots.push(new TwitchBot({ ...twitchBot, server: this }))

    this.db = Knex(dbconfig)
    this.controller = new Controller({ db: this.db, server: this })
    this.routes = new Routes({ server: this })
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
    // pass in metadata from auth
    return this.controller.exec(action, params)
  }

  async execChatAction(keyword: string, params: string[]): Promise<string> {
    const action = this.controller.actions[keyword]
    if (!action) return "Can't find that command 😣"

    this.state.lastCommand = keyword

    return await this.controller.exec(keyword, parseChatArgs(params))
  }

  notifyAll(body: string) {
    // send message from every bot
    // bots can be an array honestly.
    for (const bot of this.bots) {
      bot.msg(body)
    }
  }
}
