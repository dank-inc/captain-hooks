import Knex from 'knex'

export type ActionMap = Record<string, any>
export type ActionParams = Record<string, number | string>

type Props = {
  db: Knex
}

export class Controller {
  db: Knex
  actions: ActionMap

  constructor({ db }: Props) {
    // dependency inject whatever data points we need.
    this.db = db

    this.actions = {
      dice: {
        d6: (params: ActionParams) =>
          (Math.floor(Math.random() * 6) + 1).toString(), // returns string
        d20: (params: ActionParams) =>
          (Math.floor(Math.random() * 20) + 1).toString(), // returns string
      },
      user: {
        get: ({ username }: ActionParams) => {
          // return this.db.table('users').get({ username }).then().toJson()
        },
      },
    }
  }

  exec(action: string, params: ActionParams): string {
    const controller = this.actions[action]
    console.log('ACTION =>', action, params, this.actions)
    console.log('test', this.actions['dice.d6'])
    if (!controller) return 'That command does not exist!'
    return controller(params)
  }
}
