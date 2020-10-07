import { ActionParams } from './controller'
import { Server } from './server'

type Props = {
  server: Server
}

export class Routes {
  server: Server
  constructor({ server }: Props) {
    this.server = server

    // MOVE TO ROUTES
    this.server.app.get('/', (req, res) => res.send('yas queen!'))

    this.server.app.post('/alert', (req, res) => {
      this.server.notifyAll(req.query.msg as string)
      res.send('Alert has been sent!')
    })

    this.server.app.get('/overlay', (req, res) =>
      res.send('TODO: return static streaming overlay')
    )

    this.server.app.get('/dice/d6', (req, res) => {
      res.send(this.exec('rolld6'))
    })

    // build all the routes and shit
    // handles parsing of http request body and crap
  }

  exec(action: string, params: ActionParams = {}) {
    // package HTTP Params
    return this.server.execHTTPAction(action, params)
  }
}
