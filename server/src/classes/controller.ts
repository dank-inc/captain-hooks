import Knex from 'knex'
import { Server } from './server'
import { getPhoto } from './unsplash'

export type ActionMap = Record<
  string,
  (params?: ActionParams) => Promise<string>
>

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
    // TODO: split this up into COMMANDS and REST SHIT
    // dependency inject whatever data points we need.
    this.db = db
    this.server = server
    // TODO: Put this into various files or soemthing
    // this.actions = { ...d20, ...general, ...blah }
    this.actions = {
      commands: async () => Object.keys(this.actions).join(', '),
      ping: async () => 'pong',
      interesting: async () => `hmmm... yes... quite... 🤔`,
      rolld6: async () => {
        console.log('D6')
        return (Math.floor(Math.random() * 6) + 1).toString()
      },
      rolld20: async () => (Math.floor(Math.random() * 20) + 1).toString(),
      // @ts-ignore
      photo: async (params) => await getPhoto(params),
      // @ts-ignore
      getUser: async ({ username }) => {
        return this.db.table('users').where({ username }).first.toString()
      },
    }
  }

  async exec(action: string, params: ActionParams): Promise<string> {
    const controller = this.actions[action]

    if (!controller) return 'Something went wrong - yell at Elijah!'

    return await controller(params)
  }
}
