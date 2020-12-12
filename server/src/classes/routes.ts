import { addTimestamps, updateUpdatedAt } from '../utils/time'
import { ActionParams } from './controller'
import { Server } from './server'

type Props = {
  server: Server
}

export class Routes {
  server: Server
  constructor({ server }: Props) {
    this.server = server

    // TODO: this could just be a function that takes 'app' and 'controllers' and connects the two.

    // ADMIN SHIT
    this.server.app.get('/', (req, res) => res.send('TODO: serve client'))

    this.server.app.post('/alert', (req, res) => {
      this.server.notifyAll(req.query.msg as string)
      res.send('Alert has been sent!')
    })

    this.server.app.get('/overlay', (req, res) =>
      res.send('TODO: return static streaming overlay')
    )

    // COMMANDS
    this.server.app.get('/commands', (req, res) => {
      res.send(
        Object.keys(server.controller.actions).map(
          (name) => `${process.env.COMMAND_PREFIX}${name}`
        )
      )
    })

    Object.keys(server.controller.actions).map((name) => {
      this.server.app.post('/commands/:id', (req, res) => {
        const action = this.server.controller.actions[name]

        if (action) {
          res.send(action())
        } else {
          res.send('Shit doesnt exist')
        }
      })
    })

    // REST ROUTES (GENERATE FROM LIST OF RESOURCES)

    // TODO: move logic to controllers
    this.server.app.get('/api/users', async (req, res) =>
      res.send(await this.server.db.select().from('users'))
    )
    this.server.app.get('/api/messages', async (req, res) =>
      res.send(await this.server.db.select().from('messages'))
    )

    this.server.app.get('/api/users/:id', async ({ params }, res) =>
      res.send(
        (
          await this.server.db
            .select()
            .from('users')
            .where('id', '=', params.id)
        )?.[0]
      )
    )

    this.server.app.put('/api/users/:id', async ({ params, body }, res) => {
      console.log('>>>>>> UPDATING USER', params, body)

      res.send(
        await this.server
          .db('users')
          .where('id', '=', params.id)
          .update({ ...body, ...updateUpdatedAt() })
      )
    })

    this.server.app.post<{ username: string }, { id: string }>(
      '/api/users',
      async ({ body }, res) => {
        const record = await this.server.db('users').insert({ ...body })
        console.log('>>> NEW >>>', record?.[0])
        res.send({ id: `${record?.[0]}` })
      }
    )

    // build all the routes and shit
    // handles parsing of http request body and crap
  }

  exec(action: string, params: ActionParams = {}) {
    // package HTTP Params
    return this.server.execHTTPAction(action, params)
  }
}
