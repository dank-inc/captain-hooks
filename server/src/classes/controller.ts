import Knex from 'knex'
import { Server } from './server'

export type ActionMap = Record<string, (params?: ActionParams) => string>

// TODO add message metadata to params
export type ActionParams = Record<string, number | string>

type Props = {
  db: Knex
  server: Server
}

export class Controller {
  db: Knex
  actions: ActionMap
  server: Server

  constructor({ db, server }: Props) {
    // dependency inject whatever data points we need.
    this.db = db
    this.server = server

    this.actions = {
      commands: () => Object.keys(this.server.commands).join(', '),
      ping: () => 'pong',
      interesting: () => `hmmm... yes... quite... 🤔`,

      rolld6: () => (Math.floor(Math.random() * 6) + 1).toString(),
      rolld20: () => (Math.floor(Math.random() * 20) + 1).toString(),

      // @ts-ignore
      getUser: ({ username }) => {
        return this.db.table('users').where({ username }).first.toString()
      },
    }
  }

  exec(action: string, params: ActionParams): string {
    const controller = this.actions[action]

    return controller
      ? controller(params)
      : 'Something went wrong - yell at Elijah!'
  }
}
