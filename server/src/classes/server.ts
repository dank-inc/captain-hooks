import express from 'express'
import bodyParser from 'body-parser'
// moved all this in here so we get autocomplete
import Knex from 'knex'

import { DiscordBot, DiscordBotCFG } from './discord-bot'
import { TwitchBot, TwitchBotCFG } from './twitch-bot'
import { ActionParams, Controller } from './controller'

// utils
import { parseChatArgs } from '../utils/chat'
import { Routes } from './routes'
import { schema } from '../db'
import { seeds } from '../db/seeds'
import { CaptainMessage } from '../types/db'

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

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      next()
    })

    this.app.use(bodyParser.json())

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

  async start() {
    this.app.listen(this.port, () => {
      console.log('Server is online! port =>', this.port)
    })

    // DB SCHEMA SHIT
    schema.map(async (table) => {
      await this.db.schema.dropTableIfExists(table.name)
      console.log(`${table.name} Table Dropped!`)

      await this.db.schema
        .createTable(table.name, (newTable) => {
          newTable.increments()
          newTable.timestamps()
          table.fields.map((field) => {
            newTable[field.type](field.name)
          })
        })
        .then(async () => {
          const records = seeds[table.name]

          await this.db(table.name).insert(
            seeds[table.name].map((r: any) => ({
              ...r,
              created_at: new Date(),
              updated_at: new Date(),
            }))
          )
        })

      console.log(`${table.name} Table Created!`)
    })

    // TODO: Seed users table
    // db/seeds foreach
  }

  execHTTPAction(action: string, params: ActionParams) {
    // pass in metadata from auth
    return this.controller.exec(action, params)
  }

  async persistMsg(
    data: Pick<CaptainMessage, 'channel_id' | 'chat_user_id' | 'body'>,
    username: string,
    source: 'discord' | 'twitch' | 'telegram'
  ) {
    console.log('>>', source, username, data)

    // lookup user.
    // if user does not exist, create user

    const message: CaptainMessage = { ...data, user_id: 1 }
    this.db('messages').insert(message)
    // TODO: in admin panel, merge users to their chats
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
